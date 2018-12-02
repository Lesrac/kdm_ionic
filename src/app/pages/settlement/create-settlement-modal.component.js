var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { InnovationTag } from '../../model/innovation';
import { Settlement } from '../../model/settlement';
import { SettlementTimeline } from '../../model/linking/settlement_timeline';
import { HuntableMonster } from '../../model/linking/huntable_monster';
import { SettlementMilestone } from '../../model/linking/settlement_milestone';
import { KDMDataService } from '../../service/kdm-data.service';
import { ViewController } from 'ionic-angular';
let CreateSettlementModalComponent = class CreateSettlementModalComponent {
    constructor(viewCtrl, kdmService) {
        this.viewCtrl = viewCtrl;
        this.kdmService = kdmService;
    }
    close() {
        this.viewCtrl.dismiss().then();
    }
    addClose() {
        this.createDefaultSettlement().then(settlement => this.kdmService.addSettlement(settlement));
        this.close();
    }
    createDefaultSettlement() {
        let settlement;
        if (this.settlementName) {
            settlement = new Settlement(this.settlementName);
            settlement.survivalLimit = 1;
        }
        else {
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
            this.createDefaultInnovations(settlement)
        ])
            .then(() => {
            this.setObservers(settlement);
            return settlement;
        });
    }
    createDefaultTimeline(settlement) {
        return this.kdmService.getDefaultTimeline().then(timelines => {
            timelines.forEach(timeline => {
                settlement.addTimelineItem(new SettlementTimeline(settlement, timeline));
            });
            return timelines;
        });
    }
    createDefaultNemesisMonsters(settlement) {
        return this.kdmService.getDefaultInitialHuntableNemesisMonsters().then(nemesisMonsters => {
            nemesisMonsters.forEach(nemesisMonster => {
                const existingMonster = settlement.huntableMonsters.find(huntableMonster => huntableMonster.monster.name === nemesisMonster.name);
                if (!existingMonster) {
                    const settlementMonster = new HuntableMonster(settlement, nemesisMonster);
                    if (nemesisMonster.name === 'Butcher') {
                        settlementMonster.isHuntable = true;
                    }
                    settlement.addHuntableMonster(settlementMonster);
                }
            });
            return nemesisMonsters;
        }).catch(error => {
            console.log('Error in default nemesis');
            console.log(error);
            return [];
        });
    }
    createDefaultMilestoneStoryEvents(settlement) {
        return this.kdmService.getInitialMilestones().then(milestones => {
            milestones.forEach(milestone => settlement.addMilestone(new SettlementMilestone(settlement, milestone)));
            return milestones;
        });
    }
    createDefaultQuarries(settlement) {
        return this.kdmService.getDefaultInitialHuntableQuarries().then(quarries => {
            quarries.forEach(quarry => {
                const existingMonster = settlement.huntableMonsters.find(huntableMonster => huntableMonster.monster.name === quarry.name);
                if (!existingMonster) {
                    const settlementMonster = new HuntableMonster(settlement, quarry);
                    if (quarry.name === 'White Lion') {
                        settlementMonster.isHuntable = true;
                    }
                    settlement.addHuntableMonster(settlementMonster);
                }
            });
            return quarries;
        }).catch(error => {
            console.log('Error in default quarries');
            console.log(error);
            return [];
        });
    }
    createDefaultSettlementLocations(settlement) {
        return this.kdmService.getSettlementLocations().then(locations => {
            locations.filter(location => location.isStartLocation).forEach(location => settlement.addLocation(location));
            return locations;
        });
    }
    createDefaultInnovations(settlement) {
        return this.kdmService.getInnovations().then(innovations => {
            innovations.filter(innovation => innovation.tags.indexOf(InnovationTag.STARTING_INNOVATION) > -1).forEach(innovation => settlement.addInnovation(innovation));
            return innovations;
        });
    }
    setObservers(settlement) {
        settlement.nameChange.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.survivalLimitChange.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.populationChange.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.deathcountChange.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.settlementLostChange.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.timelineSizeChanged.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.huntableMonstersSizeChanged.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.huntedMonstersSizeChanged.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.locationsSizeChanged.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.storagesSizeChanged.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.innovationsSizeChanged.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.survivorsSizeChanged.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.milestonesSizeChanged.subscribe(this.kdmService.saveSettlementObserver(settlement));
        settlement.principlesSizeChanged.subscribe(this.kdmService.saveSettlementObserver(settlement));
    }
};
CreateSettlementModalComponent = __decorate([
    Component({
        selector: 'kdmf-modal-create-settlement',
        templateUrl: 'create-settlement-modal.component.html',
    }),
    __metadata("design:paramtypes", [ViewController, KDMDataService])
], CreateSettlementModalComponent);
export { CreateSettlementModalComponent };
//# sourceMappingURL=create-settlement$-modal.component.js.map