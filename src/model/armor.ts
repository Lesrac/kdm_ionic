import { Affinity, Direction, Equipment } from './equipment';
import { StorageTag } from './storage';

/**
 * Created by Daniel on 20.02.2017.
 */
export class Armor extends Equipment {
  value: number;
  space: ArmorSpace;

  constructor(name: string, description: string, amount: number, tags: StorageTag[],
              affinities: Map<Affinity, Direction[]>, value: number, space: ArmorSpace) {
    super(name, description, amount, tags, affinities);
    this.value = value;
    this.space = space;
  }
}

export enum ArmorSpace {
  HEAD = 'HEAD',
  WAIST = 'WAIST',
  BODY = 'BODY',
  LEGS = 'LEGS',
  ARMS = 'ARMS',
}
