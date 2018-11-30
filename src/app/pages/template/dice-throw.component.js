var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { DiceThrow } from '../../model/dice-throw';
/**
 * Created by Daniel on 16.10.2017.
 */
let DiceThrowComponent = class DiceThrowComponent {
};
__decorate([
    Input(),
    __metadata("design:type", DiceThrow)
], DiceThrowComponent.prototype, "value", void 0);
DiceThrowComponent = __decorate([
    Component({
        selector: 'kdmf-dice-throw',
        templateUrl: 'dice-throw.component.html',
    })
], DiceThrowComponent);
export { DiceThrowComponent };
//# sourceMappingURL=dice-throw.component.js.map