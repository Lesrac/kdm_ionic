import { Injectable } from '@angular/core';
import { SettlementMilestone } from '../model/linking/settlement-milestone';
import { Observer } from 'rxjs';
import { TimelineEventModalComponent } from '../pages/timeline/timeline-event-modal.component';
import { ModalController } from '@ionic/angular';
import { SettlementPageComponent } from '../pages/settlement/settlement.component';
import { SurvivorPageComponent } from '../pages/survivor/survivor.component';
import { LanternEvent } from '../model/lantern-event';
import { KDMDataService } from './kdm-data.service';
import { Survivor } from '../model/survivor';

/**
 * Created by Daniel on 01.05.2017.
 */
@Injectable()
export class KDMObserverService {

  private boldEvent: string = 'Bold';
  private seeTheTruthEvent: string = 'See the Truth';
  private insightEvent: string = 'Insight';
  private whiteSecretEvent: string = 'White Secret';
  private ageEvent: string = 'Age';
  private retiredEvent: string = 'Retirement';
  private courage1: string = 'courage1';
  private courage2: string = 'courage2';
  private understanding1: string = 'understanding1';
  private understanding2: string = 'understanding2';
  private huntxp1: string = 'huntxp1';
  private huntxp2: string = 'huntxp2';

  constructor(public modalCtrl: ModalController, private kdmDataService: KDMDataService) {
  }

  registerObserverForMilestone(settlementPageComponent: SettlementPageComponent, milestone: SettlementMilestone): void {
    milestone.observer = this.getObserver(milestone);
    this.setMilestoneTarget(milestone, milestone.milestone.observerTarget, settlementPageComponent);
  }

  registerObserverForSurvivorHappenings(survivorPageComponent: SurvivorPageComponent): void {
    this.kdmDataService.getStoryEvents();
    this.kdmDataService.getLanternEvents();
    const survivor = survivorPageComponent.survivor;

    const arr = [];
    arr.push(this.kdmDataService.getLanternEvent(this.boldEvent).then(lanternEvent => survivor.courageObserver1 = this.getSurvivorObserver(this.courage1, lanternEvent)));
    arr.push(this.kdmDataService.getLanternEvent(this.seeTheTruthEvent).then(lanternEvent => survivor.courageObserver2 = this.getSurvivorObserver(this.courage2, lanternEvent)));
    arr.push(this.kdmDataService.getLanternEvent(this.insightEvent).then(lanternEvent => survivor.understandingObserver1 = this.getSurvivorObserver(this.understanding1, lanternEvent)));
    arr.push(this.kdmDataService.getLanternEvent(this.whiteSecretEvent)
      .then(lanternEvent => survivor.understandingObserver2 = this.getSurvivorObserver(this.understanding2, lanternEvent)));
    arr.push(this.kdmDataService.getLanternEvent(this.ageEvent)
      .then(lanternEvent => survivor.huntXPObserver1 = this.getSurvivorObserver(this.huntxp1, lanternEvent)));
    arr.push(this.kdmDataService.getLanternEvent(this.retiredEvent)
      .then(lanternEvent => survivor.huntXPObserver2 = this.getSurvivorObserver(this.huntxp2, lanternEvent)));

    Promise.all(arr).then(() => {
      this.setSurvivorTarget(survivorPageComponent, survivor);
    });
  }

  private getObserver(milestone: SettlementMilestone): Observer<Object> {

    return {
      next: (x: string | number) => {
        if (this.checkMilestone(milestone, x)) {
          milestone.reached = !milestone.reached;
          this.modalCtrl.create({
            component: TimelineEventModalComponent, componentProps: {lanternEvent: milestone.milestone},
          }).then(modal => modal.present());
        }
        milestone.oldValue = x;
      }, error: err => console.error('Observer got an error: ' + err), complete: () => console.log('Observer got a complete notification'),
    };
  }

  private getSurvivorObserver(what: string, lanternEvent: LanternEvent): Observer<Object> {
    return {
      next: x => {
        switch (what) {
          case this.courage1:
            console.log('courage1');
            if (x === 3) {
              this.modalCtrl.create({
                component: TimelineEventModalComponent, componentProps: {lanternEvent: lanternEvent}
              }).then(modal => modal.present());
            }
            break;
          case this.courage2:
          case this.understanding2:
            if (x === 9) {
              this.modalCtrl.create({
                component: TimelineEventModalComponent, componentProps: {
                  lanternEvent: lanternEvent
                }
              }).then(modal => modal.present());
            }
            break;
          case this.understanding1:
            if (x === 3) {
              this.modalCtrl.create({
                component: TimelineEventModalComponent, componentProps: {
                  lanternEvent: lanternEvent
                }
              }).then(modal => modal.present());
            }
            break;
          case this.huntxp1:
            if (x === 2 || x === 6 || x === 10 || x === 15) {
              this.modalCtrl.create({
                component: TimelineEventModalComponent, componentProps: {
                  lanternEvent: lanternEvent
                }
              }).then(modal => modal.present());
            }
            break;
          case this.huntxp2:
            if (x === 16) {
              this.modalCtrl.create({
                component: TimelineEventModalComponent, componentProps: {lanternEvent: lanternEvent}
              }).then(modal => modal.present());
            }
            break;
          default:
            console.log('no survivor observer for value found: ' + what);
        }
      }, error: err => console.error('Observer got an error: ' + err), complete: () => console.log('Observer got a complete notification'),
    };
  }

  private checkMilestone(milestone: SettlementMilestone, value: string | number): boolean {
    return (!milestone.reached && milestone.milestone.accept(value, milestone.oldValue));
  }

  private setMilestoneTarget(settlementMilestone: SettlementMilestone, milestoneTarget: string, settlementPageComponent: SettlementPageComponent): void {
    switch (milestoneTarget.toUpperCase()) {
      case 'DEATHCOUNT':
        settlementPageComponent.deathcount.subscribe(settlementMilestone.observer);
        settlementMilestone.oldValue = settlementPageComponent.settlement$.deathcount;
        break;
      case 'POPULATION':
        settlementPageComponent.population.subscribe(settlementMilestone.observer);
        settlementMilestone.oldValue = settlementPageComponent.settlement$.population;
        break;
      case 'INNOVATION':
        settlementPageComponent.innovations.subscribe(settlementMilestone.observer);
        settlementMilestone.oldValue = settlementPageComponent.settlement$.innovations.length;
        break;
      default:
        console.log('milestoneTarget doesn\'t exist: ' + milestoneTarget);
    }
  }

  private setSurvivorTarget(survivorPageComponent: SurvivorPageComponent, survivor: Survivor): void {
    survivorPageComponent.courage.subscribe(survivor.courageObserver1);
    survivorPageComponent.courage.subscribe(survivor.courageObserver2);
    survivorPageComponent.xp.subscribe(survivor.huntXPObserver1);
    survivorPageComponent.xp.subscribe(survivor.huntXPObserver2);
    survivorPageComponent.understanding.subscribe(survivor.understandingObserver1);
    survivorPageComponent.understanding.subscribe(survivor.understandingObserver2);
  }
}
