var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
/**
 * Created by Daniel on 15.03.2017.
 */
let InputNumberComponent = class InputNumberComponent {
    /**
     * Created by Daniel on 15.03.2017.
     */
    constructor() {
        this.init = true;
        this.change = new EventEmitter();
        this.valueControl = new FormControl();
    }
    increaseValue() {
        this.value++;
        this.change.emit(this.value);
    }
    decreaseValue() {
        if (this.value > 0) {
            this.value--;
            this.change.emit(this.value);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], InputNumberComponent.prototype, "value", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], InputNumberComponent.prototype, "change", void 0);
InputNumberComponent = __decorate([
    Component({
        selector: 'kdmf-input-number',
        templateUrl: 'input-number.component.html',
    })
], InputNumberComponent);
export { InputNumberComponent };
//# sourceMappingURL=input-number.component.js.map