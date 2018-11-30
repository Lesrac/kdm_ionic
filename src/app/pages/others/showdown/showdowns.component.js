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
import { KDMDBService } from '../../../service/kdm-db.service';
import { KDMDataService } from '../../../service/kdm-data.service';
import { ShowdownPageComponent } from './showdown.component';
/**
 * Created by Daniel on 14.02.2017.
 */
let ShowdownsPageComponent = class ShowdownsPageComponent {
    constructor(navCtrl, params, modalCtrl, kdmdbService, kdmService) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.kdmdbService = kdmdbService;
        this.kdmService = kdmService;
        this.showdownMonsters = [];
    }
    ngOnInit() {
        this.kdmService.getMonsters().then(monsters => this.showdownMonsters = monsters.sort(this.kdmService.sortByName));
    }
    goToDetail(monster) {
        this.navCtrl.push(ShowdownPageComponent, {
            monster: monster,
        }).then();
    }
};
ShowdownsPageComponent = __decorate([
    Component({
        selector: 'kdmf-page-showdowns',
        templateUrl: 'showdowns.component.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ModalController,
        KDMDBService, KDMDataService])
], ShowdownsPageComponent);
export { ShowdownsPageComponent };
//# sourceMappingURL=showdowns.component.js.map