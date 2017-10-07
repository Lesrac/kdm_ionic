import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'kdmTextFormatting'})
export class TextFormattingPipe implements PipeTransform {
  transform(value: string, ...args: string[]): any {
    const regex = new RegExp(/\((.*?)\)/, 'g');
    const regexRemoveParenthesis = new RegExp(/((?!\().)+((?!\)).)+/);
    const matches = value.match(regex);
    let text = value;
    if (matches != null) {
      matches.forEach((match) => {
        const matchesWithoutParenthesis = match.match(regexRemoveParenthesis);
        if (Number(matchesWithoutParenthesis[1]) || Number(matchesWithoutParenthesis[2])) {
          text = text.replace(match, '\n\n' + matchesWithoutParenthesis[0]);
        }
      });
    }
    return text;
  }

}
