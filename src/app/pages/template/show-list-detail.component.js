var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
/**
 * Created by Daniel on 16.03.2017.
 */
let ShowListDetailComponent = class ShowListDetailComponent {
    constructor(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.object = this.params.get('object');
    }
};
ShowListDetailComponent = __decorate([
    Component({
        selector: 'kdmf-show-list-detail',
        templateUrl: 'show-list-detail.component.html',
    }),
    __metadata("design:paramtypes", [ViewController, NavParams])
], ShowListDetailComponent);
export { ShowListDetailComponent };
//# sourceMappingURL=show-list-detail.component.js.map