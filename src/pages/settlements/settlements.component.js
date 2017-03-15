"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var settlement_1 = require('../../model/settlement');
var settlement_component_1 = require('../settlement/settlement.component');
var create_settlement_popover_component_1 = require('../popover/create_settlement_popover.component');
var innovation_1 = require('../../model/innovation');
/**
 * Created by Daniel on 27.01.2017.
 */
var SettlementsPageComponent = (function () {
    function SettlementsPageComponent(navCtrl, popoverCtrl, kdmService) {
        this.navCtrl = navCtrl;
        this.popoverCtrl = popoverCtrl;
        this.kdmService = kdmService;
        this.settlements = [];
    }
    SettlementsPageComponent.prototype.presentPopover = function () {
        var _this = this;
        var settlement = new settlement_1.Settlement('');
        var popover = this.popoverCtrl.create(create_settlement_popover_component_1.CreateSettlementPopoverComponent, {
            se: settlement,
        });
        popover.present().then(function (x) { return _this.settlements.push(settlement); });
    };
    SettlementsPageComponent.prototype.addSettlement = function () {
        this.kdmService.addSettlement(this.createDefaultSettlement());
    };
    SettlementsPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.kdmService.getSettlements().then(function (settlements) { return _this.settlements = settlements; });
    };
    SettlementsPageComponent.prototype.goToDetail = function (settlement) {
        this.navCtrl.push(settlement_component_1.SettlementPageComponent, {
            settlement: settlement,
        }).then();
    };
    SettlementsPageComponent.prototype.removeSettlement = function (settlement) {
        this.settlements.splice(this.settlements.indexOf(settlement), 1);
    };
    SettlementsPageComponent.prototype.createDefaultSettlement = function () {
        var settlement = new settlement_1.Settlement('New Settlement');
        this.createDefaultTimeline(settlement);
        this.createDefaultNemesisMonsters(settlement);
        this.createDefaultMilestoneStoryEvents(settlement);
        this.createDefaultQuarries(settlement);
        this.createDefaultSettlementLocations(settlement);
        this.createDefaultInnovations(settlement);
        return settlement;
    };
    SettlementsPageComponent.prototype.createDefaultTimeline = function (settlement) {
        this.kdmService.getDefaultTimeline().then(function (timeline) {
            settlement.timeline = timeline;
        });
    };
    SettlementsPageComponent.prototype.createDefaultNemesisMonsters = function (settlement) {
        this.kdmService.getNemesisMonsters().then(function (nemesisMonsters) { return settlement.nemesisMonsters = nemesisMonsters; });
    };
    SettlementsPageComponent.prototype.createDefaultMilestoneStoryEvents = function (settlement) {
        this.kdmService.getMilestones().then(function (milestones) { return settlement.milestones = milestones; });
    };
    SettlementsPageComponent.prototype.createDefaultQuarries = function (settlement) {
        this.kdmService.getQuarries().then(function (quarries) { return settlement.quarries = quarries; });
    };
    SettlementsPageComponent.prototype.createDefaultSettlementLocations = function (settlement) {
        this.kdmService.getSettlementLocations().then(function (locations) { return settlement.locations = locations; });
    };
    SettlementsPageComponent.prototype.createDefaultInnovations = function (settlement) {
        this.kdmService.getInnovations().then(function (innovations) {
            return settlement.innovations = innovations.filter(function (innovation) {
                return innovation.tags.indexOf(innovation_1.InnovationTag.STARTING_INNOVATION) > -1;
            });
        });
    };
    SettlementsPageComponent = __decorate([
        core_1.Component({
            selector: 'kdmf-page-settlements',
            templateUrl: 'settlements.html',
        })
    ], SettlementsPageComponent);
    return SettlementsPageComponent;
}());
exports.SettlementsPageComponent = SettlementsPageComponent;
