"use strict";
/**
 * Created by Daniel on 10.02.2017.
 */
var Equals = (function () {
    function Equals() {
    }
    Equals.prototype.visit = function (milestone, compareValue) {
        return compareValue === milestone.value;
    };
    return Equals;
}());
exports.Equals = Equals;
