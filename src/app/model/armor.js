import { Equipment } from './equipment';
/**
 * Created by Daniel on 20.02.2017.
 */
export class Armor extends Equipment {
    constructor(name, description, amount, tags, affinities, value, space) {
        super(name, description, amount, tags, affinities);
        this.value = value;
        this.space = space;
    }
}
export var ArmorSpace;
(function (ArmorSpace) {
    ArmorSpace["HEAD"] = "HEAD";
    ArmorSpace["WAIST"] = "WAIST";
    ArmorSpace["BODY"] = "BODY";
    ArmorSpace["LEGS"] = "LEGS";
    ArmorSpace["ARMS"] = "ARMS";
})(ArmorSpace || (ArmorSpace = {}));
//# sourceMappingURL=armor.js.map