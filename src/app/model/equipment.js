import { Storage } from './storage';
/**
 * Created by Daniel on 20.02.2017.
 */
export class Equipment extends Storage {
    constructor(name, description, amount, tags, affinities) {
        super(name, description, amount, tags);
        this.affinities = affinities;
    }
}
export var Affinity;
(function (Affinity) {
    Affinity["GREEN"] = "GREEN";
    Affinity["BLUE"] = "BLUE";
    Affinity["RED"] = "RED";
    Affinity["ARROW"] = "ARROW";
})(Affinity || (Affinity = {}));
export var Direction;
(function (Direction) {
    Direction["UP"] = "UP";
    Direction["DOWN"] = "DOWN";
    Direction["LEFT"] = "LEFT";
    Direction["RIGHT"] = "RIGHT";
})(Direction || (Direction = {}));
//# sourceMappingURL=equipment.js.map