import { DiceThrow } from '../dice_throw';

export class SevereInjuryJSON extends DiceThrow {
  hitLocation: string;

  constructor(name: string, description: string, minRoll: number, maxRoll: number, hitLocation: string) {
    super(name, description, minRoll, maxRoll);
    this.hitLocation = hitLocation;
  }
}
