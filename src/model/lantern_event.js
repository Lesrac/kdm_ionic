"use strict";
/**
 * Created by Daniel on 27.01.2017.
 */
var LanternEvent = (function () {
    function LanternEvent(name) {
        if (name === void 0) { name = ''; }
        this.storyEvents = [];
        this.name = name;
    }
    return LanternEvent;
}());
exports.LanternEvent = LanternEvent;
