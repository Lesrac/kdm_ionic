var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import { StorageTag } from '../model/storage';
/**
 * Created by Daniel on 15.11.2017.
 */
let MapValuesPipe = class MapValuesPipe {
    transform(value, ...args) {
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
                        what: k,
                    });
                }
                else if (StorageTag[k]) {
                    dummyObject.costs.push({
                        amount: val,
                        what: StorageTag[k],
                    });
                }
                else {
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
};
MapValuesPipe = __decorate([
    Pipe({ name: 'kdmfMapValuesPipe' })
], MapValuesPipe);
export { MapValuesPipe };
//# sourceMappingURL=map-values.pipe.js.map