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
import { NavParams, NavController } from 'ionic-angular';
import { Principle, PrincipleType } from '../../model/principle';
import { KDMDataService } from '../../service/kdm-data.service';
import { KDMDBService } from '../../service/kdm-db.service';
/**
 * Created by Daniel on 14.02.2017.
 */
let PrincipleChooserPageComponent = class PrincipleChooserPageComponent {
    constructor(navCtrl, params, kdmData, kdmdbService) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.kdmData = kdmData;
        this.kdmdbService = kdmdbService;
        this.principleOne = new Principle('Not loaded', 'Please return', new PrincipleType('Dummy Type'));
        this.principleTwo = new Principle('Not loaded', 'Please return', new PrincipleType('Dummy Type'));
        this.isLoading = true;
        this.settlement = params.get('settlement');
        this.principleType = params.get('principleType');
    }
    ngOnInit() {
        this.kdmData.getPrinciplesWithType(this.principleType).then(principles => {
            this.allPrinciples = principles;
            if (principles.length > 1) {
                this.principleOne = principles[0];
                this.principleTwo = principles[1];
            }
            this.isLoading = false;
        });
    }
    selectPrinciple(principle) {
        this.settlement.addPrinciple(principle);
        this.kdmdbService.saveSettlement(this.settlement);
        this.navCtrl.pop();
    }
};
PrincipleChooserPageComponent = __decorate([
    Component({
        selector: 'kdmf-page-principle-chooser',
        templateUrl: 'principle-chooser.component.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, KDMDataService,
        KDMDBService])
], PrincipleChooserPageComponent);
export { PrincipleChooserPageComponent };
//# sourceMappingURL=principle-chooser.component.js.map