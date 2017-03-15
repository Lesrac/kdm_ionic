"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
 * Created by Daniel on 04.02.2017.
 */
var CreateSettlementPopoverComponent = (function () {
    function CreateSettlementPopoverComponent(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.settlement = this.params.get('se');
    }
    CreateSettlementPopoverComponent.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    CreateSettlementPopoverComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-create-settlement-popover',
            templateUrl: 'create_settlement_popover.html',
        })
    ], CreateSettlementPopoverComponent);
    return CreateSettlementPopoverComponent;
}());
exports.CreateSettlementPopoverComponent = CreateSettlementPopoverComponent;
