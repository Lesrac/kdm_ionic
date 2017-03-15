"use strict";
/**
 * Created by Daniel on 28.01.2017.
 */
var Monster = (function () {
    function Monster(name, isHuntable, isNemesis) {
        if (isHuntable === void 0) { isHuntable = false; }
        if (isNemesis === void 0) { isNemesis = false; }
        this.level = 1;
        this.defeatedLevelOne = false;
        this.defeatedLevelTwo = false;
        this.defeatedLevelThree = false;
        this.resources = [];
        this.huntedResources = [];
        this.locations = [];
        this.name = name;
        this.isHuntable = isHuntable;
        this.isNemesis = isNemesis;
    }
    return Monster;
}());
exports.Monster = Monster;
