import { StorageJSON } from './storage_json';

export class EquipmentJSON extends StorageJSON {

  affinities: AffinityJSON[];

  constructor(name: string, description: string, amount: number, tags: string[], affinities: AffinityJSON[]) {
    super(name, description, amount, tags);
    this.affinities = affinities;
  }
}

export class AffinityJSON {
  affinity: string;
  directions: string[];

  constructor(affinity: string, directions: string[]) {
    this.affinity = affinity;
    this.directions = directions;
  }
}
