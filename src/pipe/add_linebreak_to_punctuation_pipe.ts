import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by Daniel on 08.02.2017.
 */
@Pipe({name: 'addLinebreakToPunctuationPipe'})
export class AddLinebreakToPunctuationPipe implements PipeTransform{
  transform(value: string, ...args: string[]): any {
    let regex = new RegExp(/\.\s/, 'g');
    let text = value.replace(regex, '.\n');
    regex = new RegExp(/!\s/, 'g');
    text = text.replace(regex, '!\n');
    regex = new RegExp(/\?\s/, 'g');
    text = text.replace(regex, '?\n');
    return text;
  }

}
