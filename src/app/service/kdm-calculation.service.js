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
import { KDMDataService } from './kdm-data.service';
import { ResourceType } from '../model/resource';
/**
 * Created by Daniel on 18.02.2017.
 */
let KDMCalculationService = class KDMCalculationService {
    constructor(kdmData) {
        this.kdmData = kdmData;
    }
    // TODO change how this whole thing works
    addResourcesFromKilledMonster(huntedMonster) {
        if (huntedMonster.monster.resources.length > 0 && huntedMonster.monsterLevel > 0) {
            huntedMonster.monster.resources.filter(monsterResource => monsterResource.level === huntedMonster.monsterLevel)
                .forEach((monsterLevelResources) => {
                monsterLevelResources.resources.forEach((monsterResourceAmount) => {
                    const resourceType = ResourceType[monsterResourceAmount.name];
                    if (resourceType) {
                        this.getAllResourceCardsFromType(resourceType).then(storages => {
                            const huntedResources = this.getRandomizedResourceCards(storages, monsterResourceAmount.amount);
                            huntedResources.forEach(storage => {
                                const storageCopy1 = Object.assign({}, storage);
                                const storageCopy2 = Object.assign({}, storage);
                                huntedMonster.settlement.addStorageItem(storageCopy1);
                                huntedMonster.addStorageItem(storageCopy2);
                            });
                        });
                    }
                    else if (monsterResourceAmount.name) {
                        this.kdmData.getStorageItem(monsterResourceAmount.name).then(storageItem => {
                            const huntedResources = this.getAllStorageItems(storageItem, monsterResourceAmount.amount);
                            huntedResources.forEach(str => {
                                const storageCopy1 = Object.assign({}, str);
                                const storageCopy2 = Object.assign({}, str);
                                huntedMonster.settlement.addStorageItem(storageCopy1);
                                huntedMonster.addStorageItem(storageCopy2);
                            });
                        });
                    }
                });
            });
        }
        else {
            console.log('there are no resources or the monsterLevel was not set', huntedMonster.monster.resources, huntedMonster.monsterLevel);
        }
    }
    /**
     *
     * @param storageItem
     * @param amount
     * @returns {Storage[]}
     */
    getAllStorageItems(storageItem, amount) {
        const storages = [];
        for (let i = 0; i < amount; i++) {
            storages.push(storageItem);
        }
        return storages;
    }
    /**
     * Get all existing cards from a specific resource type
     * @param resourceType
     * @returns {Storage[]}
     */
    getAllResourceCardsFromType(resourceType) {
        return this.kdmData.getResources().then(res => {
            const storages = [];
            const resources = [];
            res.forEach(resource => {
                if (resource.type !== undefined && ResourceType[resource.type.toString()] === resourceType) {
                    resources.push(resource);
                }
            });
            resources.forEach(resource => {
                for (let i = 0; i < resource.existingCards; i++) {
                    storages.push(resource);
                }
            });
            return storages;
        });
    }
    /**
     * Randomize add of resource cards depending of the maximum cards to select.
     * Also depending of the maximum existing cards inside the game.
     * @param allStorageItems Array of Storage Items to select from
     * @param maxAmount Maximum cards to select
     * @returns {Storage[]}
     */
    getRandomizedResourceCards(allStorageItems, maxAmount) {
        const storages = [];
        if (!allStorageItems || allStorageItems.length < 1) {
            console.log('KDMCalculationService - getRandomizedResourceCards: allStorageItems is null or empty');
            return storages;
        }
        for (let i = 0; i < maxAmount; i++) {
            const start = Math.floor(Math.random() * allStorageItems.length);
            const rand = allStorageItems.slice(start, start + 1);
            storages.push(rand[0]);
        }
        return storages;
    }
};
KDMCalculationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [KDMDataService])
], KDMCalculationService);
export { KDMCalculationService };
//# sourceMappingURL=kdm-calculation.service.js.map