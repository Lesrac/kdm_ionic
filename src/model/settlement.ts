import { Location } from './location';
import { Storage } from './storage';
import { Innovation } from './innovation';
import { Survivor } from './survivor';
import { SettlementTimeline } from './linking/settlement_timeline';
import { SettlementMilestone } from './linking/settlement_milestone';
import { Principle } from './principle';
import { HuntableMonster } from './linking/huntable_monster';
import { HuntedMonster } from './linking/hunted_monster';
/**
 * Created by Daniel on 27.01.2017.
 */
export class Settlement {
  id: number;
  name: string;
  survivalLimit: number = 0;
  population: number = 0;
  deathcount: number = 0;
  settlementLost: number = 0;
  timeline: SettlementTimeline[] = [];
  huntableMonsters: HuntableMonster[] = [];
  huntedMonsters: HuntedMonster[] = [];
  locations: Location[] = [];
  storages: Storage[] = [];
  innovations: Innovation[] = [];
  survivors: Survivor[] = [];
  milestones: SettlementMilestone[] = [];
  principles: Principle[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addStorageItem(storage: Storage): void {
    if (!storage) {
      console.log('Settlement - addStorageItem: Storage is null');
      return;
    }
    const str = this.storages.find(storageL => storageL.name === storage.name);
    if (str) {
      str.amount++;
    } else {
      storage.amount = 1;
      this.storages.push(storage);
    }
  }

}
