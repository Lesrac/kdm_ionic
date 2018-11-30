import { AffinityJSON, EquipmentJSON } from './equipment-json';

export class ArmorJSON extends EquipmentJSON {
  value: number;
  space: string;

  constructor(name: string, description: string, amount: number, tags: string[], affinities: AffinityJSON[],
              value: number, space: string) {
    super(name, description, amount, tags, affinities);
    this.value = value;
    this.space = space;
  }
}
