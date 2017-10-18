import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { Monster } from '../../model/monster';
import { KDMCalculationService } from '../../service/kdm_calculation.service';
import { HuntableMonster } from '../../model/linking/huntable_monster';
import { HuntedMonster } from '../../model/linking/hunted_monster';

/**
 * Created by Daniel on 07.02.2017.
 */
@Component({
  selector: 'kdmf-defeated-monster-modal',
  templateUrl: 'defeated_monster_modal.component.html',
})
export class DefeatedMonsterModalComponent implements OnInit {

  settlement: Settlement;
  huntableMonsters: HuntableMonster[] = [];
  monsterLevel: number = 1;
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
      const huntedMonster = new HuntedMonster(this.settlement, mon);
      if (this.huntResources) {
        this.kdmCalculation.addResourcesFromKilledMonster(huntedMonster, monsterOrig);
      }
      this.settlement.huntedMonsters.push(huntedMonster);
    }

    this.close();
  }

  checkMonsterLevel(name: string, level: number): boolean {
    return (this.huntableMonsters.find(huntableMonster => huntableMonster.monster.name === name &&
      huntableMonster.monster.level === level)) != null;
  }

  private setupHuntableMonsters(): void {
    this.settlement.huntableMonsters.filter(huntableMonster => huntableMonster.isHuntable).forEach(monster => {
        if (monster.isHuntable) {
          this.huntableMonsters.push(monster);
        }
      },
    );
  }

}
