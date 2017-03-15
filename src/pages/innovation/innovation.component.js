"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var innovation_modal_component_1 = require('./innovation_modal.component');
/**
 * Created by Daniel on 19.02.2017.
 */
var InnovationPageComponent = (function () {
    function InnovationPageComponent(navCtrl, params, modalCtrl, kdmData) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.kdmData = kdmData;
        this.settlement = params.get('settlement');
        this.innovations = this.settlement.innovations.sort(this.kdmData.sortByName);
    }
    InnovationPageComponent.prototype.addInnovation = function () {
        var modal = this.modalCtrl.create(innovation_modal_component_1.InnovationModalComponent, {
            settlement: this.settlement,
        });
        modal.present();
    };
    InnovationPageComponent.prototype.removeInnovation = function (innovation) {
        var index = this.settlement.innovations.findIndex(function (x) { return x === innovation; });
        this.settlement.innovations.splice(index, 1);
    };
    InnovationPageComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-page-innovation',
            templateUrl: 'innovation.html',
        })
    ], InnovationPageComponent);
    return InnovationPageComponent;
}());
exports.InnovationPageComponent = InnovationPageComponent;
