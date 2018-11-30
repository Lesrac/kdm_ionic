var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SimplifyObjects } from '../util/simplify-objects';
/**
 * Created by Daniel on 18.05.2017.
 */
let KDMDBService = class KDMDBService {
    constructor(storage) {
        this.storage = storage;
        this.settlements = 'settlements';
        this.settlement = 'settlement';
    }
    getSettlements() {
        const settlements = [];
        let storageForEach = this.storage.forEach((settlementSimplifiedJSON, key) => {
            if (key.startsWith(this.settlement)) {
                settlements.push(JSON.parse(settlementSimplifiedJSON));
            }
        });
        return Promise.all([settlements, storageForEach]);
    }
    getSettlementById(id) {
        return this.storage.get(this.settlement + id).then(settlementSimplified => new Promise(resolve => resolve(JSON.parse(settlementSimplified))));
    }
    saveSettlements(settlements) {
        settlements.forEach(settlement => this.saveSettlement(settlement));
    }
    saveSettlement(settlement) {
        const simplified = SimplifyObjects.simplifySettlement(settlement);
        this.storage.set(this.settlement + settlement.id, JSON.stringify(simplified));
    }
    removeSettlement(settlementId) {
        this.storage.remove(this.settlement + settlementId);
    }
};
KDMDBService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage])
], KDMDBService);
export { KDMDBService };
//# sourceMappingURL=kdm-db.service.js.map