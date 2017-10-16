import { BaseModel } from './base_model';

export class DiceThrow extends BaseModel {
  minRoll: number;
  maxRoll: number;
}
