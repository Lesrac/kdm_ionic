"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var rxjs_1 = require('rxjs');
/**
 * Created by Daniel on 19.02.2017.
 */
var StorageModalComponent = (function () {
    function StorageModalComponent(viewCtrl, params, kdmData) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.kdmData = kdmData;
        this.searchNames = new rxjs_1.Subject();
        this.settlement = this.params.get('settlement');
    }
    StorageModalComponent.prototype.ngOnInit = function () {
        this.getStorageItems();
        this.getSearchedStorageItems();
    };
    StorageModalComponent.prototype.search = function () {
        this.searchNames.next(this.searchName);
    };
    StorageModalComponent.prototype.selectItem = function (storage) {
        this.storageItemName = storage.name;
    };
    StorageModalComponent.prototype.addClose = function () {
        var _this = this;
        var storageItem = this.storageItems.find(function (item) { return item.name === _this.storageItemName; });
        if (storageItem) {
            this.settlement.addStorageItem(storageItem);
        }
        this.close();
    };
    StorageModalComponent.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    StorageModalComponent.prototype.getStorageItems = function () {
        var _this = this;
        this.kdmData.getResources().then(function (resources) {
            return _this.storageItems = resources.sort(_this.kdmData.sortByName);
        });
    };
    StorageModalComponent.prototype.getSearchedStorageItems = function () {
        var _this = this;
        this.foundStorageItems = this.searchNames
            .debounceTime(500)
            .switchMap(function (term) {
            return term
                ? _this.searchStorageItems(_this.searchName)
                : rxjs_1.Observable.of([]);
        })
            .catch(function (error) {
            // TODO error handling
            console.log(error);
            return rxjs_1.Observable.of([]);
        });
    };
    StorageModalComponent.prototype.searchStorageItems = function (name) {
        if (name == null || name.length < 1) {
            return rxjs_1.Observable.of([]);
        }
        var searchRgx = new RegExp(name, 'gi');
        return rxjs_1.Observable.of(this.storageItems.filter(function (resource) {
            return resource.name.match(searchRgx);
        }));
    };
    StorageModalComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-storage-modal',
            templateUrl: 'storage_modal.html',
        })
    ], StorageModalComponent);
    return StorageModalComponent;
}());
exports.StorageModalComponent = StorageModalComponent;
