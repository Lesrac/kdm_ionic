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
var FightingArtModalComponent = (function () {
    function FightingArtModalComponent(viewCtrl, params, kdmData) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.kdmData = kdmData;
        this.fightingArts = this.params.get('objects');
    }
    FightingArtModalComponent.prototype.ngOnInit = function () {
        this.setupExistingFightingArts();
    };
    FightingArtModalComponent.prototype.addClose = function () {
        var _this = this;
        var fightingArt = this.existingFightingArts.find(function (item) { return item.name === _this.fightingArtName; });
        if (fightingArt) {
            this.fightingArts.push(fightingArt);
        }
        this.close();
    };
    FightingArtModalComponent.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    FightingArtModalComponent.prototype.setupExistingFightingArts = function () {
        var _this = this;
        this.kdmData.getFightingArts().then(function (fightingArt) {
            return _this.existingFightingArts = fightingArt.sort(_this.kdmData.sortByName);
        });
    };
    FightingArtModalComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-fighting-art-modal',
            templateUrl: 'fighting_art_modal.html',
        })
    ], FightingArtModalComponent);
    return FightingArtModalComponent;
}());
exports.FightingArtModalComponent = FightingArtModalComponent;