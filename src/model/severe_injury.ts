import { BaseModel } from './base_model';
import { ArmorSpace } from './armor';

export class SevereInjury extends BaseModel {

  hitLocation: ArmorSpace;
  minRoll: number;
  maxRoll: number;

}
