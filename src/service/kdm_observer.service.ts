import { Injectable } from '@angular/core';
import { Milestone } from '../model/milestone';
import { Settlement } from '../model/settlement';
import { SettlementMilestone } from '../model/linking/settlement_milestone';
import { Observer } from 'rxjs/Observer';
import { TimelineEventModalComponent } from '../pages/timeline/timeline_event_modal.component';
import { ModalController } from 'ionic-angular';
/**
 * Created by Daniel on 01.05.2017.
 */
@Injectable()
export class KDMObserverService {

  constructor(public modalCtrl: ModalController) {
  }

  registerMilestone(settlement: Settlement, milestone: Milestone) {
    let sMilestone: SettlementMilestone = new SettlementMilestone(settlement, milestone);
    sMilestone.observer = this.getObserver(sMilestone);
    this.setMilestoneTarget(sMilestone, milestone.observerTarget, settlement);
    settlement.milestones.push(sMilestone);
  }

  private getObserver(milestone: SettlementMilestone): Observer<Object> {
    return {
      next: x => {
        console.log('Observer got a next value: ' + x);
        if (this.checkMilestone(milestone, x)) {
          milestone.reached = !milestone.reached;
          console.log(this.modalCtrl);
          this.modalCtrl.create(TimelineEventModalComponent, {
            lanternEvent: milestone.milestone,
          }).present();
        }
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
  }

  private checkMilestone(milestone: SettlementMilestone, value: any): boolean {
    return (!milestone.reached && milestone.milestone.accept(value));
  }

  private setMilestoneTarget(settlementMilestone: SettlementMilestone, milestoneTarget: string,
                             settlement: Settlement) {
    switch (milestoneTarget.toUpperCase()) {
      case 'DEATHCOUNT':
        settlementMilestone.subscription = settlement.deathcount.subscribe(settlementMilestone.observer);
        break;
      case 'POPULATION':
        settlementMilestone.subscription = settlement.population.subscribe(settlementMilestone.observer);
      default:
    }
  }
}
