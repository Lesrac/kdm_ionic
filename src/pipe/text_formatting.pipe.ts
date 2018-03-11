import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'kdmTextFormatting'})
export class TextFormattingPipe implements PipeTransform {

  private doubleBreak: string = '<br/><br/>';
  private break: string = '<br/>';
  private milestone: string = '<ion-icon name="book" role="img" class="icon icon-md ion-md-book" ' +
    'aria-label="book" ng-reflect-name="book"></ion-icon>';

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string, ...args: string[]): SafeHtml {
    const regex = new RegExp(/\((.*?)\)/, 'g');
    const regexRemoveParenthesis = new RegExp(/^\(|\)$/g);
    const matches = value.match(regex);
    let text = value;
    if (matches != null) {
      matches.forEach((match, index) => {
        const matchesWithoutParenthesis = match.replace(regexRemoveParenthesis, '');
        if (!matchesWithoutParenthesis) {
          text = text.replace(match, '');
        } else if ('br' === matchesWithoutParenthesis) {
          text = text.replace(match, this.doubleBreak);
        } else if ('br1' === matchesWithoutParenthesis) {
          text = text.replace(match, this.break);
        } else if (Number(matchesWithoutParenthesis) || Number(matchesWithoutParenthesis[0]) ||
          Number(matchesWithoutParenthesis[1]) || Number(matchesWithoutParenthesis[2])) {
          text = text.replace(match, this.doubleBreak + '<b>' + matchesWithoutParenthesis + '</b>');
        } else if ('milestone' === matchesWithoutParenthesis) {
          let replaceText: string = '';
          if (index > 0) {
            const previousMatchValue = matches[index - 1].replace(regexRemoveParenthesis, '');
            if (previousMatchValue !== matchesWithoutParenthesis) {
              replaceText += this.doubleBreak;
            }
          } else {
            replaceText += this.doubleBreak;
          }
          text = text.replace(match, replaceText + this.milestone);
        } else if ('milestoneNL' === matchesWithoutParenthesis) {
          text = text.replace(match, this.milestone);
        } else if ('milestonebox' === matchesWithoutParenthesis) {
          // TODO: milestonebox image
          text = text.replace(match, '<ion-icon name="kdmf-shieldone" role="img" ' +
            'class="icon icon-md ion-md-kdmf-shieldone" aria-label="kdmf shieldone" ' +
            'ng-reflect-name="kdmf-shieldone"></ion-icon>');
        } else if ('*' === matchesWithoutParenthesis) {
          text = text.replace(match, '<ion-icon name="star" role="img" ' +
            'class="icon icon-md ion-md-star" aria-label="star" ng-reflect-name="star"></ion-icon>');
        } else if ('shieldone' === matchesWithoutParenthesis) {
          text = text.replace(match, '<ion-icon name="kdmf-shieldone" role="img" ' +
            'class="icon icon-md ion-md-kdmf-shieldone" aria-label="kdmf shieldone" ' +
            'ng-reflect-name="kdmf-shieldone"></ion-icon>');
        } else if ('flash' === matchesWithoutParenthesis) {
          text = text.replace(match, '<ion-icon name="flash" role="img" ' +
            'class="icon icon-md ion-md-flash" aria-label="flash" ng-reflect-name="flash"></ion-icon>');
        } else if ('headList' === matchesWithoutParenthesis) {
          // TODO: head image
          text = text.replace(match, this.doubleBreak + '<ion-icon name="flash" role="img" ' +
            'class="icon icon-md ion-md-flash" aria-label="flash" ng-reflect-name="flash"></ion-icon>');
        } else if ('waistList' === matchesWithoutParenthesis) {
          // TODO: waist image
          text = text.replace(match, this.doubleBreak + '<ion-icon name="flash" role="img" ' +
            'class="icon icon-md ion-md-flash" aria-label="flash" ng-reflect-name="flash"></ion-icon>');
        } else if ('legsList' === matchesWithoutParenthesis) {
          // TODO: legs image
          text = text.replace(match, this.doubleBreak + '<ion-icon name="flash" role="img" ' +
            'class="icon icon-md ion-md-flash" aria-label="flash" ng-reflect-name="flash"></ion-icon>');
        } else if ('armsList' === matchesWithoutParenthesis) {
          // TODO: arms image
          text = text.replace(match, this.doubleBreak + '<ion-icon name="flash" role="img" ' +
            'class="icon icon-md ion-md-flash" aria-label="flash" ng-reflect-name="flash"></ion-icon>');
        } else if ('bodyList' === matchesWithoutParenthesis) {
          // TODO: body image
          text = text.replace(match, this.doubleBreak + '<ion-icon name="flash" role="img" ' +
            'class="icon icon-md ion-md-flash" aria-label="flash" ng-reflect-name="flash"></ion-icon>');
        }
      });
    }
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
