import { Storage, StorageTag } from './storage';

/**
 * Created by Daniel on 20.02.2017.
 */
export class Equipment extends Storage {

  affinities: Map<Affinity, Direction[]>;

  constructor(name: string, description: string, amount: number, tags: StorageTag[],
              affinities: Map<Affinity, Direction[]>) {
    super(name, description, amount, tags);
    this.affinities = affinities;
  }
}

export enum Affinity {
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  RED = 'RED',
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
