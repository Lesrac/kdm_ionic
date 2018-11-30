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
import { NavController, NavParams } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm-data.service';
import { PrincipleChooserPageComponent } from './principle-chooser.component';
import { PrincipleDetailComponent } from './principle_detail.component';
/**
 * Created by Daniel on 14.02.2017.
 */
let PrinciplesPageComponent = class PrinciplesPageComponent {
    constructor(navCtrl, params, kdmData) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.kdmData = kdmData;
        this.settlement = params.get('settlement');
        console.log(this.settlement);
    }
    ngOnInit() {
        this.kdmData.getPrincipleTypes().then(principleTypes => this.allPrincipleTypes = principleTypes);
    }
    principleIsChosen(type) {
        return this.settlement.principles.find(principle => principle.type.name === type.name) != null;
    }
    selectPrinciple(type) {
        this.navCtrl.push(PrincipleChooserPageComponent, {
            principleType: type,
            settlement: this.settlement,
        }).then();
    }
    removePrinciple(type) {
        const indexOfItemToRemove = this.settlement.principles.findIndex(principle => principle.type === type);
        if (indexOfItemToRemove >= 0) {
            this.settlement.principles.splice(indexOfItemToRemove, 1);
        }
    }
    getPrincipleName(type) {
        const principle = this.settlement.principles.find(princ => princ.type.name === type.name);
        if (principle) {
            return principle.name;
        }
        return 'not chosen';
    }
    showDetail(principleType) {
        const principle = this.settlement.principles.find(princ => princ.type.name === principleType.name);
        if (principle) {
            this.navCtrl.push(PrincipleDetailComponent, {
                principle: principle,
            }).then();
        }
    }
};
PrinciplesPageComponent = __decorate([
    Component({
        selector: 'kdmf-page-principles',
        templateUrl: 'principles.component.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, KDMDataService])
], PrinciplesPageComponent);
export { PrinciplesPageComponent };
//# sourceMappingURL=principles.component.js.map