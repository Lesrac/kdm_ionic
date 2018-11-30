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
import { KDMDataService } from '../../service/kdm-data.service';
import { ShowListTypes } from '../../model/show-list-types';
/**
 * Created by Daniel on 16.03.2017.
 */
let ShowListAddModalComponent = class ShowListAddModalComponent {
    constructor(viewCtrl, params, kdmData) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.kdmData = kdmData;
        this.objects = [];
        this.existingObjects = [];
        this.typename = 'Non selected';
        this.objects = this.params.get('objects');
        this.type = this.params.get('type');
    }
    ngAfterViewInit() {
        this.setup();
    }
    addClose() {
        const object = this.existingObjects.find((item) => item.name === this.objectName);
        if (object) {
            this.objects.push(object);
        }
        this.close();
    }
    getRandom() {
        switch (this.type) {
            case ShowListTypes.FIGHTINGART:
                this.kdmData.getFightingArts().then(fightingArts => {
                    const start = Math.floor(Math.random() * fightingArts.length);
                    const rand = fightingArts.slice(start, start + 1);
                    this.objectName = rand[0].name;
                });
                break;
            case ShowListTypes.DISORDER:
                this.kdmData.getDisorders().then(disorders => {
                    const start = Math.floor(Math.random() * disorders.length);
                    const rand = disorders.slice(start, start + 1);
                    this.objectName = rand[0].name;
                });
                break;
            case ShowListTypes.INNOVATION:
                this.kdmData.getInnovationsThatAreNotAddedButAvailable(this.objects).then(innovations => {
                    const start = Math.floor(Math.random() * innovations.length);
                    const rand = innovations.slice(start, start + 1);
                    this.objectName = rand[0].name;
                });
                break;
            case ShowListTypes.EQUIPMENT:
                // TODO
                break;
            default:
                console.log('no random element for type: ' + this.type);
        }
    }
    selectedDescription() {
        if (this.existingObjects && this.objectName) {
            return this.existingObjects.find((item) => item.name === this.objectName).description;
        }
    }
    close() {
        this.viewCtrl.dismiss().then();
    }
    setup() {
        switch (this.type) {
            case ShowListTypes.FIGHTINGART:
                this.typename = 'Fighting Art';
                this.kdmData.getFightingArts().then(fightingArt => this.existingObjects = fightingArt.filter(art => this.objects.indexOf(art) === -1).sort(this.kdmData.sortByName));
                break;
            case ShowListTypes.DISORDER:
                this.typename = 'DISORDER';
                this.kdmData.getDisorders().then(disorders => this.existingObjects = disorders.filter(disorder => this.objects.indexOf(disorder) === -1).sort(this.kdmData.sortByName));
                break;
            case ShowListTypes.INNOVATION:
                this.typename = 'Innovation';
                this.kdmData.getInnovationsThatAreNotAddedButAvailable(this.objects).then(innovations => {
                    this.existingObjects = innovations;
                });
                break;
            case ShowListTypes.LOCATION:
                this.typename = 'Location';
                this.kdmData.getSettlementLocations().then(locations => this.existingObjects = locations.filter(location => this.objects.indexOf(location) === -1).sort(this.kdmData.sortByName));
                break;
            case ShowListTypes.EQUIPMENT:
                this.typename = 'Equipment';
                this.kdmData.getAllExistingEquipmentItems().then((itemsArray) => itemsArray.forEach((items) => {
                    for (let i = 0; i < items.length; i++) {
                        this.existingObjects.push(items[i]);
                    }
                    this.existingObjects.sort(this.kdmData.sortByName);
                }));
                break;
            default:
                console.error('unexpected type to setup add_modal: ' + this.type);
        }
    }
};
ShowListAddModalComponent = __decorate([
    Component({
        selector: 'kdmf-show-list-add',
        templateUrl: 'show-list-add-modal.component.html',
    }),
    __metadata("design:paramtypes", [ViewController, NavParams, KDMDataService])
], ShowListAddModalComponent);
export { ShowListAddModalComponent };
//# sourceMappingURL=show-list-add-modal.component.js.map