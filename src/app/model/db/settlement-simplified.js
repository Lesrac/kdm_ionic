/**
 * Created by Daniel on 18.10.2017.
 */
export class SettlementSimplified {
    constructor(id, name, survivalLimit, population, deathcount, settlementLost) {
        this.survivalLimit = 0;
        this.population = 0;
        this.deathcount = 0;
        this.settlementLost = 0;
        this.timeline = [];
        this.huntableMonsters = [];
        this.huntedMonsters = [];
        this.locationNames = [];
        this.storagesNameAmount = [];
        this.innovationNames = [];
        this.survivors = [];
        this.milestones = [];
        this.principleNames = [];
        this.id = id;
        this.name = name;
        this.survivalLimit = survivalLimit;
        this.population = population;
        this.deathcount = deathcount;
        this.settlementLost = settlementLost;
    }
}
//# sourceMappingURL=settlement$-simplified.js.map