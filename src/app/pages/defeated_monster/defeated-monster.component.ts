import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DefeatedMonsterModalComponent } from './defeated-monster-modal.component';
import { Settlement } from '../../model/settlement';
import { HuntedMonster } from '../../model/linking/hunted-monster';
import { KDMDBService } from '../../service/kdm-db.service';
import { Router } from '@angular/router';

/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-defeated-monster', templateUrl: 'defeated-monster.component.html',
})
export class DefeatedMonsterPageComponent {

  settlement: Settlement;
  countedHuntedMonsters: number;

  constructor(public router: Router, public params: NavParams, public modalCtrl: ModalController, private kdmdbService: KDMDBService) {
    this.settlement = params.get('settlement');
  }

  addDefeatedMonster(): void {
    this.countedHuntedMonsters = this.settlement.huntedMonsters.length;
    this.modalCtrl.create({
      component: DefeatedMonsterModalComponent, componentProps: {
        settlement: this.settlement,
      }
    }).then(modal => modal.present());
    /* TODO   modal.onDidDismiss(() => {
         const huntedMonsters = this.settlement.huntedMonsters;
         const huntedMonstersCount: number = huntedMonsters.length;
         if (huntedMonstersCount > this.countedHuntedMonsters) {
           const huntedMonster: HuntedMonster = huntedMonsters[huntedMonstersCount - 1];
           modal = this.modalCtrl.create(FormattedTextModalComponent, {
             title: 'Defeated ' + huntedMonster.monster.name, text: huntedMonster.monster.rewardText,
           });
           modal.present();
           if (huntedMonsters[huntedMonstersCount - 1].huntedResources.length > 0) {
             modal = this.modalCtrl.create(AddedResourcesModalComponent, {
               huntedMonster: huntedMonster,
             });
             modal.present();
           }
         }
       }); */
  }

  removeDefeatedMonster(huntedMonster: HuntedMonster): void {
    const index = this.settlement.huntedMonsters.findIndex(hMonster => hMonster === huntedMonster);
    this.settlement.huntedMonsters.splice(index, 1);
    // todo check and change isDefeatedLvl
  }
}
