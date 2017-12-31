import { Equipment } from './equipment';

/**
 * Created by Daniel on 20.02.2017.
 */
export class Armor extends Equipment {
  value: number;
  space: ArmorSpace;
}

export enum ArmorSpace {
  HEAD = 'HEAD',
  WAIST = 'WAIST',
  BODY = 'BODY',
  LEGS = 'LEGS',
  ARMS = 'ARMS',
}
