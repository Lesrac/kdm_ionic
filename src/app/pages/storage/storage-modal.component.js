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
import { NavParams, ViewController } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm-data.service';
import { of, Subject } from 'rxjs';
/**
 * Created by Daniel on 19.02.2017.
 */
let StorageModalComponent = class StorageModalComponent {
    constructor(viewCtrl, params, kdmData) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.kdmData = kdmData;
        this.storageItems = [];
        this.foundStorageItems = of([]);
        this.searchNames = new Subject();
        this.settlement = this.params.get('settlement');
    }
    ngOnInit() {
        this.getStorageItems();
        this.getSearchedStorageItems();
    }
    search() {
        this.searchNames.next(this.searchName);
    }
    selectItem(storage) {
        this.storageItemName = storage.name;
    }
    add() {
        const storageItem = this.storageItems.find(item => item.name === this.storageItemName);
        if (storageItem) {
            this.settlement.addStorageItem(storageItem);
            this.settlement.storages.sort(this.kdmData.sortByName);
        }
    }
    addAndClose() {
        this.add();
        this.close();
    }
    close() {
        this.viewCtrl.dismiss();
    }
    getStorageItems() {
        this.kdmData.getAllExistingStorageItems().then(resourceArrays => {
            const resources = [];
            resourceArrays.forEach(differentResourceTypesArray => {
                differentResourceTypesArray.forEach(element => resources.push(element));
            });
            this.storageItems = resources.sort(this.kdmData.sortByName);
        });
    }
    getSearchedStorageItems() {
        /*   this.foundStorageItems = this.searchNames
             .pipe(debounceTime(500)
               switchMap(term =>
                 term
                   ? this.searchStorageItems(this.searchName)
                   : of<Storage[]>([]),
               )
                 .catch(error => {
                   // TODO error handling
                   console.log(error);
                   return of<Storage[]>([]);
                 })); */
    }
    searchStorageItems(name) {
        if (name == null || name.length < 1) {
            return of([]);
        }
        const searchRgx = new RegExp(name, 'gi');
        return of(this.storageItems.filter(resource => resource.name.match(searchRgx)));
    }
};
StorageModalComponent = __decorate([
    Component({
        selector: 'kdmf-storage-modal',
        templateUrl: 'storage-modal.component.html',
    }),
    __metadata("design:paramtypes", [ViewController, NavParams, KDMDataService])
], StorageModalComponent);
export { StorageModalComponent };
//# sourceMappingURL=storage-modal.component.js.map