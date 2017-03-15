"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
 * Created by Daniel on 18.02.2017.
 */
var KDMCalculationService = (function () {
    function KDMCalculationService(kdmData) {
        this.kdmData = kdmData;
        this.factorials = [];
    }
    KDMCalculationService.prototype.addResourcesFromKilledMonster = function (settlement, killedMonster, originalMonster) {
        var _this = this;
        originalMonster.resources.forEach(function (monsterResource) {
            if (monsterResource.monsterLevel === killedMonster.level) {
                if (monsterResource.storage) {
                    killedMonster.huntedResources = _this.getAllStorageItems(monsterResource.storage, monsterResource.amount);
                    killedMonster.huntedResources.forEach(function (str) {
                        settlement.addStorageItem(str);
                    });
                }
                else if (monsterResource.resourceType != null && monsterResource.resourceType >= 0) {
                    _this.getAllResourceCardsFromType(monsterResource.resourceType).then(function (storages) {
                        killedMonster.huntedResources = _this.getRandomizedResourceCards(storages, monsterResource.amount);
                        killedMonster.huntedResources.forEach(function (storage) {
                            settlement.addStorageItem(storage);
                        });
                    });
                }
            }
        });
    };
    /**
     *
     * @param storageItem
     * @param amount
     * @returns {Storage[]}
     */
    KDMCalculationService.prototype.getAllStorageItems = function (storageItem, amount) {
        var storages = [];
        for (var i = 0; i < amount; i++) {
            storages.push(storageItem);
        }
        return storages;
    };
    /**
     * Get all existing cards from a specific resource type
     * @param resourceType
     * @returns {Storage[]}
     */
    KDMCalculationService.prototype.getAllResourceCardsFromType = function (resourceType) {
        var storages = [];
        var resources = [];
        this.kdmData.getResources().then(function (res) {
            res.forEach(function (resource) {
                if (resource.type === resourceType) {
                    resources.push(resource);
                }
            });
            resources.forEach(function (resource) {
                for (var i = 0; i < resource.existingCards; i++) {
                    storages.push(resource);
                }
            });
        });
        return Promise.resolve(storages);
    };
    /**
     * Randomize add of resource cards depending of the maximum cards to select.
     * Also depending of the maximum existing cards inside the game.
     * @param allStorageItems Array of Storage Items to select from
     * @param maxAmount Maximum cards to select
     * @returns {Storage[]}
     */
    KDMCalculationService.prototype.getRandomizedResourceCards = function (allStorageItems, maxAmount) {
        var storages = [];
        if (!allStorageItems || allStorageItems.length < 1) {
            console.log('KDMCalculationService - getRandomizedResourceCards: allStorageItems is null or empty');
            return storages;
        }
        for (var i = 0; i < maxAmount; i++) {
            var start = Math.floor(Math.random() * allStorageItems.length);
            var rand = allStorageItems.slice(start, start + 1);
            storages.push(rand[0]);
        }
        return storages;
    };
    KDMCalculationService = __decorate([
        core_1.Injectable()
    ], KDMCalculationService);
    return KDMCalculationService;
}());
exports.KDMCalculationService = KDMCalculationService;
