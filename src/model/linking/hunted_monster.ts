import { Settlement } from '../settlement';
import { Storage } from '../storage';

/**
 * Created by Daniel on 26.05.2017.
 */
export class HuntedMonster {
  settlement: number;
  monster: number;
  monsterLevel: number;
  huntedResources: Storage[] = [];

  constructor(settlement: Settlement, monster: number, monsterLevel: number) {
    this.settlement = settlement.id;
    this.monster = monster;
    this.monsterLevel = monsterLevel;
  }

  public addStorageItem(storage: Storage): void {
    if (!storage) {
      console.log('HuntedMonster - addStorageItem: Storage is null');
      return;
    }
    const str = this.huntedResources.find(storageL => storageL.name === storage.name);
    if (str) {
      str.amount++;
    } else {
      storage.amount = 1;
      this.huntedResources.push(storage);
    }
  }
}
