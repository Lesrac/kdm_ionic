import { BaseModel } from './base-model';

export class DiceThrow extends BaseModel {
  minRoll: number;
  maxRoll: number;

  constructor(name: string, description: string, minRoll: number, maxRoll: number) {
    super(name, description);
    this.minRoll = minRoll;
    this.maxRoll = maxRoll;
  }
}
