"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var survivor_1 = require('../../model/survivor');
var survivor_component_1 = require('../survivor/survivor.component');
/**
 * Created by Daniel on 24.02.2017.
 */
var SurvivorsPageComponent = (function () {
    function SurvivorsPageComponent(navCtrl, kdmService) {
        this.navCtrl = navCtrl;
        this.kdmService = kdmService;
        this.settlementId = -1;
    }
    SurvivorsPageComponent.prototype.ngOnInit = function () {
        this.getSettlements();
    };
    SurvivorsPageComponent.prototype.goToDetail = function (survivor) {
        this.navCtrl.push(survivor_component_1.SurvivorPageComponent, {
            survivor: survivor,
        }).then();
    };
    SurvivorsPageComponent.prototype.selectedSettlement = function (settlement) {
        if (settlement) {
            this.tempSettlement = settlement;
        }
    };
    SurvivorsPageComponent.prototype.confirmChange = function () {
        if (this.tempSettlement) {
            this.settlement = this.tempSettlement;
            this.settlementId = this.settlement.id;
        }
    };
    SurvivorsPageComponent.prototype.addSurvivor = function () {
        this.settlement.survivors.push(new survivor_1.Survivor('Survivor ' + survivor_1.Survivor.counter));
    };
    SurvivorsPageComponent.prototype.survivorsCheck = function () {
        return (this.settlement &&
            this.settlement.survivors.filter(function (survivor) { return survivor.isAlive; }).length > this.settlement.population);
    };
    SurvivorsPageComponent.prototype.removeSurvivor = function (survivor) {
        var index = this.settlement.survivors.findIndex(function (s) { return survivor === s; });
        if (index >= 0) {
            this.settlement.survivors.splice(index, 1);
        }
    };
    SurvivorsPageComponent.prototype.getSettlements = function () {
        var _this = this;
        this.kdmService.getSettlements().then(function (settlements) {
            if (settlements) {
                _this.settlements = settlements;
            }
            else {
                _this.settlements = [];
            }
        });
    };
    SurvivorsPageComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-page-survivors',
            templateUrl: 'survivors.html',
        })
    ], SurvivorsPageComponent);
    return SurvivorsPageComponent;
}());
exports.SurvivorsPageComponent = SurvivorsPageComponent;
