"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('./storage');
/**
 * Created by Daniel on 20.02.2017.
 */
var Equipment = (function (_super) {
    __extends(Equipment, _super);
    function Equipment() {
        _super.apply(this, arguments);
    }
    return Equipment;
}(storage_1.Storage));
exports.Equipment = Equipment;
(function (Affinity) {
    Affinity[Affinity["green"] = 0] = "green";
    Affinity[Affinity["blue"] = 1] = "blue";
    Affinity[Affinity["red"] = 2] = "red";
})(exports.Affinity || (exports.Affinity = {}));
var Affinity = exports.Affinity;
(function (Direction) {
    Direction[Direction["up"] = 0] = "up";
    Direction[Direction["down"] = 1] = "down";
    Direction[Direction["left"] = 2] = "left";
    Direction[Direction["right"] = 3] = "right";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
