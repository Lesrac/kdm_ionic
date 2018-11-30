import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from '@ionic/angular';
import { Settlement } from '../../model/settlement';
import { Monster } from '../../model/monster';
import { KDMCalculationService } from '../../service/kdm-calculation.service';
import { HuntableMonster } from '../../model/linking/huntable-monster';
import { HuntedMonster } from '../../model/linking/hunted-monster';

/**
 * Created by Daniel on 07.02.2017.
 */
@Component({
  selector: 'kdmf-defeated-monster-modal',
  templateUrl: 'defeated-monster-modal.component.html',
})
export class DefeatedMonsterModalComponent implements OnInit {

  settlement: Settlement;
  huntableMonsters: HuntableMonster[] = [];
  monsterLevel: number = 1;
  monster: Monster;
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
    if (this.monster != null && this.monsterLevel != null) {
      const huntedMonster = new HuntedMonster(this.settlement, this.monster);
      huntedMonster.monsterLevel = +this.monsterLevel;
      if (!this.monster.isNemesis && this.huntResources) {
        this.kdmCalculation.addResourcesFromKilledMonster(huntedMonster);
      }
      this.settlement.addHuntedMonster(huntedMonster);
    }
    this.close();
  }

  private setupHuntableMonsters(): void {
    this.settlement.huntableMonsters.filter(huntableMonster => huntableMonster.isHuntable).forEach(monster => {
        this.huntableMonsters.push(monster);
      },
    );
  }

}
