import { StorageJSON } from './storage-json';
export class EquipmentJSON extends StorageJSON {
    constructor(name, description, amount, tags, affinities) {
        super(name, description, amount, tags);
        this.affinities = affinities;
    }
}
export class AffinityJSON {
    constructor(affinity, directions) {
        this.affinity = affinity;
        this.directions = directions;
    }
}
//# sourceMappingURL=equipment-json.js.map