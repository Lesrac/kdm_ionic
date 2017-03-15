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
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon() {
        _super.apply(this, arguments);
    }
    return Weapon;
}(equipment_1.Equipment));
exports.Weapon = Weapon;
