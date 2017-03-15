"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var defeated_monster_modal_component_1 = require('./defeated_monster_modal.component');
/**
 * Created by Daniel on 12.02.2017.
 */
var DefeatedMonsterPageComponent = (function () {
    function DefeatedMonsterPageComponent(navCtrl, params, modalCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.settlement = params.get('settlement');
    }
    DefeatedMonsterPageComponent.prototype.addDefeatedMonster = function () {
        var modal = this.modalCtrl.create(defeated_monster_modal_component_1.DefeatedMonsterModalComponent, {
            settlement: this.settlement,
        });
        modal.present();
    };
    DefeatedMonsterPageComponent.prototype.removeDefeatedMonster = function (monster) {
        var index = this.settlement.defeatedMonsters.findIndex(function (x) { return x === monster; });
        this.settlement.defeatedMonsters.splice(index, 1);
    };
    DefeatedMonsterPageComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-page-defeated-monster',
            templateUrl: 'defeated_monster.html',
        })
    ], DefeatedMonsterPageComponent);
    return DefeatedMonsterPageComponent;
}());
exports.DefeatedMonsterPageComponent = DefeatedMonsterPageComponent;
