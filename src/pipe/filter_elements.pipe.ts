import { Pipe, PipeTransform } from '@angular/core';

/**
 * Created by Daniel on 15.11.2017.
 */

@Pipe({name: 'kdmfFilterElementsPipe'})
export class FilterElementsPipe implements PipeTransform {
  transform(value: any, ...args: any[]): Object[] {
    const returnArray = [];
    const filterWhat = args[0];
    switch (filterWhat) {
      case 'object': {
        value.forEach(val => {
          if (val.what instanceof Object) {
            returnArray.push(val);
          }
        });
        break;
      }
      case 'or_one': {
        console.log(value);
        value.forEach(val => {
          if (val.amount[1] === 1) {
            returnArray.push(val);
          }
        });
        break;
      }
      case 'or_two': {
        value.forEach(val => {
          if (val.amount[1] === 2) {
            returnArray.push(val);
          }
        });
        break;
      }
      default: {
        value.forEach(val => {
          if (typeof val.what === 'string') {
            returnArray.push(val);
          }
        });
        break;
      }
    }
    return returnArray;
  }

}
