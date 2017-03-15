"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var default_settlement_1 = require('../mockup/default_settlement');
/**
 * Created by Daniel on 28.01.2017.
 */
var KDMDataService = (function () {
    function KDMDataService() {
    }
    KDMDataService.prototype.getSettlements = function () {
        return Promise.resolve(default_settlement_1.SETTLEMENTS);
    };
    KDMDataService.prototype.getSettlement = function (name) {
        return Promise.resolve(default_settlement_1.SETTLEMENTS.find(function (settlement) { return settlement.name === name; }));
    };
    KDMDataService.prototype.addSettlement = function (settlement) {
        default_settlement_1.SETTLEMENTS.push(settlement);
    };
    KDMDataService.prototype.getNemesisMonsters = function () {
        return Promise.resolve(default_settlement_1.NEMESISMONSTERS);
    };
    KDMDataService.prototype.getQuarries = function () {
        default_settlement_1.QUARRIES.forEach(function (monster) {
            default_settlement_1.MONSTERRESOURCES.forEach(function (resource) {
                if (resource.monster === monster) {
                    monster.resources.push(resource);
                }
            });
        });
        return Promise.resolve(default_settlement_1.QUARRIES);
    };
    KDMDataService.prototype.getResources = function () {
        return Promise.resolve(default_settlement_1.RESSOURCES);
    };
    KDMDataService.prototype.getEvents = function () {
        return Promise.resolve(default_settlement_1.EVENTS);
    };
    KDMDataService.prototype.getMilestones = function () {
        return Promise.resolve(default_settlement_1.MILESTONES);
    };
    KDMDataService.prototype.getDefaultTimeline = function () {
        return Promise.resolve(default_settlement_1.DEFAULTTIMELINE);
    };
    KDMDataService.prototype.getSettlementLocations = function () {
        return Promise.resolve(default_settlement_1.SETTLEMENTLOCATIONS);
    };
    KDMDataService.prototype.getInnovations = function () {
        return Promise.resolve(default_settlement_1.INNOVATIONS);
    };
    KDMDataService.prototype.getDisorders = function () {
        return Promise.resolve(default_settlement_1.DISORDERS);
    };
    KDMDataService.prototype.getFightingArts = function () {
        return Promise.resolve(default_settlement_1.FIGHTINGARTS);
    };
    KDMDataService.prototype.sortByName = function (l, r) {
        if (l.name < r.name) {
            return -1;
        }
        if (l.name > r.name) {
            return 1;
        }
        return 0;
    };
    KDMDataService = __decorate([
        core_1.Injectable()
    ], KDMDataService);
    return KDMDataService;
}());
exports.KDMDataService = KDMDataService;
