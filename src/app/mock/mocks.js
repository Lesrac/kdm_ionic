import { SettlementSimplified } from '../model/db/settlement-simplified';
import { Settlement } from '../model/settlement';
import { StoryEvent } from '../model/story-event';
import { Armor, ArmorSpace } from '../model/armor';
import { Principle, PrincipleType } from '../model/principle';
import { FightingArt } from '../model/fighting-art';
import { Monster } from '../model/monster';
import { Timeline } from '../model/timeline';
import { Storage, StorageTag } from '../model/storage';
import { Equipment } from '../model/equipment';
import { Resource, ResourceType } from '../model/resource';
import { BaseModel } from '../model/base-model';
import { Weapon } from '../model/weapon';
import { Location } from '../model/location';
import { SevereInjury } from '../model/severe-injury';
import { DiceThrow } from '../model/dice-throw';
import { Disorder } from '../model/disorder';
import { Innovation, InnovationTag } from '../model/innovation';
import { HuntEvent } from '../model/hunt-event';
import { Milestone, MilestoneType } from '../model/milestone';
import { Survivor } from '../model/survivor';
import { LanternEvent } from '../model/lantern-event';
import { ComparableVisitorValue } from '../model/visitor/comparable-visitor';
export class DummyMockElements {
}
DummyMockElements.storage = new Storage('Storage Dummy', 'dummy', 1, [StorageTag.ITEM]);
export class NavMock {
    pop() {
        return new Promise(function (resolve) {
            resolve();
        });
    }
    push() {
        return new Promise(function (resolve) {
            resolve();
        });
    }
    getActive() {
        return {
            'instance': {
                'model': 'something',
            },
        };
    }
    setRoot() {
        return true;
    }
    popToRoot() {
        return true;
    }
}
export class AppMock {
    getActiveNav() {
        return new NavMock();
    }
}
export class NavParamsMock {
    static setParams(value) {
        NavParamsMock.returnParam = value;
    }
    get(key) {
        if (NavParamsMock.returnParam) {
            return NavParamsMock.returnParam;
        }
        return 'default';
    }
}
NavParamsMock.returnParam = null;
export class NavParamsSettlementSurvivorMock {
    static setParams(settlement, survivor) {
        NavParamsSettlementSurvivorMock.settlement = settlement;
        NavParamsSettlementSurvivorMock.survivor = survivor;
    }
    get(key) {
        if (key === 'settlement') {
            return NavParamsSettlementSurvivorMock.settlement;
        }
        else if (key === 'survivor') {
            return NavParamsSettlementSurvivorMock.survivor;
        }
        else {
            return 'default';
        }
    }
}
NavParamsSettlementSurvivorMock.settlement = null;
NavParamsSettlementSurvivorMock.survivor = null;
export class ConfigMock {
    get() {
        return '';
    }
    getBoolean() {
        return true;
    }
    getNumber() {
        return 1;
    }
    setTransition() {
        return;
    }
}
export class DeepLinkerMock {
}
export class PlatformMock {
    ready() {
        return Promise.resolve({ String: 'READY' });
    }
    registerBackButtonAction(fn, priority) {
        return (() => true);
    }
    hasFocus(ele) {
        return true;
    }
    doc() {
        return document;
    }
    is() {
        return false;
    }
    getElementComputedStyle(container) {
        return {
            paddingLeft: '10',
            paddingTop: '10',
            paddingRight: '10',
            paddingBottom: '10',
        };
    }
    onResize(callback) {
        return callback;
    }
    registerListener(ele, eventName, callback) {
        return (() => true);
    }
    win() {
        return window;
    }
    raf(callback) {
        return 1;
    }
    timeout(callback, timer) {
        return setTimeout(callback, timer);
    }
    cancelTimeout(id) {
        // do nothing
    }
    getActiveElement() {
        return document['activeElement'];
    }
}
export class ModalControllerMock {
    constructor() {
    }
    create() {
    }
}
export class ModalMock {
    present() {
        return new Promise(function (resolve) {
            resolve();
        });
    }
    onDidDismiss(callback) {
    }
}
export class KDMDBServiceMock {
    constructor() {
        this.settlements = 'settlements';
    }
    getSettlements() {
        const settlements = [];
        let x;
        return Promise.all([settlements, x]);
    }
    getSettlementById(id) {
        return Promise.resolve(new SettlementSimplified(id, 'Dummy simplified settlementLocal$', 1, 1, 0, 0));
    }
    saveSettlements(settlements) {
        settlements.forEach(settlement => this.saveSettlement(settlement));
    }
    saveSettlement(settlement) {
    }
    removeSettlement(settlementId) {
    }
}
export class KDMDataServiceMock {
    constructor() {
        this.storageItems = [new Storage('Kosh', 'dummy', 1, [StorageTag.ITEM]),
            new Storage('Barbal', 'dummy', 1, [StorageTag.ITEM])];
    }
    getSettlements() {
        return Promise.resolve([new Settlement('dummy settlementLocal$')]);
    }
    addSettlement(settlement) {
    }
    removeSettlement(settlement) {
    }
    createAndAddSurvivor(settlement) {
        const survivor = new Survivor('Survivor', 1, settlement.id);
        settlement.survivors.push(survivor);
        return survivor;
    }
    getMonsters() {
        return Promise.resolve([new Monster(1, 'Dummy Monster', false)]);
    }
    getMonster(id) {
        return Promise.resolve(new Monster(1, 'Dummy Monster', false));
    }
    getDefaultInitialHuntableNemesisMonsters() {
        return Promise.resolve([new Monster(1, 'Dummy Monster', true)]);
    }
    getDefaultInitialHuntableQuarries() {
        return Promise.resolve([new Monster(1, 'Dummy Monster', false)]);
    }
    getResources() {
        return Promise.resolve([new Resource('Resource', 'dummy', 1, [StorageTag.ITEM], ResourceType.BASIC, 1)]);
    }
    getResourceByName(name) {
        return Promise.resolve(new Resource(name, 'dummy', 1, [StorageTag.ITEM], ResourceType.BASIC, 1));
    }
    getAllExistingStorageItems() {
        return Promise.resolve([this.storageItems]);
    }
    getStorageItem(name) {
        return Promise.resolve(new Storage(name, 'dummy', 1, [StorageTag.ITEM]));
    }
    getLanternEvents() {
        return Promise.resolve([new LanternEvent()]);
    }
    getLanternEvent(name) {
        return Promise.resolve(new LanternEvent(name));
    }
    getStoryEvents() {
        return Promise.resolve([new StoryEvent('Story Event', 'dummy', 1)]);
    }
    getStoryEvent(id) {
        return Promise.resolve(new StoryEvent('Story Event', 'dummy', 1));
    }
    getInitialMilestones() {
        return Promise.resolve([new Milestone(1, 'Milestone', 1, ComparableVisitorValue.EQ, 'test', MilestoneType.Basic)]);
    }
    getMilestone(id) {
        return Promise.resolve(new Milestone(1, 'Milestone', 1, ComparableVisitorValue.EQ, 'test', MilestoneType.Basic));
    }
    getDefaultTimeline() {
        return Promise.resolve([new Timeline(1, new LanternEvent())]);
    }
    getSettlementLocations() {
        return Promise.resolve([new Location('Location', 'dummy', new Map(), false)]);
    }
    getLocation(name) {
        return Promise.resolve(new Location(name, 'dummy', new Map(), false));
    }
    getInnovations() {
        return Promise.resolve([new Innovation('Innovation', 'dummy', InnovationTag.SCULPURE_CONSEQUENCE, [InnovationTag.FAITH], false)]);
    }
    getInnovation(name) {
        return Promise.resolve(new Innovation(name, 'dummy', InnovationTag.SCULPURE_CONSEQUENCE, [InnovationTag.FAITH], false));
    }
    getInnovationsThatAreNotAddedButAvailable(objects) {
        return Promise.resolve(objects);
    }
    getDisorders() {
        return Promise.resolve([new Disorder('DISORDER', 'dummy')]);
    }
    getDisorder(name) {
        return Promise.resolve(new Disorder(name, 'dummy'));
    }
    getFightingArts() {
        return Promise.resolve([new FightingArt('FIGHTINGART', 'dummy')]);
    }
    getFightingArt(name) {
        return Promise.resolve(new FightingArt(name, 'dummy'));
    }
    getPrinciples() {
        return Promise.resolve([new Principle('Principle', 'dummy', new PrincipleType('Dummy Type')),
            new Principle('Principle 2', 'dummy', new PrincipleType('Dummy Type'))]);
    }
    getPrinciple(name) {
        return Promise.resolve(new Principle(name, 'dummy', new PrincipleType('Dummy Type')));
    }
    getPrincipleTypes() {
        return Promise.resolve([new PrincipleType('Dummy Type')]);
    }
    getPrinciplesWithType(principleType) {
        return this.getPrinciples();
    }
    getWeapons() {
        return Promise.resolve([new Weapon('Weapon', 'dummy', 1, [StorageTag.ITEM], new Map(), 1, 1, 1)]);
    }
    getArmors() {
        return Promise.resolve([new Armor('Armor', 'dummy', 1, [StorageTag.ITEM], new Map(), 1, ArmorSpace.HEAD)]);
    }
    getEquipments() {
        return Promise.resolve([new Equipment('Armor', 'dummy', 1, [StorageTag.ITEM], new Map())]);
    }
    getAllExistingEquipmentItems() {
        return Promise.all([this.getWeapons(), this.getArmors(), this.getEquipments()]);
    }
    getEquipment(name) {
        return Promise.resolve(new Equipment(name, 'dummy', 1, [StorageTag.ITEM], new Map()));
    }
    getAllSevereInjuries() {
        return Promise.resolve([new SevereInjury('SevereInjury', 'dummy', 1, 2, ArmorSpace.BODY)]);
    }
    getSevereInjuriesToHitLocation(hitLocation) {
        return this.getAllSevereInjuries();
    }
    getAllBrainTraumas() {
        return Promise.resolve([new DiceThrow('DiceThrow', 'dummy', 1, 2)]);
    }
    getAllHuntEvents() {
        return Promise.resolve([new HuntEvent('HuntEvent', 'dummy')]);
    }
    getAllGlossaryEntries() {
        return Promise.resolve([new BaseModel('BaseModel', 'dummy')]);
    }
    sortByName(l, r) {
        if (l.name < r.name) {
            return -1;
        }
        if (l.name > r.name) {
            return 1;
        }
        return 0;
    }
}
export class KDMCalculationServiceMock {
    addResourcesFromKilledMonster(huntedMonster, originalMonster) {
    }
}
export class KDMObserverServiceMock {
    registerObserverForMilestone(settlementPageComponent, milestone) {
    }
    registerObserverForSurvivorHappenings(survivorPageComponent) {
    }
}
export class ViewControllerMock {
    constructor() {
        this.readReady = {
            subscribe() {
            },
        };
        this.writeReady = {
            subscribe() {
            },
        };
    }
    dismiss() {
        console.log('View Controller Dismiss Called');
    }
    _setHeader() {
    }
    _setNavbar() {
    }
    _setIONContent() {
    }
    _setIONContentRef() {
    }
}
export class KeyValueChangesMock {
    forEachItem(fn) {
    }
    forEachPreviousItem(fn) {
    }
    forEachChangedItem(fn) {
    }
    forEachAddedItem(fn) {
    }
    forEachRemovedItem(fn) {
    }
}
export class KeyValueDifferMock {
    diff(object) {
        return new KeyValueChangesMock();
    }
}
export class KeyValueDifferFactoryMock {
    supports(objects) {
        return true;
    }
    create() {
        return new KeyValueDifferMock();
    }
}
export class KeyValueDiffersMock {
    static create(factories, parent) {
        return new KeyValueDiffersMock();
    }
    static extend(factories) {
        return [];
    }
    find(kv) {
        return new KeyValueDifferFactoryMock();
    }
}
export class StorageMock {
    constructor() {
        this.store = {};
    }
    ready() {
        return new Promise((resolve) => {
            resolve({});
        });
    }
    get(key) {
        return Promise.resolve(key in this.store ? this.store[key] : null);
    }
    set(key, value) {
        this.store[key] = value;
        return Promise.resolve({});
    }
    remove(key) {
        return new Promise((resolve) => {
            resolve({ key: key });
        });
    }
    query() {
        return new Promise((resolve) => {
            resolve({
                res: {
                    rows: [{}],
                },
            });
        });
    }
}
//# sourceMappingURL=mocks.js.map