import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { Monster } from '../../model/monster';
import { KDMCalculationService } from '../../service/kdm_calculation.service';
import { HuntedMonster } from '../../model/linking/hunted_monster';
import { KDMDataService } from '../../service/kdm_data.service';

/**
 * Created by Daniel on 07.02.2017.
 */
@Component({
  selector: 'kdmf-defeated-monster-modal',
  templateUrl: 'defeated_monster_modal.component.html',
})
export class DefeatedMonsterModalComponent implements OnInit {

  settlement: Settlement;
  monsters: Monster[] = [];
  huntableMonstersNameId: Array<[number, string]> = [];
  monsterLevel: number = 1;
  monsterId: number;
  huntResources: boolean;

  constructor(public viewCtrl: ViewController, private params: NavParams,
              private kdmCalculation: KDMCalculationService, private kdmData: KDMDataService) {
    this.settlement = this.params.get('settlement');
  }

  ngOnInit(): void {
    this.setupHuntableMonsters();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  addClose(): void {
    if (this.monsterId != null && this.monsterLevel != null) {
      const level = +this.monsterLevel;
      const id = +this.monsterId;
      const monsterOrig = this.monsters.find(monster =>
        monster.id === id);
      const huntedMonster = new HuntedMonster(this.settlement, id, level);
      if (this.huntResources) {
        this.kdmCalculation.addResourcesFromKilledMonster(huntedMonster, monsterOrig, level);
      }
      this.settlement.huntedMonsters.push(huntedMonster);
    }

    this.close();
  }

  private setupHuntableMonsters(): void {
    this.settlement.huntableMonsters.filter(huntableMonster => huntableMonster.isHuntable).forEach(monster => {
        if (monster.isHuntable) {
          this.kdmData.getMonster(monster.monster).then(mnstr => {
            this.huntableMonstersNameId.push([monster.monster, mnstr.name]);
            this.monsters.push(mnstr);
          });
        }
      },
    );
  }

}
