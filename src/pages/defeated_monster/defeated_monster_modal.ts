import {Component, OnInit} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {Settlement} from "../../model/settlement";
import {Monster} from "../../model/monster";
import {KDMCalculationService} from "../../service/kdm_calculation.service";
/**
 * Created by Daniel on 07.02.2017.
 */
@Component({
  selector: 'defeated-monster-modal',
  templateUrl: 'defeated_monster_modal.html'
})
export class DefeatedMonsterModal implements OnInit {

  settlement: Settlement;
  huntableMonsters: Monster[] = [];
  monsterLevel: number;
  monsterName: string;
  huntResources: boolean;

  constructor(public viewCtrl: ViewController, private params: NavParams, private kdmCalculation: KDMCalculationService) {
    this.settlement = this.params.get('settlement');
  }

  ngOnInit(): void {
    this.setupHuntableMonsters();
  }

  private setupHuntableMonsters(): void {
    this.settlement.quarries.forEach(monster => {
        if (monster.isHuntable) {
          this.huntableMonsters.push(monster)
        }
      }
    )
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  addClose(): void {
    if (this.monsterName != null && this.monsterLevel != null) {
      const monsterOrig = this.huntableMonsters.find(monster => monster.name === this.monsterName);
      const monster = new Monster(this.monsterName);
      monster.level = this.monsterLevel;
      if (this.huntResources) {
        this.kdmCalculation.addResourcesFromKilledMonster(this.settlement, monster, monsterOrig);
      }
      this.settlement.defeatedMonsters.push(monster);
    }

    this.close();
  }
}
