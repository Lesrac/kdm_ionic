var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Created by Daniel on 15.11.2017.
 */
let FilterElementsPipe = class FilterElementsPipe {
    transform(value, ...args) {
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
};
FilterElementsPipe = __decorate([
    Pipe({ name: 'kdmfFilterElementsPipe' })
], FilterElementsPipe);
export { FilterElementsPipe };
//# sourceMappingURL=filter-elements.pipe.js.map