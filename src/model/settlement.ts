import { Timeline } from './timeline';
import { Monster } from './monster';
import { Milestone } from './milestone';
import { Location } from './location';
import { Storage } from './storage';
import { Innovation } from './innovation';
import { Survivor } from './survivor';
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
  timeline: Timeline[] = [];
  milestones: Milestone[] = [];
  nemesisMonsters: Monster[] = [];
  quarries: Monster[] = [];
  defeatedMonsters: Monster[] = [];
  locations: Location[] = [];
  storages: Storage[] = [];
  innovations: Innovation[] = [];
  survivors: Survivor[] = [];

  constructor(name: string) {
    this.name = name;
    this.id = Settlement.counter++;
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
