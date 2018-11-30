import { BaseModel } from './base-model';
import { Subject } from 'rxjs';
export var StorageTag;
(function (StorageTag) {
    StorageTag["AMMUNITION"] = "AMMUNITION";
    StorageTag["ARMOR"] = "ARMOR";
    StorageTag["ARROW"] = "ARROW";
    StorageTag["AXE"] = "AXE";
    StorageTag["BALM"] = "BALM";
    StorageTag["BONE"] = "BONE";
    StorageTag["BOW"] = "BOW";
    StorageTag["CLUB"] = "CLUB";
    StorageTag["CONSUMABLE"] = "CONSUMABLE";
    StorageTag["DAGGER"] = "DAGGER";
    StorageTag["FEATHER"] = "FEATHER";
    StorageTag["FINESSE"] = "FINESSE";
    StorageTag["FLAMMABLE"] = "FLAMMABLE";
    StorageTag["FRAGILE"] = "FRAGILE";
    StorageTag["FUR"] = "FUR";
    StorageTag["GRAND_WEAPON"] = "GRAND WEAPON";
    StorageTag["HEAVY"] = "HEAVY";
    StorageTag["HERB"] = "HERB";
    StorageTag["HIDE"] = "HIDE";
    StorageTag["INSTRUMENT"] = "INSTRUMENT";
    StorageTag["IRON"] = "IRON";
    StorageTag["ITEM"] = "ITEM";
    StorageTag["JEWELRY"] = "JEWELRY";
    StorageTag["KATANA"] = "KATANA";
    StorageTag["KATAR"] = "KATAR";
    StorageTag["LANTERN"] = "LANTERN";
    StorageTag["LEATHER"] = "LEATHER";
    StorageTag["MASK"] = "MASK";
    StorageTag["MELEE"] = "MELEE";
    StorageTag["METAL"] = "METAL";
    StorageTag["NOISY"] = "NOISY";
    StorageTag["ORGAN"] = "ORGAN";
    StorageTag["OTHER"] = "OTHER";
    StorageTag["PICKAXE"] = "PICKAXE";
    StorageTag["RANGED"] = "RANGED";
    StorageTag["RAWHIDE"] = "RAWHIDE";
    StorageTag["SCRAP"] = "SCRAP";
    StorageTag["SET"] = "SET";
    StorageTag["SHIELD"] = "SHIELD";
    StorageTag["SICKLE"] = "SICKLE";
    StorageTag["SKULL"] = "SKULL";
    StorageTag["SOLUBLE"] = "SOLUBLE";
    StorageTag["SPEAR"] = "SPEAR";
    StorageTag["STINKY"] = "STINKY";
    StorageTag["STONE"] = "STONE";
    StorageTag["SWORD"] = "SWORD";
    StorageTag["THROWN"] = "THROWN";
    StorageTag["TOOL"] = "TOOL";
    StorageTag["TWO_HANDED"] = "TWO-HANDED";
    StorageTag["WEAPON"] = "WEAPON";
    StorageTag["WHIP"] = "WHIP";
})(StorageTag || (StorageTag = {}));
/**
 * Created by Daniel on 08.02.2017.
 */
export class Storage extends BaseModel {
    constructor(name, description, amount, tags) {
        super(name, description);
        this.amountChanged = new Subject();
        this._amount = amount;
        this.tags = tags;
    }
    get amount() {
        return +this._amount;
    }
    set amount(value) {
        this._amount = value;
        this.amountChanged.next(value);
    }
}
//# sourceMappingURL=storage.js.map