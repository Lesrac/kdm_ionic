"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var timeline_event_modal_component_1 = require('../timeline/timeline_event_modal.component');
var forms_1 = require('@angular/forms');
var timeline_component_1 = require('../timeline/timeline.component');
var defeated_monster_component_1 = require('../defeated_monster/defeated_monster.component');
var location_component_1 = require('../location/location.component');
var storage_component_1 = require('../storage/storage.component');
var innovation_component_1 = require('../innovation/innovation.component');
var survivor_1 = require('../../model/survivor');
/**
 * Created by Daniel on 27.01.2017.
 */
var SettlementPageComponent = (function () {
    function SettlementPageComponent(navCtrl, modalCtrl, params, kdmChecker, formBuilder) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.params = params;
        this.kdmChecker = kdmChecker;
        this.formBuilder = formBuilder;
        if (params.get('settlement')) {
            this.settlement = params.get('settlement');
        }
    }
    SettlementPageComponent.prototype.ngOnInit = function () {
        this.setupDeathcounts();
        this.setupLostSettlements();
    };
    SettlementPageComponent.prototype.updateDeathcount = function (event, control) {
        if (control.value) {
            this.settlement.deathcount++;
            this.settlement.population--;
            this.checkMilestone(event, 'death', this.settlement.deathcount);
        }
        else {
            this.settlement.deathcount--;
            this.settlement.population++;
        }
    };
    SettlementPageComponent.prototype.updateLostSettlement = function (event, control) {
        if (control.value) {
            this.settlement.settlementLost++;
        }
        else {
            this.settlement.settlementLost--;
        }
    };
    SettlementPageComponent.prototype.showTimeline = function () {
        this.navCtrl.push(timeline_component_1.TimelinePageComponent, {
            timeline: this.settlement.timeline,
        }).then();
    };
    SettlementPageComponent.prototype.showDefeatedMonsters = function () {
        this.navCtrl.push(defeated_monster_component_1.DefeatedMonsterPageComponent, {
            settlement: this.settlement,
        }).then();
    };
    SettlementPageComponent.prototype.showInnovations = function () {
        this.navCtrl.push(innovation_component_1.InnovationPageComponent, {
            settlement: this.settlement,
        }).then();
    };
    SettlementPageComponent.prototype.showSettlementLocations = function () {
        this.navCtrl.push(location_component_1.LocationPageComponent, {
            settlement: this.settlement,
        }).then();
    };
    SettlementPageComponent.prototype.showStorage = function () {
        this.navCtrl.push(storage_component_1.StoragePageComponent, {
            settlement: this.settlement,
        }).then();
    };
    SettlementPageComponent.prototype.eventReached = function (event, lanternEvent) {
        if (lanternEvent.reached) {
            var popover = this.modalCtrl.create(timeline_event_modal_component_1.TimelineEventModalComponent, {
                lanternEvent: lanternEvent,
            });
            popover.present({
                ev: event,
            });
        }
    };
    SettlementPageComponent.prototype.checkMilestone = function (event, identifier, value) {
        var _this = this;
        if (value != null) {
            this.settlement.milestones.forEach(function (milestone) {
                if (_this.kdmChecker.checkMilestone(milestone, identifier, value)) {
                    milestone.reached = true;
                    var popover = _this.modalCtrl.create(timeline_event_modal_component_1.TimelineEventModalComponent, {
                        lanternEvent: milestone,
                    });
                    popover.present({
                        ev: event,
                    });
                }
            });
        }
    };
    SettlementPageComponent.prototype.increaseSurvivalLimit = function () {
        this.settlement.survivalLimit++;
    };
    SettlementPageComponent.prototype.decreaseSurvivalLimit = function () {
        this.settlement.survivalLimit--;
    };
    SettlementPageComponent.prototype.increasePopulation = function () {
        var stlmt = this.settlement;
        stlmt.population++;
        if (stlmt.survivors.length < stlmt.population) {
            this.addSurvivor();
        }
        this.populationChecker();
    };
    SettlementPageComponent.prototype.addSurvivor = function () {
        this.settlement.survivors.push(new survivor_1.Survivor('Survivor ' + survivor_1.Survivor.counter));
    };
    SettlementPageComponent.prototype.decreasePopulation = function () {
        this.settlement.population--;
        this.populationChecker();
    };
    SettlementPageComponent.prototype.populationChecker = function () {
        var population = this.settlement.population;
        this.checkMilestone(null, 'population', population);
        var survivors = this.settlement.survivors.length;
        if (survivors <= population) {
            var difference = population - survivors;
            for (var i = 0; i < difference; i++) {
                this.addSurvivor();
            }
        }
    };
    SettlementPageComponent.prototype.setupDeathcounts = function () {
        var checkboxArray = new forms_1.FormArray([]);
        for (var i = 0; i < SettlementPageComponent.MAX_DEATHS; i++) {
            if (i < this.settlement.deathcount) {
                checkboxArray.push(new forms_1.FormControl(true));
            }
            else {
                checkboxArray.push(new forms_1.FormControl(false));
            }
        }
        this.deathCountGroup = this.formBuilder.group({ deathCounts: checkboxArray });
    };
    SettlementPageComponent.prototype.setupLostSettlements = function () {
        var checkboxArray = new forms_1.FormArray([]);
        for (var i = 0; i < SettlementPageComponent.MAX_LOST_SETTLEMENTS; i++) {
            if (i < this.settlement.settlementLost) {
                checkboxArray.push(new forms_1.FormControl(true));
            }
            else {
                checkboxArray.push(new forms_1.FormControl(false));
            }
        }
        this.lostSettlementGroup = this.formBuilder.group({ settlementCounts: checkboxArray });
    };
    SettlementPageComponent.MAX_DEATHS = 36;
    SettlementPageComponent.MAX_LOST_SETTLEMENTS = 19;
    __decorate([
        core_1.Input()
    ], SettlementPageComponent.prototype, "settlement", void 0);
    SettlementPageComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-page-settlement',
            templateUrl: 'settlement.html',
        })
    ], SettlementPageComponent);
    return SettlementPageComponent;
}());
exports.SettlementPageComponent = SettlementPageComponent;
