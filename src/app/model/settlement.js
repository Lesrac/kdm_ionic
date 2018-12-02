import { Subject } from 'rxjs';
/**
 * Created by Daniel on 27.01.2017.
 */
export class Settlement {
    constructor(name) {
        this.nameChange = new Subject();
        this.survivalLimitChange = new Subject();
        this.populationChange = new Subject();
        this.deathcountChange = new Subject();
        this.settlementLostChange = new Subject();
        this.timelineSizeChanged = new Subject();
        this.huntableMonstersSizeChanged = new Subject();
        this.huntedMonstersSizeChanged = new Subject();
        this.locationsSizeChanged = new Subject();
        this.storagesSizeChanged = new Subject();
        this.innovationsSizeChanged = new Subject();
        this.survivorsSizeChanged = new Subject();
        this.milestonesSizeChanged = new Subject();
        this.principlesSizeChanged = new Subject();
        this._survivalLimit = 0;
        this._population = 0;
        this._deathcount = 0;
        this._settlementLost = 0;
        this._timeline = [];
        this._huntableMonsters = [];
        this._huntedMonsters = [];
        this._locations = [];
        this._storages = [];
        this._innovations = [];
        this._milestones = [];
        this._survivors = [];
        this._principles = [];
        this._name = name;
    }
    addStorageItem(storage) {
        if (!storage) {
            console.log('Settlement - addStorageItem: Storage is null');
            return;
        }
        const str = this._storages.find(storageL => storageL.name === storage.name);
        if (str) {
            str.amount++;
        }
        else {
            storage.amount = 1;
            this._storages.push(storage);
            this.storagesSizeChanged.next(this._storages.length);
        }
    }
    addTimelineItem(timeline) {
        if (!timeline) {
            console.log('Settlement - addTimelineItem: Timeline is null');
            return;
        }
        this._timeline.push(timeline);
        this.timelineSizeChanged.next(this._timeline.length);
    }
    addHuntableMonster(huntableMonster) {
        if (!huntableMonster) {
            console.log('Settlement - addHuntableMonster: HuntableMonster is null');
            return;
        }
        this._huntableMonsters.push(huntableMonster);
        this.huntableMonstersSizeChanged.next(this._huntableMonsters.length);
    }
    addHuntedMonster(huntedMonster) {
        if (!huntedMonster) {
            console.log('Settlement - addHuntedMonster: HuntedMonster is null');
            return;
        }
        this._huntedMonsters.push(huntedMonster);
        this.huntableMonstersSizeChanged.next(this._huntedMonsters.length);
    }
    addInnovation(innovation) {
        if (!innovation) {
            console.log('Settlement - addInnovation: Innovation is null');
            return;
        }
        this._innovations.push(innovation);
        this.innovationsSizeChanged.next(this._innovations.length);
    }
    addSurvivor(survivor) {
        if (!survivor) {
            console.log('Settlement - addSurvivor: Survivor is null');
            return;
        }
        this._survivors.push(survivor);
        this.survivorsSizeChanged.next(this._survivors.length);
    }
    addLocation(location) {
        if (!location) {
            console.log('Settlement - addLocation: Location is null');
            return;
        }
        this._locations.push(location);
        this.locationsSizeChanged.next(this._locations.length);
    }
    addMilestone(milestone) {
        if (!milestone) {
            console.log('Settlement - addMilestone: SettlementMilestone is null');
            return;
        }
        this._milestones.push(milestone);
        this.milestonesSizeChanged.next(this._milestones.length);
    }
    addPrinciple(principle) {
        if (!principle) {
            console.log('Settlement - addPrinciple: Principle is null');
            return;
        }
        this._principles.push(principle);
        this.principlesSizeChanged.next(this._principles.length);
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        this.nameChange.next(value);
    }
    get survivalLimit() {
        return this._survivalLimit;
    }
    set survivalLimit(value) {
        this._survivalLimit = value;
        this.survivalLimitChange.next(value);
    }
    get deathcount() {
        return this._deathcount;
    }
    set deathcount(value) {
        this._deathcount = value;
        this.deathcountChange.next(value);
    }
    get settlementLost() {
        return this._settlementLost;
    }
    set settlementLost(value) {
        this._settlementLost = value;
        this.settlementLostChange.next(value);
    }
    get population() {
        return this._population;
    }
    set population(value) {
        this._population = value;
        this.populationChange.next(value);
    }
    get timeline() {
        return this._timeline;
    }
    get huntableMonsters() {
        return this._huntableMonsters;
    }
    get huntedMonsters() {
        return this._huntedMonsters;
    }
    get locations() {
        return this._locations;
    }
    get storages() {
        return this._storages;
    }
    get innovations() {
        return this._innovations;
    }
    get survivors() {
        return this._survivors;
    }
    get milestones() {
        return this._milestones;
    }
    get principles() {
        return this._principles;
    }
}
//# sourceMappingURL=settlement$.js.map