import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DefeatedMonsterModalComponent } from './defeated-monster-modal.component';
import { Settlement } from '../../model/settlement';
import { HuntedMonster } from '../../model/linking/hunted-monster';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KDMDataService } from '../../service/kdm-data.service';
import { FormattedTextModalComponent } from '../template/formatted-text-modal.component';
import { AddedResourcesModalComponent } from './added-resources-modal.component';

/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-defeated-monster', templateUrl: 'defeated-monster.component.html',
})
export class DefeatedMonsterPageComponent implements OnInit {

  settlementLocal: Settlement;
  settlement$: Observable<Settlement>;
  countedHuntedMonsters: number;

  constructor(public router: Router, public route: ActivatedRoute, public modalCtrl: ModalController, public kdmData: KDMDataService) {
  }

  ngOnInit(): void {
    this.settlement$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
        const stlmt = this.kdmData.getSettlement(+params.get('id'));
        stlmt.then(settlement => this.settlementLocal = settlement);
        return stlmt;
      },
    ));
  }

  addDefeatedMonster(): void {
    this.countedHuntedMonsters = this.settlementLocal.huntedMonsters.length;
    this.modalCtrl.create({
      component: DefeatedMonsterModalComponent, componentProps: {
        settlement: this.settlementLocal,
      },
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      modal.onDidDismiss().then(() => {
        const huntedMonsters = this.settlementLocal.huntedMonsters;
        const huntedMonstersCount: number = huntedMonsters.length;
        if (huntedMonstersCount > this.countedHuntedMonsters) {
          const huntedMonster: HuntedMonster = huntedMonsters[huntedMonstersCount - 1];
          this.modalCtrl.create({
            component: FormattedTextModalComponent, componentProps: {
              title: 'Defeated ' + huntedMonster.monster.name, text: huntedMonster.monster.rewardText,
            },
          }).then(mod => {
            mod.present();
            if (huntedMonsters[huntedMonstersCount - 1].huntedResources.length > 0) {
              this.modalCtrl.create({component: AddedResourcesModalComponent, componentProps: {
                  huntedMonster: huntedMonster,
                }}).then(dal => dal.present());
            }
          });
        }
      });
    });
  }

  removeDefeatedMonster(huntedMonster: HuntedMonster): void {
    const index = this.settlementLocal.huntedMonsters.findIndex(hMonster => hMonster === huntedMonster);
    this.settlementLocal.huntedMonsters.splice(index, 1);
    // todo check and change isDefeatedLvl
  }
}
