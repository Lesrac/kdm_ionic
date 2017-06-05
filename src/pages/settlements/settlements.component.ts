import { NavController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Settlement } from '../../model/settlement';
import { SettlementPageComponent } from '../settlement/settlement.component';
import { KDMDataService } from '../../service/kdm_data.service';
import { InnovationTag } from '../../model/innovation';
import { SettlementTimeline } from '../../model/linking/settlement_timeline';
import { SettlementMilestone } from '../../model/linking/settlement_milestone';
import { HuntableMonster } from '../../model/linking/huntable_monster';
/**
 * Created by Daniel on 27.01.2017.
 */

@Component({
  selector: 'kdmf-page-settlements',
  templateUrl: 'settlements.component.html',
})
export class SettlementsPageComponent implements OnInit {
  settlements: Settlement[] = [];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private kdmService: KDMDataService) {
  }

  addSettlement(): void {
    let settlement = this.createDefaultSettlement();
    this.kdmService.addSettlement(settlement).then(stlmt => this.settlements.push(stlmt));
  }

  ngOnInit(): void {
    this.kdmService.getSettlements().then(settlements => this.settlements = settlements);
  }

  goToDetail(settlement: Settlement): void {
    this.navCtrl.push(SettlementPageComponent, {
      settlement,
    }).then();
  }

  removeSettlement(settlement: Settlement): void {
    const alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Do you want to delete ' + settlement.name + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.settlements.splice(this.settlements.indexOf(settlement), 1);
            this.kdmService.removeSettlement(settlement);
          },
        },
      ],
    });
    alert.present();
  }

  private createDefaultSettlement(): Settlement {
    // TODO probably export settlement creation to wizard or something similar
    let settlement: Settlement = new Settlement('New Settlement');
    this.createDefaultTimeline(settlement);
    this.createDefaultNemesisMonsters(settlement);
    this.createDefaultMilestoneStoryEvents(settlement);
    this.createDefaultQuarries(settlement);
    this.createDefaultSettlementLocations(settlement);
    this.createDefaultInnovations(settlement);
    return settlement;
  }

  private createDefaultTimeline(settlement: Settlement): void {
    this.kdmService.getDefaultTimeline().then(timelines => {
      timelines.forEach(timeline => {
        settlement.timeline.push(new SettlementTimeline(settlement, timeline));
      });
    });
  }

  private createDefaultNemesisMonsters(settlement: Settlement): void {
    this.kdmService.getDefaultInitialHuntableNemesisMonsters().then(nemesisMonsters =>
      nemesisMonsters.forEach(nemesisMonster => {
          const existingMonster = settlement.huntableMonsters.find(huntableMonster =>
          huntableMonster.monster.name === nemesisMonster.name);
          if (!existingMonster) {
            const settlementMonster = new HuntableMonster(settlement, nemesisMonster);
            if (nemesisMonster.name === 'Butcher') {
              settlementMonster.isHuntable = true;
            }
            settlement.huntableMonsters.push(settlementMonster);
          }
        },
      )).catch(error => {
      console.log('Error in default nemesis');
      console.log(error);
    });
  }

  private createDefaultMilestoneStoryEvents(settlement: Settlement): void {
    this.kdmService.getInitialMilestones().then(
      milestones => {
        console.log('Milestones: ', milestones.length);
        milestones.forEach(
          milestone => settlement.milestones.push(new SettlementMilestone(settlement, milestone)))
      });
  }

  private createDefaultQuarries(settlement: Settlement): void {
    this.kdmService.getDefaultInitialHuntableQuarries().then(quarries => quarries.forEach(quarry => {
        const existingMonster = settlement.huntableMonsters.find(huntableMonster =>
        huntableMonster.monster.name === quarry.name);
        if (!existingMonster) {
          const settlementMonster = new HuntableMonster(settlement, quarry);
          if (quarry.name === 'White Lion') {
            settlementMonster.isHuntable = true;
          }
          settlement.huntableMonsters.push(settlementMonster);
        }
      },
    )).catch(error => {
      console.log('Error in default quarries');
      console.log(error);
    });
  }

  private createDefaultSettlementLocations(settlement: Settlement): void {
    this.kdmService.getSettlementLocations().then(locations =>
      settlement.locations = locations.filter(location => location.isStartLocation));
  }

  private createDefaultInnovations(settlement: Settlement): void {
    this.kdmService.getInnovations().then(innovations =>
      settlement.innovations = innovations.filter(innovation =>
      innovation.tags.indexOf(InnovationTag.STARTING_INNOVATION) > -1),
    );
  }
}
