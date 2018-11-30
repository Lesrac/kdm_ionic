import { EquipmentJSON } from './equipment-json';
export class WeaponJSON extends EquipmentJSON {
    constructor(name, description, amount, tags, affinities, speed, accuracy, strength) {
        super(name, description, amount, tags, affinities);
        this.speed = speed;
        this.accuracy = accuracy;
        this.strength = strength;
    }
}
//# sourceMappingURL=weapon-json.js.map