"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_model_1 = require('./base_model');
/**
 * Created by Daniel on 19.02.2017.
 */
var Innovation = (function (_super) {
    __extends(Innovation, _super);
    function Innovation() {
        _super.apply(this, arguments);
    }
    return Innovation;
}(base_model_1.BaseModel));
exports.Innovation = Innovation;
(function (InnovationTag) {
    InnovationTag[InnovationTag["STARTING_INNOVATION"] = 0] = "STARTING_INNOVATION";
    InnovationTag[InnovationTag["ART"] = 1] = "ART";
    InnovationTag[InnovationTag["LANGUAGE_CONSEQUENCE"] = 2] = "LANGUAGE_CONSEQUENCE";
    InnovationTag[InnovationTag["SCIENCE"] = 3] = "SCIENCE";
    InnovationTag[InnovationTag["PAINT_CONSEQUENCE"] = 4] = "PAINT_CONSEQUENCE";
    InnovationTag[InnovationTag["AMMONIA_CONSEQUENCE"] = 5] = "AMMONIA_CONSEQUENCE";
})(exports.InnovationTag || (exports.InnovationTag = {}));
var InnovationTag = exports.InnovationTag;
