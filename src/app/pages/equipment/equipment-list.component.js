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
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm_data.service';
/**
 * Created by Daniel on 06.01.2018.
 */
let EquipmentListPageComponent = class EquipmentListPageComponent {
    constructor(navCtrl, params, modalCtrl, kdmData) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.kdmData = kdmData;
        this.equipments = [];
        this.allEquipments = [];
        if (params.get('equipments')) {
            params.get('equipments').forEach(eq => {
                this.equipments.push(Object.assign({}, eq));
            });
        }
        this.position = params.get('position');
        this.survivor = params.get('survivor');
    }
    ngAfterViewInit() {
        this.kdmData.getAllExistingEquipmentItems().then((arrayOfArrays) => {
            arrayOfArrays.forEach(arrayOfItems => {
                this.allEquipments.push.apply(this.allEquipments, arrayOfItems);
            });
            this.allEquipments.sort(this.kdmData.sortByName);
        });
    }
    pushEquipment() {
        const eq = this.allEquipments.find(equipment => equipment.name === this.equipmentName);
        if (eq) {
            this.survivor.equipments.set(this.position, eq);
            this.navCtrl.pop();
        }
    }
    setEquipment(eq) {
        this.survivor.equipments.set(this.position, eq);
        this.navCtrl.pop();
    }
};
EquipmentListPageComponent = __decorate([
    Component({
        selector: 'kdmf-page-equipment-list',
        templateUrl: 'equipment_list.component.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ModalController,
        KDMDataService])
], EquipmentListPageComponent);
export { EquipmentListPageComponent };
//# sourceMappingURL=equipment_list.component.js.map