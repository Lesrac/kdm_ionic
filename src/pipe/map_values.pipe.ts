import { Pipe, PipeTransform } from '@angular/core';
import { Innovation } from '../model/innovation';
import { StorageTag } from '../model/storage';
import { Equipment } from '../model/equipment';

/**
 * Created by Daniel on 15.11.2017.
 */

@Pipe({name: 'kdmfMapValuesPipe'})
export class MapValuesPipe implements PipeTransform {
  transform(value: any, ...args: any[]): { equipment: Equipment, costs: [{ amount: number, what: any }] }[] {
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
        } else if (StorageTag[k]) {
          dummyObject.costs.push({
            amount: val,
            what: StorageTag[k],
          });
        } else {
          dummyObject.costs.push({
            amount: val,
            what: k,
          });
        }
      });
      returnArray.push(dummyObject);
    });
    return returnArray;
  }

}
