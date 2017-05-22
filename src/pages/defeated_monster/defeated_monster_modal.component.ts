import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { Monster } from '../../model/monster';
import { KDMCalculationService } from '../../service/kdm_calculation.service';
import { SettlementMonster } from '../../model/linking/settlement_monster';
/**
 * Created by Daniel on 07.02.2017.
 */
@Component({
  selector: 'kdmf-defeated-monster-modal',
  templateUrl: 'defeated_monster_modal.component.html',
})
export class DefeatedMonsterModalComponent implements OnInit {

  settlement: Settlement;
  huntableMonsters: SettlementMonster[] = [];
  monsterLevel: number;
  monsterName: string;
  huntResources: boolean;

  constructor(public viewCtrl: ViewController, private params: NavParams,
              private kdmCalculation: KDMCalculationService) {
    this.settlement = this.params.get('settlement');
  }

  ngOnInit(): void {
    this.setupHuntableMonsters();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  addClose(): void {
    if (this.monsterName != null && this.monsterLevel != null) {
      const monsterOrig = this.huntableMonsters.find(huntableMonster =>
      huntableMonster.monster.name === this.monsterName).monster;
      const mon = new Monster(this.monsterName);
      mon.level = +this.monsterLevel;
      const settlementMonster = new SettlementMonster(this.settlement, mon);
      if (this.huntResources) {
        this.kdmCalculation.addResourcesFromKilledMonster(settlementMonster, monsterOrig);
      }
      this.settlement.defeatedMonsters.push(settlementMonster);
    }

    this.close();
  }

  private setupHuntableMonsters(): void {
    this.settlement.monsters.filter(monster => monster.isHuntable).forEach(monster => {
        if (monster.isHuntable) {
          this.huntableMonsters.push(monster);
        }
      },
    );
  }
}
