import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'kdmfRemoveWhitespacePipe'})
export class RemoveWhitespacePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return (!value) ? '' : value.replace(/ /g, '');
  }
}
