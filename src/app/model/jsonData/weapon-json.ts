import { AffinityJSON, EquipmentJSON } from './equipment-json';

export class WeaponJSON extends EquipmentJSON {
  speed: number;
  accuracy: number;
  strength: number;

  constructor(name: string, description: string, amount: number, tags: string[], affinities: AffinityJSON[],
              speed: number, accuracy: number, strength: number) {
    super(name, description, amount, tags, affinities);
    this.speed = speed;
    this.accuracy = accuracy;
    this.strength = strength;
  }
}
