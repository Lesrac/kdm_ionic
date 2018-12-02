var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, KeyValueDiffers } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { TimelineEventModalComponent } from '../timeline/timeline-event-modal.component';
import { TimelinePageComponent } from '../timeline/timeline.component';
import { DefeatedMonsterPageComponent } from '../defeated_monster/defeated-monster.component';
import { StoragePageComponent } from '../storage/storage.component';
import { ShowListComponent } from '../template/show-list.component';
import { ShowListTypes } from '../../model/show-list-types';
import { PrinciplesPageComponent } from '../principle/principles.component';
import { Subject } from 'rxjs';
import { KDMObserverService } from '../../service/kdm-observer.service';
import { KDMDataService } from '../../service/kdm-data.service';
/**
 * Created by Daniel on 27.01.2017.
 */
let SettlementPageComponent = class SettlementPageComponent {
    constructor(navCtrl, modalCtrl, params, differs, kdmObserver, kdmService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.params = params;
        this.differs = differs;
        this.kdmObserver = kdmObserver;
        this.kdmService = kdmService;
        this.population = new Subject();
        this.deathcount = new Subject();
        this.innovations = new Subject();
        if (params.get('settlement')) {
            this.settlement$ = params.get('settlement');
            this.differ = differs.find({}).create();
            this.settlement$.milestones.forEach(milestone => kdmObserver.registerObserverForMilestone(this, milestone));
        }
    }
    ngDoCheck() {
        let changes = this.differ.diff(this.settlement$.innovations);
        if (changes) {
            this.innovations.next(changes._records.size);
        }
    }
    showTimeline() {
        this.navCtrl.push(TimelinePageComponent, {
            settlementTimeline: this.settlement$.timeline,
        }).then();
    }
    showDefeatedMonsters() {
        this.navCtrl.push(DefeatedMonsterPageComponent, {
            settlement: this.settlement$,
        }).then();
    }
    showInnovations() {
        this.navCtrl.push(ShowListComponent, {
            objects: this.settlement$.innovations,
            type: ShowListTypes.INNOVATION,
            settlement: this.settlement$,
        }).then();
    }
    showPrinciples() {
        this.navCtrl.push(PrinciplesPageComponent, {
            settlement: this.settlement$,
        }).then();
    }
    showSettlementLocations() {
        this.navCtrl.push(ShowListComponent, {
            objects: this.settlement$.locations,
            type: ShowListTypes.LOCATION,
            settlement: this.settlement$,
        }).then();
    }
    showStorage() {
        this.navCtrl.push(StoragePageComponent, {
            settlement: this.settlement$,
        }).then();
    }
    eventReached(event, settlementLanternEvent) {
        if (settlementLanternEvent.reached) {
            let popover = this.modalCtrl.create(TimelineEventModalComponent, {
                lanternEvent: settlementLanternEvent.lanternEvent,
            });
            popover.present({
                ev: event,
            });
        }
    }
    survivalLimitChange(event) {
        if (typeof event === 'number') {
            this.settlement$.survivalLimit = event;
        }
    }
    settlementLostChange(event) {
        if (typeof event === 'number') {
            this.settlement$.settlementLost = event;
        }
    }
    deathcountChange(event) {
        if (typeof event === 'number') {
            this.deathcount.next(event);
            this.settlement$.deathcount = event;
        }
    }
    populationChange(event) {
        if (typeof event === 'number') {
            const settlement = this.settlement$;
            this.population.next(event);
            this.settlement$.population = event;
            if (settlement.survivors.length < this.settlement$.population) {
                this.addSurvivor();
            }
            this.populationChecker();
        }
    }
    addSurvivor() {
        this.kdmService.createAndAddSurvivor(this.settlement$);
    }
    populationChecker() {
        const survivors = this.settlement$.survivors.length;
        const population = this.settlement$.population;
        if (survivors <= population) {
            const difference = population - survivors;
            for (let i = 0; i < difference; i++) {
                this.addSurvivor();
            }
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Settlement)
], SettlementPageComponent.prototype, "settlement", void 0);
SettlementPageComponent = __decorate([
    Component({
        selector: 'kdmf-page-settlement',
        templateUrl: 'settlement.component.html',
    }),
    __metadata("design:paramtypes", [NavController, ModalController, NavParams,
        KeyValueDiffers, KDMObserverService,
        KDMDataService])
], SettlementPageComponent);
export { SettlementPageComponent };
//# sourceMappingURL=settlement$.component.js.map