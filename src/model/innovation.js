"use strict";
/**
 * Created by Daniel on 19.02.2017.
 */
var Innovation = (function () {
    function Innovation() {
    }
    return Innovation;
}());
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
