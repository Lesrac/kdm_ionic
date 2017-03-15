"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var storage_modal_component_1 = require('./storage_modal.component');
/**
 * Created by Daniel on 14.02.2017.
 */
var StoragePageComponent = (function () {
    function StoragePageComponent(navCtrl, params, modalCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.settlement = params.get('settlement');
    }
    StoragePageComponent.prototype.decreaseAmount = function (storage) {
        storage.amount--;
        if (storage.amount === 0) {
            this.removeStorage(storage);
        }
    };
    StoragePageComponent.prototype.increaseAmount = function (storage) {
        storage.amount++;
    };
    StoragePageComponent.prototype.changedAmount = function (storage) {
        if (storage.amount === 0) {
            this.removeStorage(storage);
        }
    };
    StoragePageComponent.prototype.removeStorage = function (storage) {
        var index = this.settlement.storages.findIndex(function (str) { return str === storage; });
        this.settlement.storages.splice(index, 1);
    };
    StoragePageComponent.prototype.addStorageItem = function () {
        var modal = this.modalCtrl.create(storage_modal_component_1.StorageModalComponent, {
            settlement: this.settlement,
        });
        modal.present();
    };
    StoragePageComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-page-storage',
            templateUrl: 'storage.html',
        })
    ], StoragePageComponent);
    return StoragePageComponent;
}());
exports.StoragePageComponent = StoragePageComponent;
