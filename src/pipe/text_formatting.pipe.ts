import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'kdmTextFormatting'})
export class TextFormattingPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string, ...args: string[]): any {
    const regex = new RegExp(/\((.*?)\)/, 'g');
    const regexRemoveParenthesis = new RegExp(/^\(|\)$/g);
    const matches = value.match(regex);
    let text = value;
    if (matches != null) {
      matches.forEach((match, index) => {
        const matchesWithoutParenthesis = match.replace(regexRemoveParenthesis, '');
        if (!matchesWithoutParenthesis) {
          text = text.replace(match, '');
        } else if (Number(matchesWithoutParenthesis[1]) || Number(matchesWithoutParenthesis[2])) {
          text = text.replace(match, '<br/><br/><b>' + matchesWithoutParenthesis + '</b>');
        } else if ('milestone' === matchesWithoutParenthesis) {
          let replaceText: string = '';
          if (index > 1) {
            const previousMatchValue = matches[index - 1].replace(regexRemoveParenthesis, '');
            if (previousMatchValue !== matchesWithoutParenthesis) {
              replaceText += '<br/><br/>';
            }
          } else {
            replaceText += '<br/><br/>';
          }
          text = text.replace(match, replaceText +
            '<ion-icon name="book" role="img" class="icon icon-md ion-md-book" ' +
            'aria-label="book" ng-reflect-name="book"></ion-icon>');
        } else if ('*' === matchesWithoutParenthesis) {
          text = text.replace(match, '<ion-icon name="star" role="img" ' +
            'class="icon icon-md ion-md-star" aria-label="star" ng-reflect-name="star"></ion-icon>');
        }
      });
    }
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
