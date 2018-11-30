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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DefeatedMonsterModalComponent } from './defeated-monster-modal.component';
import { AddedResourcesModalComponent } from './added-resources-modal.component';
import { KDMDBService } from '../../service/kdm-db.service';
import { FormattedTextModalComponent } from '../template/formatted-text-modal.component';
/**
 * Created by Daniel on 12.02.2017.
 */
let DefeatedMonsterPageComponent = class DefeatedMonsterPageComponent {
    constructor(navCtrl, params, modalCtrl, kdmdbService) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.kdmdbService = kdmdbService;
        this.settlement = params.get('settlement');
    }
    addDefeatedMonster() {
        this.countedHuntedMonsters = this.settlement.huntedMonsters.length;
        let modal = this.modalCtrl.create(DefeatedMonsterModalComponent, {
            settlement: this.settlement,
        });
        modal.present();
        modal.onDidDismiss(() => {
            const huntedMonsters = this.settlement.huntedMonsters;
            const huntedMonstersCount = huntedMonsters.length;
            if (huntedMonstersCount > this.countedHuntedMonsters) {
                const huntedMonster = huntedMonsters[huntedMonstersCount - 1];
                modal = this.modalCtrl.create(FormattedTextModalComponent, {
                    title: 'Defeated ' + huntedMonster.monster.name,
                    text: huntedMonster.monster.rewardText,
                });
                modal.present();
                if (huntedMonsters[huntedMonstersCount - 1].huntedResources.length > 0) {
                    modal = this.modalCtrl.create(AddedResourcesModalComponent, {
                        huntedMonster: huntedMonster,
                    });
                    modal.present();
                }
            }
        });
    }
    removeDefeatedMonster(huntedMonster) {
        const index = this.settlement.huntedMonsters.findIndex(hMonster => hMonster === huntedMonster);
        this.settlement.huntedMonsters.splice(index, 1);
        // todo check and change isDefeatedLvl
    }
};
DefeatedMonsterPageComponent = __decorate([
    Component({
        selector: 'kdmf-page-defeated-monster',
        templateUrl: 'defeated-monster.component.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ModalController,
        KDMDBService])
], DefeatedMonsterPageComponent);
export { DefeatedMonsterPageComponent };
//# sourceMappingURL=defeated-monster.component.js.map