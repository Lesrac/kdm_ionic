"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var monster_1 = require('../../model/monster');
/**
 * Created by Daniel on 07.02.2017.
 */
var DefeatedMonsterModalComponent = (function () {
    function DefeatedMonsterModalComponent(viewCtrl, params, kdmCalculation) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.kdmCalculation = kdmCalculation;
        this.huntableMonsters = [];
        this.settlement = this.params.get('settlement');
    }
    DefeatedMonsterModalComponent.prototype.ngOnInit = function () {
        this.setupHuntableMonsters();
    };
    DefeatedMonsterModalComponent.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    DefeatedMonsterModalComponent.prototype.addClose = function () {
        var _this = this;
        if (this.monsterName != null && this.monsterLevel != null) {
            var monsterOrig = this.huntableMonsters.find(function (monster) { return monster.name === _this.monsterName; });
            var monster = new monster_1.Monster(this.monsterName);
            monster.level = +this.monsterLevel;
            if (this.huntResources) {
                this.kdmCalculation.addResourcesFromKilledMonster(this.settlement, monster, monsterOrig);
            }
            this.settlement.defeatedMonsters.push(monster);
        }
        this.close();
    };
    DefeatedMonsterModalComponent.prototype.setupHuntableMonsters = function () {
        var _this = this;
        this.settlement.quarries.forEach(function (monster) {
            if (monster.isHuntable) {
                _this.huntableMonsters.push(monster);
            }
        });
    };
    DefeatedMonsterModalComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-defeated-monster-modal',
            templateUrl: 'defeated_monster_modal.html',
        })
    ], DefeatedMonsterModalComponent);
    return DefeatedMonsterModalComponent;
}());
exports.DefeatedMonsterModalComponent = DefeatedMonsterModalComponent;
