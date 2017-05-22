import { Location } from './location';
import { Storage } from './storage';
import { Innovation } from './innovation';
import { Survivor } from './survivor';
import { SettlementTimeline } from './linking/settlement_timeline';
import { SettlementMilestone } from './linking/settlement_milestone';
import { Principle } from './principle';
import { SettlementMonster } from './linking/settlement_monster';
/**
 * Created by Daniel on 27.01.2017.
 */
export class Settlement {
  static counter: number = 0;
  id: number;
  name: string;
  survivalLimit: number = 0;
  population: number = 0;
  deathcount: number = 0;
  settlementLost: number = 0;
  timeline: SettlementTimeline[] = [];
  monsters: SettlementMonster[] = [];
  defeatedMonsters: SettlementMonster[] = [];
  locations: Location[] = [];
  storages: Storage[] = [];
  innovations: Innovation[] = [];
  survivors: Survivor[] = [];
  milestones: SettlementMilestone[] = [];
  principles: Principle[] = [];

  constructor(name: string, id?: number) {
    this.name = name;
    Settlement.counter++;
    if (id) {
      this.id = id;
    } else {
      this.id = Settlement.counter;
    }
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
