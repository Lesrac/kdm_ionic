"use strict";
/**
 * Created by Daniel on 10.02.2017.
 */
var GreaterThanEquals = (function () {
    function GreaterThanEquals() {
    }
    GreaterThanEquals.prototype.visit = function (milestone, compareValue) {
        return compareValue >= milestone.value;
    };
    return GreaterThanEquals;
}());
exports.GreaterThanEquals = GreaterThanEquals;
