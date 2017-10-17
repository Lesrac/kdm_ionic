import { Injectable } from '@angular/core';
import { SettlementMilestone } from '../model/linking/settlement_milestone';
import { Observer } from 'rxjs/Observer';
import { TimelineEventModalComponent } from '../pages/timeline/timeline_event_modal.component';
import { ModalController } from 'ionic-angular';
import { SettlementPageComponent } from '../pages/settlement/settlement.component';
import { KDMDataService } from './kdm_data.service';

/**
 * Created by Daniel on 01.05.2017.
 */
@Injectable()
export class KDMObserverService {

  constructor(public modalCtrl: ModalController, private kdmData: KDMDataService) {
  }

  registerObserverForMilestone(settlementPageComponent: SettlementPageComponent, milestone: SettlementMilestone) {
    milestone.observer = this.getObserver(milestone);
    this.kdmData.getMilestone(milestone.milestone).then(ms =>
      this.setMilestoneTarget(milestone, ms.observerTarget, settlementPageComponent),
    );
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

  private checkMilestone(milestone: SettlementMilestone, value: any): Promise<boolean> {
    return this.kdmData.getMilestone(milestone.milestone).then(ms => {
        return (!milestone.reached && ms.accept(value));
      },
    );
    //  return (!milestone.reached && milestone.milestone.accept(value));
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
