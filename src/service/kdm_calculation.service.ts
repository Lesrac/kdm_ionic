import { Injectable } from '@angular/core';
import { Monster } from '../model/monster';
import { Storage } from '../model/storage';
import { KDMDataService } from './kdm_data.service';
import { Resource, ResourceType } from '../model/resource';
import { HuntedMonster } from '../model/linking/hunted_monster';

/**
 * Created by Daniel on 18.02.2017.
 */
@Injectable()
export class KDMCalculationService {

  constructor(private kdmData: KDMDataService) {
  }

  addResourcesFromKilledMonster(huntedMonster: HuntedMonster, originalMonster: Monster, monsterLevel: number): void {
    console.log(originalMonster);
    originalMonster.resources.get(monsterLevel).forEach((amount: number, key: any) => {
      const resourceType: ResourceType = <ResourceType>ResourceType[<string>key];
      if (resourceType) {
        this.getAllResourceCardsFromType(resourceType).then(storages => {
          const huntedResources = this.getRandomizedResourceCards(storages, amount);
          huntedResources.forEach(storage => {
            const storageCopy1 = Object.assign({}, storage);
            const storageCopy2 = Object.assign({}, storage);
            this.kdmData.getSettlement(huntedMonster.settlement).then(settlement =>
              settlement.addStorageItem(storageCopy1));
            huntedMonster.addStorageItem(storageCopy2);
          });
        });
      } else if (key) {
        const huntedResources = this.getAllStorageItems(key, amount);
        huntedResources.forEach(str => {
          const storageCopy1 = Object.assign({}, str);
          const storageCopy2 = Object.assign({}, str);
          this.kdmData.getSettlement(huntedMonster.settlement).then(settlement =>
            settlement.addStorageItem(storageCopy1));
          huntedMonster.addStorageItem(storageCopy2);
        });
      }
    });
  }

  /**
   *
   * @param storageItem
   * @param amount
   * @returns {Storage[]}
   */
  private getAllStorageItems(storageItem: Storage, amount: number): Storage[] {
    const storages: Storage[] = [];
    for (let i: number = 0; i < amount; i++) {
      storages.push(storageItem);
    }
    return storages;
  }

  /**
   * Get all existing cards from a specific resource type
   * @param resourceType
   * @returns {Storage[]}
   */
  private getAllResourceCardsFromType(resourceType: ResourceType): Promise<Storage[]> {
    return this.kdmData.getResources().then(res => {
        const storages: Storage[] = [];
        const resources: Resource[] = [];
        res.forEach(resource => {
          if (<ResourceType>ResourceType[resource.type.toString()] === resourceType) {
            resources.push(resource);
          }
        });
        resources.forEach(resource => {
          for (let i = 0; i < resource.existingCards; i++) {
            storages.push(resource);
          }
        });
        return storages;
      },
    );
  }

  /**
   * Randomize add of resource cards depending of the maximum cards to select.
   * Also depending of the maximum existing cards inside the game.
   * @param allStorageItems Array of Storage Items to select from
   * @param maxAmount Maximum cards to select
   * @returns {Storage[]}
   */
  private getRandomizedResourceCards(allStorageItems: Storage[], maxAmount: number): Storage[] {
    const storages: Storage[] = [];
    if (!allStorageItems || allStorageItems.length < 1) {
      console.log('KDMCalculationService - getRandomizedResourceCards: allStorageItems is null or empty');
      return storages;
    }
    for (let i: number = 0; i < maxAmount; i++) {
      const start: number = Math.floor(Math.random() * allStorageItems.length);
      const rand: Storage[] = allStorageItems.slice(start, start + 1);
      storages.push(rand[0]);
    }
    return storages;
  }

}
