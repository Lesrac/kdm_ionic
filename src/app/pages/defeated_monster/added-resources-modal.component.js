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
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { ShowListDetailComponent } from '../template/show-list-detail.component';
/**
 * Created by Daniel on 09.10.2017.
 */
let AddedResourcesModalComponent = class AddedResourcesModalComponent {
    constructor(navCtrl, viewCtrl, params) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.huntedMonster = this.params.get('huntedMonster');
    }
    close() {
        this.viewCtrl.dismiss();
    }
    showDetail(storageItem) {
        this.navCtrl.push(ShowListDetailComponent, {
            object: storageItem,
        }).then();
    }
};
AddedResourcesModalComponent = __decorate([
    Component({
        selector: 'kdmf-added-resources-modal',
        templateUrl: 'added-resources-modal.component.html',
    }),
    __metadata("design:paramtypes", [NavController, ViewController, NavParams])
], AddedResourcesModalComponent);
export { AddedResourcesModalComponent };
//# sourceMappingURL=added-resources-modal.component.js.map