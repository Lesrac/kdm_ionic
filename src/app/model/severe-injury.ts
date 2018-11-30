import { ArmorSpace } from './armor';
import { DiceThrow } from './dice-throw';

export class SevereInjury extends DiceThrow {

  hitLocation: ArmorSpace;

  constructor(name: string, description: string, minRoll: number, maxRoll: number, hitLocation: ArmorSpace) {
    super(name, description, minRoll, maxRoll);
    this.hitLocation = hitLocation;
  }
}
