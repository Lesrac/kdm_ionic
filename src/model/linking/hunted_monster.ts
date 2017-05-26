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

  constructor(settlement: Settlement, monster: Monster) {
    this.settlement = settlement;
    this.monster = monster;
  }
}
