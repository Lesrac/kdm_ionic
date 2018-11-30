import { EquipmentJSON } from './equipment-json';
export class ArmorJSON extends EquipmentJSON {
    constructor(name, description, amount, tags, affinities, value, space) {
        super(name, description, amount, tags, affinities);
        this.value = value;
        this.space = space;
    }
}
//# sourceMappingURL=armor-json.js.map