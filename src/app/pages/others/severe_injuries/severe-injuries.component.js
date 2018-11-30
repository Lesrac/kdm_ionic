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
import { NavController } from 'ionic-angular';
import { SevereInjuriesDetailPageComponent } from './severe-injuries-detail.component';
/**
 * Created by Daniel on 15.10.2017.
 */
let SevereInjuriesPageComponent = class SevereInjuriesPageComponent {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
        this.text1 = 'When a survivor suffers a severe injury at a hit location, determine the outcome by rolling 1d10' +
            ' on the corresponding table.';
        this.text2 = 'A survivor with 5 bleeding tokens is dead.';
        this.text3 = 'Some permanent injuries have limits to how many times they can be recorded. If a survivor suffers' +
            ' a severe injury that they have already recorded the maximum number of times, they instead gain 1 bleeding token.';
    }
    goToDetail(bodypart) {
        this.navCtrl.push(SevereInjuriesDetailPageComponent, { bodypart: bodypart }).then();
    }
};
SevereInjuriesPageComponent = __decorate([
    Component({
        selector: 'kdmf-page-severe-injuries',
        templateUrl: 'severe-injuries.component.html',
    }),
    __metadata("design:paramtypes", [NavController])
], SevereInjuriesPageComponent);
export { SevereInjuriesPageComponent };
//# sourceMappingURL=severe-injuries.component.js.map