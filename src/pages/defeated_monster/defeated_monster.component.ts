import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DefeatedMonsterModalComponent } from './defeated_monster_modal.component';
import { Settlement } from '../../model/settlement';
import { HuntedMonster } from '../../model/linking/hunted_monster';
/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-defeated-monster',
  templateUrl: 'defeated_monster.component.html',
})
export class DefeatedMonsterPageComponent {

  settlement: Settlement;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.settlement = params.get('settlement');
  }

  addDefeatedMonster(): void {
    let modal = this.modalCtrl.create(DefeatedMonsterModalComponent, {
      settlement: this.settlement,
    });
    modal.present();
  }

  removeDefeatedMonster(huntedMonster: HuntedMonster): void {
    const index = this.settlement.huntedMonsters.findIndex(hMonster => hMonster === huntedMonster);
    this.settlement.huntableMonsters.splice(index, 1);
    // todo check and change isDefeatedLvl
  }
}
