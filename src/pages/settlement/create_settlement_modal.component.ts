import { Component } from '@angular/core';
import { Monster } from '../../model/monster';
import { Innovation, InnovationTag } from '../../model/innovation';
import { Milestone } from '../../model/milestone';
import { Settlement } from '../../model/settlement';
import { SettlementTimeline } from '../../model/linking/settlement_timeline';
import { Timeline } from '../../model/timeline';
import { HuntableMonster } from '../../model/linking/huntable_monster';
import { Location } from '../../model/location';
import { SettlementMilestone } from '../../model/linking/settlement_milestone';
import { KDMDataService } from '../../service/kdm_data.service';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'kdmf-modal-create-settlement',
  templateUrl: 'create_settlement_modal.component.html',
})
export class CreateSettlementModalComponent {
  population: number;
  settlementName: string;

  constructor(public viewCtrl: ViewController, private kdmService: KDMDataService) {
  }

  close(): void {
    this.viewCtrl.dismiss().then();
  }

  addClose(): void {
    this.createDefaultSettlement().then(settlement =>
      this.kdmService.addSettlement(settlement),
    );
    this.close();
  }

  private createDefaultSettlement(): Promise<Settlement> {
    let settlement: Settlement;
    if (this.settlementName) {
      settlement = new Settlement(this.settlementName);
      settlement.survivalLimit = 1;
    } else {
      settlement = new Settlement('New Settlement');
    }
    if (this.population) {
      settlement.population = this.population;
    }
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
