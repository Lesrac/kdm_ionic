"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
 * Created by Daniel on 12.03.2017.
 */
var DisorderModalComponent = (function () {
    function DisorderModalComponent(viewCtrl, params, kdmData) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.kdmData = kdmData;
        this.disorders = this.params.get('disorders');
    }
    DisorderModalComponent.prototype.ngOnInit = function () {
        this.setupExistingDisorders();
    };
    DisorderModalComponent.prototype.addClose = function () {
        var _this = this;
        var disorder = this.existingDisorders.find(function (item) { return item.name === _this.disorderName; });
        if (disorder) {
            this.disorders.push(disorder);
        }
        this.close();
    };
    DisorderModalComponent.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    DisorderModalComponent.prototype.setupExistingDisorders = function () {
        var _this = this;
        this.kdmData.getDisorders().then(function (disorders) {
            return _this.existingDisorders = disorders.sort(_this.kdmData.sortByName);
        });
    };
    DisorderModalComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-disorder-modal',
            templateUrl: 'disorder_modal.html',
        })
    ], DisorderModalComponent);
    return DisorderModalComponent;
}());
exports.DisorderModalComponent = DisorderModalComponent;
