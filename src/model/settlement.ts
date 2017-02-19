import {Timeline} from "./timeline";
import {Monster} from "./monster";
import {Milestone} from "./milestone";
import {Location} from "./location";
import {Storage} from "./storage";
import {Innovation} from "./innovation";
/**
 * Created by Daniel on 27.01.2017.
 */
export class Settlement {
  name: string;
  survivalLimit: number = 0;
  population: number = 1;
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

  constructor(name: string) {
    this.name = name;
  }

  public addStorageItem(storage: Storage): void {
    if (!storage) {
      console.log('Settlement - addStorageItem: Storage is null');
      return;
    }
    const str = this.storages.find(str => str.name === storage.name);
    if (str) {
      str.amount++;
    }
    else {
      storage.amount = 1;
      this.storages.push(storage);
    }
  }
}
