var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { TimelineEventModalComponent } from '../pages/timeline/timeline-event-modal.component';
import { ModalController } from 'ionic-angular';
import { KDMDataService } from './kdm-data.service';
/**
 * Created by Daniel on 01.05.2017.
 */
let KDMObserverService = class KDMObserverService {
    constructor(modalCtrl, kdmDataService) {
        this.modalCtrl = modalCtrl;
        this.kdmDataService = kdmDataService;
        this.boldEvent = 'Bold';
        this.seeTheTruthEvent = 'See the Truth';
        this.insightEvent = 'Insight';
        this.whiteSecretEvent = 'White Secret';
        this.ageEvent = 'Age';
        this.retiredEvent = 'Retirement';
        this.courage1 = 'courage1';
        this.courage2 = 'courage2';
        this.understanding1 = 'understanding1';
        this.understanding2 = 'understanding2';
        this.huntxp1 = 'huntxp1';
        this.huntxp2 = 'huntxp2';
    }
    registerObserverForMilestone(settlementPageComponent, milestone) {
        milestone.observer = this.getObserver(milestone);
        this.setMilestoneTarget(milestone, milestone.milestone.observerTarget, settlementPageComponent);
    }
    registerObserverForSurvivorHappenings(survivorPageComponent) {
        this.kdmDataService.getStoryEvents();
        this.kdmDataService.getLanternEvents();
        const survivor = survivorPageComponent.survivor;
        Promise.all([this.kdmDataService.getLanternEvent(this.boldEvent)
                .then(lanternEvent => survivor.courageObserver1 = this.getSurvivorObserver(this.courage1, lanternEvent)),
            this.kdmDataService.getLanternEvent(this.seeTheTruthEvent)
                .then(lanternEvent => survivor.courageObserver2 = this.getSurvivorObserver(this.courage2, lanternEvent)),
            this.kdmDataService.getLanternEvent(this.insightEvent)
                .then(lanternEvent => survivor.understandingObserver1 = this.getSurvivorObserver(this.understanding1, lanternEvent)),
            this.kdmDataService.getLanternEvent(this.whiteSecretEvent)
                .then(lanternEvent => survivor.understandingObserver2 = this.getSurvivorObserver(this.understanding2, lanternEvent)),
            this.kdmDataService.getLanternEvent(this.ageEvent)
                .then(lanternEvent => survivor.huntXPObserver1 = this.getSurvivorObserver(this.huntxp1, lanternEvent)),
            this.kdmDataService.getLanternEvent(this.retiredEvent)
                .then(lanternEvent => survivor.huntXPObserver2 = this.getSurvivorObserver(this.huntxp2, lanternEvent))]).then(() => {
            this.setSurvivorTarget(survivorPageComponent, survivor);
        });
    }
    getObserver(milestone) {
        return {
            next: (x) => {
                if (this.checkMilestone(milestone, x)) {
                    milestone.reached = !milestone.reached;
                    this.modalCtrl.create(TimelineEventModalComponent, {
                        lanternEvent: milestone.milestone,
                    }).present();
                }
                milestone.oldValue = x;
            },
            error: err => console.error('Observer got an error: ' + err),
            complete: () => console.log('Observer got a complete notification'),
        };
    }
    getSurvivorObserver(what, lanternEvent) {
        return {
            next: x => {
                switch (what) {
                    case this.courage1:
                        console.log('courage1');
                        if (x === 3) {
                            this.modalCtrl.create(TimelineEventModalComponent, {
                                lanternEvent: lanternEvent,
                            }).present();
                        }
                        break;
                    case this.courage2:
                    case this.understanding2:
                        if (x === 9) {
                            this.modalCtrl.create(TimelineEventModalComponent, {
                                lanternEvent: lanternEvent,
                            }).present();
                        }
                        break;
                    case this.understanding1:
                        if (x === 3) {
                            this.modalCtrl.create(TimelineEventModalComponent, {
                                lanternEvent: lanternEvent,
                            }).present();
                        }
                        break;
                    case this.huntxp1:
                        if (x === 2 || x === 6 || x === 10 || x === 15) {
                            this.modalCtrl.create(TimelineEventModalComponent, {
                                lanternEvent: lanternEvent,
                            }).present();
                        }
                        break;
                    case this.huntxp2:
                        if (x === 16) {
                            this.modalCtrl.create(TimelineEventModalComponent, {
                                lanternEvent: lanternEvent,
                            }).present();
                        }
                        break;
                    default:
                        console.log('no survivor observer for value found: ' + what);
                }
            },
            error: err => console.error('Observer got an error: ' + err),
            complete: () => console.log('Observer got a complete notification'),
        };
    }
    checkMilestone(milestone, value) {
        return (!milestone.reached && milestone.milestone.accept(value, milestone.oldValue));
    }
    setMilestoneTarget(settlementMilestone, milestoneTarget, settlementPageComponent) {
        switch (milestoneTarget.toUpperCase()) {
            case 'DEATHCOUNT':
                settlementPageComponent.deathcount.subscribe(settlementMilestone.observer);
                settlementMilestone.oldValue = settlementPageComponent.settlement.deathcount;
                break;
            case 'POPULATION':
                settlementPageComponent.population.subscribe(settlementMilestone.observer);
                settlementMilestone.oldValue = settlementPageComponent.settlement.population;
                break;
            case 'INNOVATION':
                settlementPageComponent.innovations.subscribe(settlementMilestone.observer);
                settlementMilestone.oldValue = settlementPageComponent.settlement.innovations.length;
                break;
            default:
                console.log('milestoneTarget doesn\'t exist: ' + milestoneTarget);
        }
    }
    setSurvivorTarget(survivorPageComponent, survivor) {
        survivorPageComponent.courage.subscribe(survivor.courageObserver1);
        survivorPageComponent.courage.subscribe(survivor.courageObserver2);
        survivorPageComponent.xp.subscribe(survivor.huntXPObserver1);
        survivorPageComponent.xp.subscribe(survivor.huntXPObserver2);
        survivorPageComponent.understanding.subscribe(survivor.understandingObserver1);
        survivorPageComponent.understanding.subscribe(survivor.understandingObserver2);
    }
};
KDMObserverService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ModalController, KDMDataService])
], KDMObserverService);
export { KDMObserverService };
//# sourceMappingURL=kdm-observer.service.js.map