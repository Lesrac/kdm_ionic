import { Equipment } from './equipment';
/**
 * Created by Daniel on 20.02.2017.
 */
export class Weapon extends Equipment {
    constructor(name, description, amount, tags, affinities, speed, accuracy, strength) {
        super(name, description, amount, tags, affinities);
        this.speed = speed;
        this.accuracy = accuracy;
        this.strength = strength;
    }
}
//# sourceMappingURL=weapon.js.map