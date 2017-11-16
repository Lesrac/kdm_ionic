import { Pipe, PipeTransform } from '@angular/core';
import { Innovation } from '../model/innovation';
import { StorageTag } from '../model/storage';

/**
 * Created by Daniel on 15.11.2017.
 */

@Pipe({name: 'kdmfFilterStringsPipe'})
export class FilterStringsPipe implements PipeTransform {
  transform(value: any, ...args: any[]): Object[] {
    const returnArray = [];
    value.forEach(val => {
      if (typeof val.what === 'string') {
        console.log(val);
        returnArray.push(val);
      }
    });
    return returnArray;
  }

}
