"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var fighting_art_modal_component_1 = require('./fighting_art_modal.component');
/**
 * Created by Daniel on 12.03.2017.
 */
var FightingArtPageComponent = (function () {
    function FightingArtPageComponent(navCtrl, params, modalCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.fightingArts = params.get('fightingArts');
    }
    FightingArtPageComponent.prototype.addFightingArt = function () {
        var modal = this.modalCtrl.create(fighting_art_modal_component_1.FightingArtModalComponent, {
            fightingArts: this.fightingArts,
        });
        modal.present();
    };
    FightingArtPageComponent.prototype.removeFightingArt = function (disorder) {
        var index = this.fightingArts.findIndex(function (x) { return x === disorder; });
        this.fightingArts.splice(index, 1);
    };
    FightingArtPageComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-page-fighting-art',
            templateUrl: 'fighting_art.html',
        })
    ], FightingArtPageComponent);
    return FightingArtPageComponent;
}());
exports.FightingArtPageComponent = FightingArtPageComponent;
