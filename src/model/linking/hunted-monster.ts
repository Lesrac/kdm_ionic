import { Settlement } from '../settlement';
import { Monster } from '../monster';
import { Storage } from '../storage';

/**
 * Created by Daniel on 26.05.2017.
 */
export class HuntedMonster {
  settlement: Settlement;
  monster: Monster;
  huntedResources: Storage[] = [];
  monsterLevel: number;

  constructor(settlement: Settlement, monster: Monster) {
    this.settlement = settlement;
    this.monster = monster;
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
