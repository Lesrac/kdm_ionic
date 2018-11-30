import { Affinity, Direction, Equipment } from './equipment';
import { StorageTag } from './storage';

/**
 * Created by Daniel on 20.02.2017.
 */
export class Weapon extends Equipment {
  speed: number;
  accuracy: number;
  strength: number;

  constructor(name: string, description: string, amount: number, tags: StorageTag[],
              affinities: Map<Affinity, Direction[]>, speed: number, accuracy: number, strength: number) {
    super(name, description, amount, tags, affinities);
    this.speed = speed;
    this.accuracy = accuracy;
    this.strength = strength;
  }
}
