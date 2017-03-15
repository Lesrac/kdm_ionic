"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var equipment_1 = require('./equipment');
/**
 * Created by Daniel on 20.02.2017.
 */
var Armor = (function (_super) {
    __extends(Armor, _super);
    function Armor() {
        _super.apply(this, arguments);
    }
    return Armor;
}(equipment_1.Equipment));
exports.Armor = Armor;
(function (ArmorSpace) {
    ArmorSpace[ArmorSpace["head"] = 0] = "head";
    ArmorSpace[ArmorSpace["waist"] = 1] = "waist";
    ArmorSpace[ArmorSpace["body"] = 2] = "body";
    ArmorSpace[ArmorSpace["legs"] = 3] = "legs";
    ArmorSpace[ArmorSpace["arms"] = 4] = "arms";
})(exports.ArmorSpace || (exports.ArmorSpace = {}));
var ArmorSpace = exports.ArmorSpace;
