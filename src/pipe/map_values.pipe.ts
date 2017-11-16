import { Pipe, PipeTransform } from '@angular/core';
import { Innovation } from '../model/innovation';
import { StorageTag } from '../model/storage';

/**
 * Created by Daniel on 15.11.2017.
 */

@Pipe({name: 'kdmfMapValuesPipe'})
export class MapValuesPipe implements PipeTransform {
  transform(value: any, ...args: any[]): Object[] {
    const returnArray = [];
    value.forEach((entryVal, entryKey) => {
      const dummyObject = {
        equipment: entryKey,
        costs: [],
      };
      entryVal.forEach((val, k) => {
        if (k instanceof Object) {
          dummyObject.costs.push({
            amount: val,
            what: k as Innovation,
          });
        } else {
          dummyObject.costs.push({
            amount: val,
            what: <StorageTag>StorageTag[<string>k],
          });
        }
      });
      returnArray.push(dummyObject);
    });
    console.log(returnArray);
    return returnArray;
  }

}
