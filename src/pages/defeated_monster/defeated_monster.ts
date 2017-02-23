import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DefeatedMonsterModal } from './defeated_monster_modal';
import { Settlement } from '../../model/settlement';
import { Monster } from '../../model/monster';
/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-defeated-monster',
  templateUrl: 'defeated_monster.html',
})
export class DefeatedMonsterPage {

  settlement: Settlement;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.settlement = params.get('settlement');
  }

  addDefeatedMonster(): void {
    let modal = this.modalCtrl.create(DefeatedMonsterModal, {
      settlement: this.settlement,
    });
    modal.present();
  }

  removeDefeatedMonster(monster: Monster): void {
    const index = this.settlement.defeatedMonsters.findIndex(x => x === monster);
    this.settlement.defeatedMonsters.splice(index, 1);
  }
}
