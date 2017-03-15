"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var disorder_modal_component_1 = require('./disorder_modal.component');
/**
 * Created by Daniel on 12.03.2017.
 */
var DisordersPageComponent = (function () {
    function DisordersPageComponent(navCtrl, params, modalCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.disorders = params.get('disorders');
    }
    DisordersPageComponent.prototype.addDisorder = function () {
        var modal = this.modalCtrl.create(disorder_modal_component_1.DisorderModalComponent, {
            disorders: this.disorders,
        });
        modal.present();
    };
    DisordersPageComponent.prototype.removeDisorder = function (disorder) {
        var index = this.disorders.findIndex(function (x) { return x === disorder; });
        this.disorders.splice(index, 1);
    };
    DisordersPageComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-page-disorder',
            templateUrl: 'disorders.html',
        })
    ], DisordersPageComponent);
    return DisordersPageComponent;
}());
exports.DisordersPageComponent = DisordersPageComponent;
