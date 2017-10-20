import { NavController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Settlement } from '../../model/settlement';
import { SettlementPageComponent } from '../settlement/settlement.component';
import { KDMDataService } from '../../service/kdm_data.service';
import { Innovation, InnovationTag } from '../../model/innovation';
import { SettlementTimeline } from '../../model/linking/settlement_timeline';
import { SettlementMilestone } from '../../model/linking/settlement_milestone';
import { HuntableMonster } from '../../model/linking/huntable_monster';
import { Timeline } from '../../model/timeline';
import { Monster } from '../../model/monster';
import { Milestone } from '../../model/milestone';
import { Location } from '../../model/location';

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
    this.createDefaultSettlement().then(settlement =>
      this.kdmService.addSettlement(settlement),
    );
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
            this.kdmService.removeSettlement(settlement);
          },
        },
      ],
    });
    alert.present();
  }

  private createDefaultSettlement(): Promise<Settlement> {
    // TODO probably export settlement creation to wizard or something similar
    let settlement: Settlement = new Settlement('New Settlement');
    return Promise.all([
      this.createDefaultTimeline(settlement),
      this.createDefaultNemesisMonsters(settlement),
      this.createDefaultMilestoneStoryEvents(settlement),
      this.createDefaultQuarries(settlement),
      this.createDefaultSettlementLocations(settlement),
      this.createDefaultInnovations(settlement)]).then(() => settlement);
  }

  private createDefaultTimeline(settlement: Settlement): Promise<Timeline[]> {
    return this.kdmService.getDefaultTimeline().then(timelines => {
      timelines.forEach(timeline => {
        settlement.timeline.push(new SettlementTimeline(settlement, timeline));
      });
      return timelines;
    });
  }

  private createDefaultNemesisMonsters(settlement: Settlement): Promise<Monster[]> {
    return this.kdmService.getDefaultInitialHuntableNemesisMonsters().then(nemesisMonsters => {
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
      );
      return nemesisMonsters;
    }).catch(error => {
      console.log('Error in default nemesis');
      console.log(error);
      return [];
    });
  }

  private createDefaultMilestoneStoryEvents(settlement: Settlement): Promise<Milestone[]> {
    return this.kdmService.getInitialMilestones().then(
      milestones => {
        milestones.forEach(
          milestone => settlement.milestones.push(new SettlementMilestone(settlement, milestone)));
        return milestones;
      });
  }

  private createDefaultQuarries(settlement: Settlement): Promise<Monster[]> {
    return this.kdmService.getDefaultInitialHuntableQuarries().then(quarries => {
      quarries.forEach(quarry => {
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
      );
      return quarries;
    }).catch(error => {
      console.log('Error in default quarries');
      console.log(error);
      return [];
    });
  }

  private createDefaultSettlementLocations(settlement: Settlement): Promise<Location[]> {
    return this.kdmService.getSettlementLocations().then(locations => {
      settlement.locations = locations.filter(location => location.isStartLocation);
      return locations;
    });
  }

  private createDefaultInnovations(settlement: Settlement): Promise<Innovation[]> {
    return this.kdmService.getInnovations().then(innovations => {
      settlement.innovations = innovations.filter(innovation =>
        innovation.tags.indexOf(InnovationTag.STARTING_INNOVATION) > -1);
      return innovations;
    });
  }
}
