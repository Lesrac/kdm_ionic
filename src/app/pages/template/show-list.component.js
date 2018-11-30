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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ShowListAddModalComponent } from './show-list-add-modal.component';
import { ShowListTypes } from '../../model/show-list-types';
import { ShowListDetailComponent } from './show-list-detail.component';
import { ShowLocationDetailComponent } from '../location/show-location-detail.component';
/**
 * Created by Daniel on 16.03.2017.
 */
let ShowListComponent = class ShowListComponent {
    constructor(navCtrl, params, modalCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.objects = params.get('objects');
        this.type = params.get('type');
        this.settlement = params.get('settlement');
    }
    ngOnInit() {
        this.setup();
    }
    addObject() {
        let modal = this.modalCtrl.create(ShowListAddModalComponent, {
            objects: this.objects,
            type: this.type,
        });
        modal.present().then();
    }
    removeObject(object) {
        const index = this.objects.findIndex(x => x === object);
        this.objects.splice(index, 1);
    }
    showDetail(object) {
        if (this.type === ShowListTypes.LOCATION) {
            this.navCtrl.push(ShowLocationDetailComponent, {
                object: object,
            }).then();
        }
        else {
            this.navCtrl.push(ShowListDetailComponent, {
                object: object,
            }).then();
        }
    }
    setup() {
        switch (this.type) {
            case ShowListTypes.FIGHTINGART:
                this.title = 'Fighting Arts';
                break;
            case ShowListTypes.DISORDER:
                this.title = 'Disorders';
                break;
            case ShowListTypes.INNOVATION:
                this.title = 'Innovations';
                break;
            case ShowListTypes.LOCATION:
                this.title = 'Locations';
                break;
            case ShowListTypes.EQUIPMENT:
                this.title = 'Equipments';
                break;
            default:
                console.error('Type doesn\'t exist in show list types: ' + this.type);
        }
    }
};
ShowListComponent = __decorate([
    Component({
        selector: 'kdmf-show-list',
        templateUrl: 'show-list.component.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ModalController])
], ShowListComponent);
export { ShowListComponent };
//# sourceMappingURL=show-list.component.js.map