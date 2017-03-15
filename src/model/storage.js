"use strict";
/**
 * Created by Daniel on 08.02.2017.
 */
var Storage = (function () {
    function Storage() {
    }
    return Storage;
}());
exports.Storage = Storage;
(function (StorageTag) {
    StorageTag[StorageTag["bone"] = 0] = "bone";
    StorageTag[StorageTag["organ"] = 1] = "organ";
    StorageTag[StorageTag["consumable"] = 2] = "consumable";
    StorageTag[StorageTag["hide"] = 3] = "hide";
    StorageTag[StorageTag["scrap"] = 4] = "scrap";
    StorageTag[StorageTag["weapon"] = 5] = "weapon";
    StorageTag[StorageTag["melee"] = 6] = "melee";
    StorageTag[StorageTag["sword"] = 7] = "sword";
    StorageTag[StorageTag["axe"] = 8] = "axe";
    StorageTag[StorageTag["armor"] = 9] = "armor";
    StorageTag[StorageTag["fragile"] = 10] = "fragile";
    StorageTag[StorageTag["dagger"] = 11] = "dagger";
    StorageTag[StorageTag["tool"] = 12] = "tool";
    StorageTag[StorageTag["item"] = 13] = "item";
    StorageTag[StorageTag["ranged"] = 14] = "ranged";
    StorageTag[StorageTag["thrown"] = 15] = "thrown";
})(exports.StorageTag || (exports.StorageTag = {}));
var StorageTag = exports.StorageTag;
