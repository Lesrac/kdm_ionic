import {Component} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {Settlement} from "../../models/settlement";
import {Monster} from "../../models/monster";
/**
 * Created by Daniel on 07.02.2017.
 */
@Component({
  selector: 'defeated-monster-modal',
  templateUrl: 'defeated_monster_modal.html'
})
export class DefeatedMonsterModal {
  settlement: Settlement;
  huntableMonsters: Monster[] = [];
  monsterLevel: number;
  monsterName: string;

  constructor(public viewCtrl: ViewController, private params: NavParams) {
    this.settlement = this.params.get('settlement');
    this.settlement.quarries.forEach(monster => {
        if (monster.isHuntable) {
          this.huntableMonsters.push(monster)
        }
      }
    )
  }

  close() {
    let monster = this.huntableMonsters.find(monster => monster.name === this.monsterName);
    monster.level = this.monsterLevel;
    this.settlement.defeatedMonsters.push(monster);
    this.viewCtrl.dismiss();
  }
}
