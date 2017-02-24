import { Storage } from './storage';
/**
 * Created by Daniel on 20.02.2017.
 */
export class Equipment extends Storage {

  affinities: Map<Affinity, Direction[]>;

}

export enum Affinity {
  green,
  blue,
  red
}

export enum Direction {
  up,
  down,
  left,
  right
}
