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
import { NavParams, NavController, ModalController } from 'ionic-angular';
import { StorageModalComponent } from './storage-modal.component';
import { ShowListDetailComponent } from '../template/show-list-detail.component';
import { KDMDBService } from '../../service/kdm-db.service';
import { KDMDataService } from '../../service/kdm-data.service';
/**
 * Created by Daniel on 14.02.2017.
 */
let StoragePageComponent = class StoragePageComponent {
    constructor(navCtrl, params, modalCtrl, kdmdbService, kdmService) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.kdmdbService = kdmdbService;
        this.kdmService = kdmService;
        this.settlement = params.get('settlement');
        this.settlement.storages.sort(kdmService.sortByName);
    }
    decreaseAmount(storage) {
        storage.amount--;
        if (storage.amount === 0) {
            this.removeStorage(storage);
        }
    }
    increaseAmount(storage) {
        storage.amount++;
    }
    changedAmount(storage) {
        if (storage.amount === 0) {
            this.removeStorage(storage);
        }
    }
    removeStorage(storage) {
        const index = this.settlement.storages.findIndex(str => str === storage);
        this.settlement.storages.splice(index, 1);
        storage.amountChanged.next(0);
    }
    addStorageItem() {
        let modal = this.modalCtrl.create(StorageModalComponent, {
            settlement: this.settlement,
        });
        modal.present();
    }
    showDetail(storageItem) {
        this.navCtrl.push(ShowListDetailComponent, {
            object: storageItem,
        }).then();
    }
};
StoragePageComponent = __decorate([
    Component({
        selector: 'kdmf-page-storage',
        templateUrl: 'storage.component.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ModalController,
        KDMDBService, KDMDataService])
], StoragePageComponent);
export { StoragePageComponent };
//# sourceMappingURL=storage.component.js.map