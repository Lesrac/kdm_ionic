"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lantern_event_1 = require('./lantern_event');
/**
 * Created by Daniel on 07.02.2017.
 */
var Milestone = (function (_super) {
    __extends(Milestone, _super);
    function Milestone() {
        _super.apply(this, arguments);
    }
    Milestone.prototype.accept = function (compareValue) {
        return this.visitor.visit(this, compareValue);
    };
    return Milestone;
}(lantern_event_1.LanternEvent));
exports.Milestone = Milestone;
