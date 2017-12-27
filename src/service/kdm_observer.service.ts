import { Injectable } from '@angular/core';
import { SettlementMilestone } from '../model/linking/settlement_milestone';
import { Observer } from 'rxjs/Observer';
import { TimelineEventModalComponent } from '../pages/timeline/timeline_event_modal.component';
import { ModalController } from 'ionic-angular';
import { SettlementPageComponent } from '../pages/settlement/settlement.component';

/**
 * Created by Daniel on 01.05.2017.
 */
@Injectable()
export class KDMObserverService {

  constructor(public modalCtrl: ModalController) {
  }

  registerObserverForMilestone(settlementPageComponent: SettlementPageComponent, milestone: SettlementMilestone): void {
    milestone.observer = this.getObserver(milestone);
    this.setMilestoneTarget(milestone, milestone.milestone.observerTarget, settlementPageComponent);
  }

  private getObserver(milestone: SettlementMilestone): Observer<Object> {
    return {
      next: x => {
        if (this.checkMilestone(milestone, x)) {
          milestone.reached = !milestone.reached;
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
                             settlementPageComponent: SettlementPageComponent) {
    switch (milestoneTarget.toUpperCase()) {
      case 'DEATHCOUNT':
        settlementMilestone.subscription = settlementPageComponent.deathcount.subscribe(settlementMilestone.observer);
        break;
      case 'POPULATION':
        settlementMilestone.subscription = settlementPageComponent.population.subscribe(settlementMilestone.observer);
        break;
      case 'INNOVATION':
        settlementMilestone.subscription = settlementPageComponent.innovations.subscribe(settlementMilestone.observer);
        break;
      default:
        console.log('milestoneTarget doesn\'t exist: ' + milestoneTarget);
    }
  }
}
