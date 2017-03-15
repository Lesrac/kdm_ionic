"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
 * Created by Daniel on 19.02.2017.
 */
var InnovationModalComponent = (function () {
    function InnovationModalComponent(viewCtrl, params, kdmData) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.kdmData = kdmData;
        this.settlement = this.params.get('settlement');
    }
    InnovationModalComponent.prototype.ngOnInit = function () {
        this.setupUsableInnovations();
    };
    InnovationModalComponent.prototype.addClose = function () {
        var _this = this;
        var innovation = this.usableInnovations.find(function (item) { return item.name === _this.innovationName; });
        if (innovation) {
            this.settlement.innovations.push(innovation);
        }
        this.close();
    };
    InnovationModalComponent.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    InnovationModalComponent.prototype.setupUsableInnovations = function () {
        var _this = this;
        this.kdmData.getInnovations().then(function (innovations) {
            return _this.usableInnovations = innovations.filter(function (innovation) {
                return _this.settlement.innovations.indexOf(innovation) < 0 && innovation.tags.some(function (tag) {
                    return _this.settlement.innovations.filter(function (inov) {
                        return inov.consequence === tag;
                    }).length > 0;
                });
            }).sort(_this.kdmData.sortByName);
        });
    };
    InnovationModalComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-innovation-modal',
            templateUrl: 'innovation_modal.html',
        })
    ], InnovationModalComponent);
    return InnovationModalComponent;
}());
exports.InnovationModalComponent = InnovationModalComponent;
