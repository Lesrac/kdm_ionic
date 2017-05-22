import { Settlement } from '../settlement';
import { Monster } from '../monster';
import { Storage } from '../storage';
/**
 * Created by Daniel on 22.05.2017.
 */
export class SettlementMonster {
  settlement: Settlement;
  monster: Monster;
  defeatedLevelOne: boolean = false;
  defeatedLevelTwo: boolean = false;
  defeatedLevelThree: boolean = false;
  isHuntable: boolean = false;
  huntedResources: Storage[] = [];

  constructor(settlement: Settlement, monster: Monster) {
    this.settlement = settlement;
    this.monster = monster;
    switch (monster.level) {
      case 1 :
        this.defeatedLevelOne = true;
        break;
      case 2:
        this.defeatedLevelTwo = true;
        break;
      case 3:
        this.defeatedLevelThree = true;
        break;
      default:
    }
  }
}
