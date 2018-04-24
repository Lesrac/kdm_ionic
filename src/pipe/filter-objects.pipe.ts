import { Pipe, PipeTransform } from '@angular/core';

/**
 * Created by Daniel on 15.11.2017.
 */

@Pipe({name: 'kdmfFilterObjectsPipe'})
export class FilterObjectsPipe implements PipeTransform {
  transform(value: any, ...args: any[]): Object[] {
    const returnArray = [];
    value.forEach(val => {
      if (val.what instanceof Object) {
        returnArray.push(val);
      }
    });
    return returnArray;
  }

}
