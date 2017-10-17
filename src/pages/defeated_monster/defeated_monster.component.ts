import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DefeatedMonsterModalComponent } from './defeated_monster_modal.component';
import { Settlement } from '../../model/settlement';
import { HuntedMonster } from '../../model/linking/hunted_monster';
import { AddedResourcesModalComponent } from './added_resources_modal.component';
import { KDMDataService } from '../../service/kdm_data.service';

/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-defeated-monster',
  templateUrl: 'defeated_monster.component.html',
})
export class DefeatedMonsterPageComponent implements OnInit {

  settlement: Settlement;
  countedHuntedMonsters: number;
  defeatedMonsters: Array<[number, string, number]> = [];

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController,
              private kdmData: KDMDataService) {
    this.settlement = params.get('settlement');
  }

  ngOnInit(): void {
    this.setup();
  }

  addDefeatedMonster(): void {
    this.countedHuntedMonsters = this.settlement.huntedMonsters.length;
    let modal = this.modalCtrl.create(DefeatedMonsterModalComponent, {
      settlement: this.settlement,
    });
    modal.present();
    modal.onDidDismiss(() => {
      this.setup();
      const huntedMonsters = this.settlement.huntedMonsters;
      const huntedMonstersCount: number = huntedMonsters.length;
      if (huntedMonstersCount > this.countedHuntedMonsters &&
        huntedMonsters[huntedMonstersCount - 1].huntedResources.length > 0) {
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

  setup(): void {
    this.defeatedMonsters = [];
    this.settlement.huntedMonsters.forEach(huntedMonster =>
      this.kdmData.getMonster(huntedMonster.monster).then(monster =>
        this.defeatedMonsters.push([monster.id, monster.name, monster.level])),
    );
  }
}
