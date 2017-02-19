import {Injectable} from "@angular/core";
import {Monster} from "../model/monster";
import {Storage} from "../model/storage";
import {ResourceType} from "../model/resource_type";
import {KDMDataService} from "./kdm_data.service";
import {Resource} from "../model/resource";
import {Settlement} from "../model/settlement";
/**
 * Created by Daniel on 18.02.2017.
 */
@Injectable()
export class KDMCalculationService {
  factorials: number[] = [];

  constructor(private kdmData: KDMDataService) {
  }

  addResourcesFromKilledMonster(settlement: Settlement, killedMonster: Monster, originalMonster: Monster): void {
    originalMonster.resources.forEach(monsterResource => {
      if (monsterResource.monsterLevel == killedMonster.level) {
        if (monsterResource.storage) {
          killedMonster.huntedResources = this.getAllStorageItems(monsterResource.storage, monsterResource.amount);
          killedMonster.huntedResources.forEach(str => {
            settlement.addStorageItem(str);
          });
        } else if (monsterResource.resourceType != null && monsterResource.resourceType >= 0) {
          this.getAllResourceCardsFromType(monsterResource.resourceType).then(storages => {
            killedMonster.huntedResources = this.getRandomizedResourceCards(storages, monsterResource.amount);
            killedMonster.huntedResources.forEach(storage => {
              settlement.addStorageItem(storage);
            })
          });
        }
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
    const storages: Storage[] = [];
    const resources: Resource[] = [];
    this.kdmData.getResources().then(res => {
        res.forEach(resource => {
          if (resource.type === resourceType) {
            resources.push(resource);
          }
        });
        resources.forEach(resource => {
          for (let i = 0; i < resource.existingCards; i++) {
            storages.push(resource);
          }
        });
      }
    );

    return Promise.resolve(storages);
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
      console.log('KDMCalculationService - getRandomizedResourceCards: allStoragesItems is null or empty');
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
