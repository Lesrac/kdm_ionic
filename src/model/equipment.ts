import { Storage } from './storage';

/**
 * Created by Daniel on 20.02.2017.
 */
export class Equipment extends Storage {

  affinities: Map<Affinity, Direction[]>;

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
