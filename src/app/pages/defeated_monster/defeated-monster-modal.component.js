var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { KDMCalculationService } from '../../service/kdm-calculation.service';
import { HuntedMonster } from '../../model/linking/hunted-monster';
/**
 * Created by Daniel on 07.02.2017.
 */
let DefeatedMonsterModalComponent = class DefeatedMonsterModalComponent {
    constructor(viewCtrl, params, kdmCalculation) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.kdmCalculation = kdmCalculation;
        this.huntableMonsters = [];
        this.monsterLevel = 1;
        this.settlement = this.params.get('settlement');
    }
    ngOnInit() {
        this.setupHuntableMonsters();
    }
    close() {
        this.viewCtrl.dismiss();
    }
    addClose() {
        if (this.monster != null && this.monsterLevel != null) {
            const huntedMonster = new HuntedMonster(this.settlement, this.monster);
            huntedMonster.monsterLevel = +this.monsterLevel;
            if (!this.monster.isNemesis && this.huntResources) {
                this.kdmCalculation.addResourcesFromKilledMonster(huntedMonster);
            }
            this.settlement.addHuntedMonster(huntedMonster);
        }
        this.close();
    }
    setupHuntableMonsters() {
        this.settlement.huntableMonsters.filter(huntableMonster => huntableMonster.isHuntable).forEach(monster => {
            this.huntableMonsters.push(monster);
        });
    }
};
DefeatedMonsterModalComponent = __decorate([
    Component({
        selector: 'kdmf-defeated-monster-modal',
        templateUrl: 'defeated-monster-modal.component.html',
    }),
    __metadata("design:paramtypes", [ViewController, NavParams,
        KDMCalculationService])
], DefeatedMonsterModalComponent);
export { DefeatedMonsterModalComponent };
//# sourceMappingURL=defeated-monster-modal.component.js.map