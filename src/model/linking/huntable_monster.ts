import { Monster } from '../monster';
import { Settlement } from '../settlement';

/**
 * Created by Daniel on 26.05.2017.
 */
export class HuntableMonster {
  settlement: number;
  monster: number;
  isHuntable: boolean = false;
  defeatedLevelOne: boolean = false;
  defeatedLevelTwo: boolean = false;
  defeatedLevelThree: boolean = false;

  constructor(settlement: Settlement, monster: Monster) {
    this.settlement = settlement.id;
    this.monster = monster.id;
  }
}
