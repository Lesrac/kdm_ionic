import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DefeatedMonsterModalComponent } from './defeated_monster_modal.component';
import { Settlement } from '../../model/settlement';
import { Monster } from '../../model/monster';
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

  removeDefeatedMonster(monster: Monster): void {
    const index = this.settlement.defeatedMonsters.findIndex(x => x === monster);
    this.settlement.defeatedMonsters.splice(index, 1);
  }
}
