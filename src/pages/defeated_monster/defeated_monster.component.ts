import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DefeatedMonsterModalComponent } from './defeated_monster_modal.component';
import { Settlement } from '../../model/settlement';
import { HuntedMonster } from '../../model/linking/hunted_monster';
import { AddedResourcesModalComponent } from './added_resources_modal.component';

/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-defeated-monster',
  templateUrl: 'defeated_monster.component.html',
})
export class DefeatedMonsterPageComponent {

  settlement: Settlement;
  countedHuntedMonsters: number;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.settlement = params.get('settlement');
  }

  addDefeatedMonster(): void {
    this.countedHuntedMonsters = this.settlement.huntedMonsters.length;
    let modal = this.modalCtrl.create(DefeatedMonsterModalComponent, {
      settlement: this.settlement,
    });
    modal.present();
    modal.onDidDismiss(() => {
      console.log('dismissed');
      const huntedMonsters = this.settlement.huntedMonsters;
      const huntedMonstersCount: number = huntedMonsters.length;
      if (huntedMonstersCount > this.countedHuntedMonsters &&
        huntedMonsters[huntedMonstersCount - 1].huntedResources.length > 0) {
        console.log('there where resources');
        modal = this.modalCtrl.create(AddedResourcesModalComponent, {
          huntedMonster: huntedMonsters[huntedMonstersCount - 1],
        });
        modal.present();
      }
    });
  }

  removeDefeatedMonster(huntedMonster: HuntedMonster): void {
    const index = this.settlement.huntedMonsters.findIndex(hMonster => hMonster === huntedMonster);
    this.settlement.huntableMonsters.splice(index, 1);
    // todo check and change isDefeatedLvl
  }
}
