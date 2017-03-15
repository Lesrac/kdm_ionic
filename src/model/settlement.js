"use strict";
/**
 * Created by Daniel on 27.01.2017.
 */
var Settlement = (function () {
    function Settlement(name) {
        this.survivalLimit = 0;
        this.population = 0;
        this.deathcount = 0;
        this.settlementLost = 0;
        this.timeline = [];
        this.milestones = [];
        this.nemesisMonsters = [];
        this.quarries = [];
        this.defeatedMonsters = [];
        this.locations = [];
        this.storages = [];
        this.innovations = [];
        this.survivors = [];
        this.name = name;
        this.id = Settlement.counter++;
    }
    Settlement.prototype.addStorageItem = function (storage) {
        if (!storage) {
            console.log('Settlement - addStorageItem: Storage is null');
            return;
        }
        var str = this.storages.find(function (storageL) { return storageL.name === storage.name; });
        if (str) {
            str.amount++;
        }
        else {
            storage.amount = 1;
            this.storages.push(storage);
        }
    };
    Settlement.counter = 0;
    return Settlement;
}());
exports.Settlement = Settlement;
