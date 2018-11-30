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
import { Settlement } from '../model/settlement';
import { LanternEvent } from '../model/lantern-event';
import { Timeline } from '../model/timeline';
import { Milestone, MilestoneType } from '../model/milestone';
import { Location } from '../model/location';
import { Resource, ResourceType } from '../model/resource';
import { Innovation, InnovationTag } from '../model/innovation';
import { Principle } from '../model/principle';
import { Storage, StorageTag } from '../model/storage';
import { Weapon } from '../model/weapon';
import { Armor, ArmorSpace } from '../model/armor';
import { Affinity, Direction, Equipment } from '../model/equipment';
import { isUndefined } from 'ionic-angular/util/util';
import { SevereInjury } from '../model/severe-injury';
import { KDMDBService } from './kdm-db.service';
import { SettlementTimeline } from '../model/linking/settlement-timeline';
import { HuntableMonster } from '../model/linking/huntable-monster';
import { HuntedMonster } from '../model/linking/hunted-monster';
import { SettlementMilestone } from '../model/linking/settlement-milestone';
import { Survivor } from '../model/survivor';
import { HttpClient } from '@angular/common/http';
import { ComparableVisitorValue } from '../model/visitor/comparable-visitor';
class SettlementWatcher {
    constructor(settlement, lastUpdated) {
        this.settlement = settlement;
        this.lastUpdated = lastUpdated;
    }
}
/**
 * Created by Daniel on 28.01.2017.
 */
let KDMDataService = class KDMDataService {
    constructor(http, kdmDBService) {
        this.http = http;
        this.kdmDBService = kdmDBService;
        this.settlements = [];
        this.monsters = [];
        this.resources = [];
        this.lanternEvents = [];
        this.storyEvents = [];
        this.milestones = [];
        this.timeline = [];
        this.locations = [];
        this.innovations = [];
        this.disorders = [];
        this.fightingArts = [];
        this.principles = [];
        this.principleTypes = [];
        this.weapons = [];
        this.armors = [];
        this.equipments = [];
        this.severeInjuries = [];
        this.brainTraumas = [];
        this.glossaryEntries = [];
        this.huntEvents = [];
        this.baseURL = 'assets/data';
        this.monstersURL = this.baseURL + '/monsters.json';
        this.resourcesURL = this.baseURL + '/resources.json';
        this.lanterneventsURL = this.baseURL + '/lanternevents.json';
        this.storyeventsURL = this.baseURL + '/storyevents.json';
        this.milestonesURL = this.baseURL + '/milestones.json';
        this.defaulttimelineURL = this.baseURL + '/defaulttimeline.json';
        this.locationsURL = this.baseURL + '/locations.json';
        this.innovationsURL = this.baseURL + '/innovations.json';
        this.disordersURL = this.baseURL + '/disorders.json';
        this.fightingartsURL = this.baseURL + '/fightingarts.json';
        this.principlesURL = this.baseURL + '/principles.json';
        this.principletypesURL = this.baseURL + '/principletypes.json';
        this.weaponsURL = this.baseURL + '/weapons.json';
        this.armorsURL = this.baseURL + '/armors.json';
        this.equipmentsURL = this.baseURL + '/equipments.json';
        this.severeinjuriesURL = this.baseURL + '/severeinjuries.json';
        this.braintraumasURL = this.baseURL + '/braintraumas.json';
        this.hunteventsURL = this.baseURL + '/huntevents.json';
        this.glossaryentriesURL = this.baseURL + '/glossaryentries.json';
        this.initSurvivorName = 'Survivor';
        this.watchedSettlements = [];
    }
    initData() {
        this.getStoryEvents().then();
        this.getPrincipleTypes().then();
        this.getAllSevereInjuries().then();
        this.getAllBrainTraumas().then();
        this.getAllGlossaryEntries().then();
        this.getAllHuntEvents().then();
        this.getInitialMilestones().then();
        this.getDefaultTimeline().then();
        this.getInnovations().then();
        this.getMonsters().then();
        this.getResources().then();
        this.getDisorders().then();
        this.getFightingArts().then();
        this.getPrinciples().then();
        this.getWeapons().then();
        this.getArmors().then();
        this.getEquipments().then();
        this.getSettlementLocations().then();
    }
    getSettlements() {
        if (this.settlements.length < 1) {
            return this.kdmDBService.getSettlements().then(simplifiedSettlementsArray => {
                simplifiedSettlementsArray[0].forEach(simplifiedSettlement => this.settlements.push(this.desimplifySettlements(simplifiedSettlement)));
                return this.settlements;
            });
        }
        else {
            return Promise.resolve(this.settlements);
        }
    }
    getSettlement(id) {
        return this.kdmDBService.getSettlementById(id).then(settlementSimplified => {
            const settlement = this.desimplifySettlement(settlementSimplified);
            this.settlements[this.settlements.findIndex(stlmnt => stlmnt.id === id)] = settlement;
            const indexCount = this.watchedSettlements.findIndex(watchedSettlement => watchedSettlement.settlement.id === settlement.id);
            this.watchedSettlements.splice(indexCount, 1);
            this.watchedSettlements.push(new SettlementWatcher(settlement, Date.now()));
            return settlement;
        });
    }
    addSettlement(settlement) {
        this.getSettlements().then(settlements => {
            if (settlements.length > 0) {
                settlement.id = Math.max.apply(Math, settlements.map(s => s.id)) + 1;
            }
            else {
                settlement.id = 1;
            }
            this.settlements.push(settlement);
            this.kdmDBService.saveSettlement(settlement);
        });
    }
    removeSettlement(settlement) {
        this.settlements.splice(this.settlements.indexOf(settlement), 1);
        this.kdmDBService.removeSettlement(settlement.id);
    }
    createAndAddSurvivor(settlement) {
        let maxId = 1;
        if (settlement.survivors.length > 0) {
            maxId = Math.max.apply(Math, settlement.survivors.map((s) => s.id)) + 1;
        }
        const survivor = new Survivor(this.initSurvivorName, maxId, settlement.id);
        settlement.addSurvivor(survivor);
        this.setSurvivorObservers(survivor, settlement);
        return survivor;
    }
    getMonsters() {
        if (this.monsters.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.monstersURL).subscribe((res) => {
                    this.monsters = res;
                    resolve(res);
                });
            });
        }
        else {
            return Promise.resolve(this.monsters);
        }
    }
    getMonster(id) {
        return this.getMonsters().then(monsters => monsters.find(monster => monster.id === id));
    }
    getDefaultInitialHuntableNemesisMonsters() {
        return this.getMonsters().then(monsters => monsters.filter(monster => monster.isNemesis));
    }
    getDefaultInitialHuntableQuarries() {
        return this.getMonsters().then(monsters => monsters.filter(monster => !monster.isNemesis));
    }
    getResources() {
        if (this.resources.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.resourcesURL).subscribe(res => {
                    const resources = [];
                    res.forEach(resourceJSON => {
                        const resource = new Resource(resourceJSON.name, resourceJSON.description, resourceJSON.amount, this.createStorageTagArray(resourceJSON.tags), ResourceType[resourceJSON.type], resourceJSON.existingCards);
                        resources.push(resource);
                    });
                    this.resources = resources;
                    resolve(resources);
                });
            });
        }
        else {
            return Promise.resolve(this.resources);
        }
    }
    getResourceByName(name) {
        return this.getResources().then(resources => resources.find(resource => resource.name === name));
    }
    getAllExistingStorageItems() {
        const promises = [];
        promises.push(this.getResources());
        promises.push(this.getWeapons());
        promises.push(this.getArmors());
        promises.push(this.getEquipments());
        return Promise.all(promises);
    }
    getStorageItem(name) {
        return this.getAllExistingStorageItems().then(array => {
            let element = new Storage('placeholder', 'placeholder', 1, [StorageTag.ITEM]);
            array.forEach(typearray => {
                const finding = typearray.find(type => type.name === name);
                if (finding !== undefined) {
                    element = finding;
                }
            });
            return element;
        });
    }
    getLanternEvents() {
        if (this.lanternEvents.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.lanterneventsURL).subscribe(res => {
                    const lanternEvents = [];
                    res.forEach(lanternEventJSON => {
                        const lanternEvent = new LanternEvent(lanternEventJSON.name, lanternEventJSON.todo);
                        lanternEventJSON.storyEvents.forEach(storyEventID => {
                            this.getStoryEvent(storyEventID).then(storyEvent => {
                                lanternEvent.storyEvents.push(storyEvent);
                                lanternEvent.storyEvents.sort(this.sortById);
                            });
                        });
                        lanternEvents.push(lanternEvent);
                    });
                    this.lanternEvents = lanternEvents;
                    resolve(lanternEvents);
                });
            });
        }
        else {
            return Promise.resolve(this.lanternEvents);
        }
    }
    getLanternEvent(name) {
        return this.getLanternEvents().then(lanternEvents => lanternEvents.find(lanternEvent => lanternEvent.name === name));
    }
    getStoryEvents() {
        if (this.storyEvents.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.storyeventsURL).subscribe(res => {
                    this.storyEvents = res;
                    resolve(res);
                });
            });
        }
        else {
            return Promise.resolve(this.storyEvents);
        }
    }
    getStoryEvent(id) {
        return this.getStoryEvents().then(storyEvents => storyEvents.find(storyEvent => storyEvent.id === id));
    }
    getInitialMilestones() {
        if (this.milestones.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.milestonesURL).subscribe(res => {
                    const milestones = [];
                    res.forEach(milestoneJSON => {
                        const milestone = new Milestone(milestoneJSON.id, milestoneJSON.tag, milestoneJSON.value, milestoneJSON.comparator != null ? ComparableVisitorValue[milestoneJSON.comparator] : '', milestoneJSON.observerTarget, MilestoneType[milestoneJSON.milestoneType], milestoneJSON.name, milestoneJSON.todo);
                        milestoneJSON.storyEvents.forEach(storyEventID => {
                            this.getStoryEvent(storyEventID).then(storyEvent => milestone.storyEvents.push(storyEvent));
                        });
                        milestones.push(milestone);
                    });
                    this.milestones = milestones;
                    resolve(milestones);
                });
            });
        }
        else {
            return Promise.resolve(this.milestones);
        }
    }
    getMilestone(id) {
        return this.getInitialMilestones().then(milestones => milestones.find(milestone => milestone.id === id));
    }
    getDefaultTimeline() {
        if (this.timeline.length < 1) {
            return this.getLanternEvents().then(lntrnEvents => new Promise(resolve => {
                this.http.get(this.defaulttimelineURL).subscribe(res => {
                    const timelines = [];
                    res.forEach(timelineJson => {
                        const tl = new Timeline(timelineJson.position, lntrnEvents.find(lanternEvent => lanternEvent.name === timelineJson.lanternEvent));
                        timelines.push(tl);
                    });
                    this.timeline = timelines;
                    resolve(timelines);
                });
            }));
        }
        else {
            return Promise.resolve(this.timeline);
        }
    }
    getSettlementLocations() {
        if (this.locations.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.locationsURL).subscribe(res => {
                    const locations = [];
                    res.forEach(locationJSON => {
                        const manufacturingObjects = new Map();
                        locationJSON.manufacturingObjects.forEach(manufacturingObject => {
                            this.getEquipment(manufacturingObject.name).then(equipment => {
                                const costs = new Map();
                                manufacturingObject.buildCosts.forEach(buildCost => {
                                    switch (buildCost.type) {
                                        case 'storageTag': {
                                            if (buildCost.or) {
                                                const arr = [buildCost.amount];
                                                arr.push(buildCost.or);
                                                costs.set(StorageTag[buildCost.name], arr);
                                            }
                                            else {
                                                costs.set(StorageTag[buildCost.name], [buildCost.amount]);
                                            }
                                            break;
                                        }
                                        case 'innovation': {
                                            this.getInnovation(buildCost.name).then(innovation => costs.set(innovation, [buildCost.amount]));
                                            break;
                                        }
                                        case 'resource': {
                                            if (buildCost.or) {
                                                const arr = [buildCost.amount];
                                                arr.push(buildCost.or);
                                                this.getResourceByName(buildCost.name).then(resource => costs.set(resource.name, arr));
                                            }
                                            else {
                                                this.getResourceByName(buildCost.name).then(resource => costs.set(resource.name, [buildCost.amount]));
                                            }
                                            break;
                                        }
                                        case 'weapon': {
                                            if (buildCost.or) {
                                                const arr = [buildCost.amount];
                                                arr.push(buildCost.or);
                                                this.getWeaponByName(buildCost.name).then(resource => costs.set(resource.name, arr));
                                            }
                                            else {
                                                this.getWeaponByName(buildCost.name).then(resource => costs.set(resource.name, [buildCost.amount]));
                                            }
                                            break;
                                        }
                                        case 'text': {
                                            costs.set(buildCost.name, [buildCost.amount]);
                                            break;
                                        }
                                        default: {
                                            console.error('No element for type: ' + buildCost.type + ', for Equipment: ' + buildCost.name);
                                            break;
                                        }
                                    }
                                });
                                manufacturingObjects.set(equipment, costs);
                            });
                        });
                        const location = new Location(locationJSON.name, locationJSON.description, manufacturingObjects, locationJSON.isStartLocation);
                        locations.push(location);
                    });
                    this.locations = locations;
                    resolve(locations);
                });
            });
        }
        else {
            return Promise.resolve(this.locations);
        }
    }
    getLocation(name) {
        return this.getSettlementLocations().then(locations => locations.find(location => location.name === name));
    }
    getInnovations() {
        if (this.innovations.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.innovationsURL).subscribe(res => {
                    const innovations = [];
                    res.forEach(innovationJSON => {
                        const tags = [];
                        innovationJSON.tags.forEach(tagString => tags.push(InnovationTag[tagString]));
                        const innovation = new Innovation(innovationJSON.name, innovationJSON.description, InnovationTag[innovationJSON.consequence], tags, innovationJSON.isBase);
                        innovations.push(innovation);
                    });
                    this.innovations = innovations;
                    resolve(innovations);
                });
            });
        }
        else {
            return Promise.resolve(this.innovations);
        }
    }
    getInnovation(name) {
        return this.getInnovations().then(innovations => innovations.find(innovation => innovation.name === name));
    }
    getInnovationsThatAreNotAddedButAvailable(objects) {
        return this.getInnovations().then(innovations => {
            let existingObjects = innovations.filter(innovation => isUndefined(objects.find((innov) => innov.name === innovation.name)) &&
                innovation.tags.some(tag => objects.filter((innov) => innov.consequence === tag).length > 0));
            // when null/undefined get all Base Innovations and add them to the list
            if (existingObjects == null || (existingObjects.length === 0 && objects.length === 0)) {
                existingObjects = innovations.filter(innovation => innovation.isBase);
            }
            return existingObjects;
        });
    }
    getDisorders() {
        if (this.disorders.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.disordersURL).subscribe(res => {
                    this.disorders = res;
                    resolve(res);
                });
            });
        }
        else {
            return Promise.resolve(this.disorders);
        }
    }
    getDisorder(name) {
        return this.getDisorders().then(disorders => disorders.find(disorder => disorder.name === name));
    }
    getFightingArts() {
        if (this.fightingArts.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.fightingartsURL).subscribe(res => {
                    this.fightingArts = res;
                    resolve(res);
                });
            });
        }
        else {
            return Promise.resolve(this.fightingArts);
        }
    }
    getFightingArt(name) {
        return this.getFightingArts().then(fightingArts => fightingArts.find(fightingArt => fightingArt.name === name));
    }
    getPrinciples() {
        if (this.principles.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.principlesURL).subscribe(res => {
                    const principles = [];
                    res.forEach(principleJSON => {
                        const principle = new Principle(principleJSON.name, principleJSON.description, this.principleTypes.find(principleType => principleJSON.type === principleType.name));
                        principles.push(principle);
                    });
                    this.principles = principles;
                    resolve(principles);
                });
            });
        }
        else {
            return Promise.resolve(this.principles);
        }
    }
    getPrinciple(name) {
        return this.getPrinciples().then(principles => principles.find(principle => principle.name === name));
    }
    getPrincipleTypes() {
        if (this.principleTypes.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.principletypesURL).subscribe(res => {
                    this.principleTypes = res;
                    resolve(res);
                });
            });
        }
        else {
            return Promise.resolve(this.principleTypes);
        }
    }
    getPrinciplesWithType(principleType) {
        return this.getPrinciples().then(principles => principles.filter(principle => {
            if (!principle.type) {
                return false;
            }
            return principle.type.name === principleType.name;
        }));
    }
    getWeapons() {
        if (this.weapons.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.weaponsURL).subscribe(res => {
                    const weapons = [];
                    res.forEach(weaponJSON => {
                        const weapon = new Weapon(weaponJSON.name, weaponJSON.description, weaponJSON.amount, this.createStorageTagArray(weaponJSON.tags), this.createAffinityMap(weaponJSON.affinities), weaponJSON.speed, weaponJSON.accuracy, weaponJSON.strength);
                        weapons.push(weapon);
                    });
                    this.weapons = weapons;
                    resolve(weapons);
                });
            });
        }
        else {
            return Promise.resolve(this.weapons);
        }
    }
    getWeaponByName(name) {
        return this.getWeapons().then(weapons => weapons.find(weapon => weapon.name === name));
    }
    getArmors() {
        if (this.armors.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.armorsURL).subscribe(res => {
                    const armors = [];
                    res.forEach(armorJSON => {
                        const armor = new Armor(armorJSON.name, armorJSON.description, armorJSON.amount, this.createStorageTagArray(armorJSON.tags), this.createAffinityMap(armorJSON.affinities), armorJSON.value, ArmorSpace[armorJSON.space]);
                        armors.push(armor);
                    });
                    this.armors = armors;
                    resolve(armors);
                });
            });
        }
        else {
            return Promise.resolve(this.armors);
        }
    }
    getEquipments() {
        if (this.equipments.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.equipmentsURL).subscribe(res => {
                    const equipments = [];
                    res.forEach(equipmentJSON => {
                        const equipment = new Equipment(equipmentJSON.name, equipmentJSON.description, equipmentJSON.amount, this.createStorageTagArray(equipmentJSON.tags), this.createAffinityMap(equipmentJSON.affinities));
                        equipments.push(equipment);
                    });
                    this.equipments = equipments;
                    resolve(equipments);
                });
            });
        }
        else {
            return Promise.resolve(this.equipments);
        }
    }
    getAllExistingEquipmentItems() {
        return Promise.all([this.getWeapons(), this.getArmors(), this.getEquipments()]);
    }
    getEquipment(name) {
        return this.getAllExistingEquipmentItems().then(arrayOfArrays => {
            let equipment = null;
            arrayOfArrays.forEach((array) => {
                const finding = array.find(e => e.name === name);
                if (finding !== undefined) {
                    equipment = finding;
                }
            });
            return equipment;
        });
    }
    getAllSevereInjuries() {
        if (this.severeInjuries.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.severeinjuriesURL).subscribe(res => {
                    const injuries = [];
                    res.forEach(injuryJSON => {
                        const severeInjury = new SevereInjury(injuryJSON.name, injuryJSON.description, injuryJSON.minRoll, injuryJSON.maxRoll, ArmorSpace[injuryJSON.hitLocation]);
                        injuries.push(severeInjury);
                    });
                    this.severeInjuries = injuries;
                    resolve(injuries);
                });
            });
        }
        else {
            return Promise.resolve(this.severeInjuries);
        }
    }
    getSevereInjuriesToHitLocation(hitLocation) {
        const hitLocationEnum = ArmorSpace[hitLocation];
        return this.getAllSevereInjuries().then(severeInjuries => severeInjuries.filter(severeInjury => severeInjury.hitLocation === hitLocationEnum));
    }
    getAllBrainTraumas() {
        if (this.brainTraumas.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.braintraumasURL).subscribe(res => {
                    this.brainTraumas = res;
                    resolve(res);
                });
            });
        }
        else {
            return Promise.resolve(this.brainTraumas);
        }
    }
    getAllHuntEvents() {
        if (this.huntEvents.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.hunteventsURL).subscribe(res => {
                    this.huntEvents = res;
                    resolve(res);
                });
            });
        }
        else {
            return Promise.resolve(this.huntEvents);
        }
    }
    getAllGlossaryEntries() {
        if (this.glossaryEntries.length < 1) {
            return new Promise(resolve => {
                this.http.get(this.glossaryentriesURL).subscribe(res => {
                    this.glossaryEntries = res;
                    resolve(res);
                });
            });
        }
        else {
            return Promise.resolve(this.glossaryEntries);
        }
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
    sortById(l, r) {
        if (l.id < r.id) {
            return -1;
        }
        if (l.id > r.id) {
            return 1;
        }
        return 0;
    }
    saveSettlementObserver(settlement) {
        return {
            next: x => {
                this.kdmDBService.saveSettlement(settlement);
            },
            error: err => console.error('Observer got an error: ' + err),
            complete: () => console.log('Observer got a complete notification'),
        };
    }
    createAffinityMap(affinityJSON) {
        const affinities = new Map();
        affinityJSON.forEach(affinity => {
            const directions = [];
            affinity.directions.forEach(directionString => {
                directions.push(Direction[directionString]);
            });
            affinities.set(Affinity[affinity.affinity], directions);
        });
        return affinities;
    }
    createStorageTagArray(tags) {
        const storageTags = [];
        tags.forEach(tagString => {
            // TODO remove when all storage elements are added
            if (StorageTag[tagString] === undefined) {
                console.log('StorageTag: ' + tagString);
                console.log(StorageTag[tagString]);
            }
            storageTags.push(StorageTag[tagString]);
        });
        return storageTags;
    }
    desimplifySettlements(simplifiedSettlement) {
        const settlement = new Settlement(simplifiedSettlement.name);
        settlement.id = simplifiedSettlement.id;
        settlement.survivalLimit = simplifiedSettlement.survivalLimit;
        settlement.population = simplifiedSettlement.population;
        settlement.deathcount = simplifiedSettlement.deathcount;
        settlement.settlementLost = simplifiedSettlement.settlementLost;
        return settlement;
    }
    desimplifySettlement(simplifiedSettlement) {
        const settlement = new Settlement(simplifiedSettlement.name);
        settlement.nameChange.subscribe(this.saveSettlementObserver(settlement));
        settlement.id = simplifiedSettlement.id;
        settlement.survivalLimit = simplifiedSettlement.survivalLimit;
        settlement.survivalLimitChange.subscribe(this.saveSettlementObserver(settlement));
        settlement.population = simplifiedSettlement.population;
        settlement.populationChange.subscribe(this.saveSettlementObserver(settlement));
        settlement.deathcount = simplifiedSettlement.deathcount;
        settlement.deathcountChange.subscribe(this.saveSettlementObserver(settlement));
        settlement.settlementLost = simplifiedSettlement.settlementLost;
        settlement.settlementLostChange.subscribe(this.saveSettlementObserver(settlement));
        if (this.arrayExistsAndIsNotEmpty(simplifiedSettlement.timeline)) {
            simplifiedSettlement.timeline.forEach(timelineDB => {
                this.getLanternEvent(timelineDB.timeline[1]).then(lanternEvent => {
                    const tl = {
                        position: timelineDB.timeline[0],
                        lanternEvent: lanternEvent,
                    };
                    const stl = new SettlementTimeline(settlement, tl);
                    stl.reached = timelineDB.reached;
                    stl.reachedChanged.subscribe(this.saveSettlementObserver(settlement));
                    settlement.addTimelineItem(stl);
                });
            });
        }
        settlement.timelineSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        if (this.arrayExistsAndIsNotEmpty(simplifiedSettlement.huntableMonsters)) {
            simplifiedSettlement.huntableMonsters.forEach(huntableMonsterDB => {
                this.getMonster(huntableMonsterDB.monsterId).then(monster => {
                    const huntableMonster = new HuntableMonster(settlement, monster);
                    huntableMonster.isHuntable = huntableMonsterDB.isHuntable;
                    huntableMonster.isHuntableChanged.subscribe(this.saveSettlementObserver(settlement));
                    huntableMonster.defeatedLevelThree = huntableMonsterDB.defeatedLevelThree;
                    huntableMonster.defeatedLevelThreeChanged.subscribe(this.saveSettlementObserver(settlement));
                    huntableMonster.defeatedLevelTwo = huntableMonsterDB.defeatedLevelTwo;
                    huntableMonster.defeatedLevelTwoChanged.subscribe(this.saveSettlementObserver(settlement));
                    huntableMonster.defeatedLevelOne = huntableMonsterDB.defeatedLevelOne;
                    huntableMonster.defeatedLevelOneChanged.subscribe(this.saveSettlementObserver(settlement));
                    settlement.addHuntableMonster(huntableMonster);
                });
            });
        }
        settlement.huntableMonstersSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        if (this.arrayExistsAndIsNotEmpty(simplifiedSettlement.huntedMonsters)) {
            simplifiedSettlement.huntedMonsters.forEach(huntedMonsterDB => {
                this.getMonster(huntedMonsterDB.monsterId).then(monster => {
                    const huntedMonster = new HuntedMonster(settlement, monster);
                    huntedMonster.monsterLevel = huntedMonsterDB.monsterLevel;
                    huntedMonsterDB.huntedResources.forEach((value) => {
                        this.getResourceByName(value[0]).then(resource => {
                            const r = Object.assign(resource);
                            huntedMonster.huntedResources.push(r);
                            r.amount = value[1];
                            r.amountChanged.subscribe(this.saveSettlementObserver(settlement));
                        });
                    });
                    settlement.addHuntedMonster(huntedMonster);
                });
            });
        }
        settlement.huntedMonstersSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        if (this.arrayExistsAndIsNotEmpty(simplifiedSettlement.locationNames)) {
            simplifiedSettlement.locationNames.forEach(locationName => {
                this.getLocation(locationName).then(location => settlement.addLocation(location));
            });
        }
        settlement.locationsSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        if (this.arrayExistsAndIsNotEmpty(simplifiedSettlement.storagesNameAmount)) {
            simplifiedSettlement.storagesNameAmount.forEach((value) => {
                this.getStorageItem(value[0]).then(storage => {
                    const s = Object.assign(storage);
                    settlement.addStorageItem(s);
                    s.amount = value[1];
                    s.amountChanged.subscribe(this.saveSettlementObserver(settlement));
                });
            });
        }
        settlement.storagesSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        if (this.arrayExistsAndIsNotEmpty(simplifiedSettlement.innovationNames)) {
            simplifiedSettlement.innovationNames.forEach(innovationName => {
                this.getInnovation(innovationName).then(innovation => {
                    settlement.addInnovation(innovation);
                });
            });
        }
        settlement.innovationsSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        if (this.arrayExistsAndIsNotEmpty(simplifiedSettlement.principleNames)) {
            simplifiedSettlement.principleNames.forEach(principleName => {
                this.getPrinciple(principleName).then(principle => {
                    settlement.addPrinciple(principle);
                });
            });
        }
        settlement.principlesSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        if (this.arrayExistsAndIsNotEmpty(simplifiedSettlement.milestones)) {
            simplifiedSettlement.milestones.forEach(settlementMilestone => {
                this.getMilestone(settlementMilestone.milestoneId).then(milestone => {
                    const sm = new SettlementMilestone(settlement, milestone);
                    sm.reached = settlementMilestone.reached;
                    settlement.addMilestone(sm);
                });
            });
        }
        settlement.milestonesSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        if (this.arrayExistsAndIsNotEmpty(simplifiedSettlement.survivors)) {
            simplifiedSettlement.survivors.forEach(simplifiedSurvivor => {
                const survivor = new Survivor(simplifiedSurvivor.name, simplifiedSurvivor.id, simplifiedSurvivor.settlementId);
                survivor.isAlive = simplifiedSurvivor.isAlive;
                survivor.isMale = simplifiedSurvivor.isMale;
                survivor.experience = simplifiedSurvivor.experience;
                survivor.survival = simplifiedSurvivor.survival;
                survivor.canDodge = simplifiedSurvivor.canDodge;
                survivor.canEncourage = simplifiedSurvivor.canEncourage;
                survivor.canSurge = simplifiedSurvivor.canSurge;
                survivor.canDash = simplifiedSurvivor.canDash;
                survivor.movement = simplifiedSurvivor.movement;
                survivor.accuracy = simplifiedSurvivor.accuracy;
                survivor.strength = simplifiedSurvivor.strength;
                survivor.evasion = simplifiedSurvivor.evasion;
                survivor.luck = simplifiedSurvivor.luck;
                survivor.speed = simplifiedSurvivor.speed;
                survivor.insanity = simplifiedSurvivor.insanity;
                survivor.isBrainDamaged = simplifiedSurvivor.isBrainDamaged;
                survivor.headArmor = simplifiedSurvivor.headArmor;
                survivor.headHeavyInjury = simplifiedSurvivor.headHeavyInjury;
                survivor.armsArmor = simplifiedSurvivor.armsArmor;
                survivor.armsLightInjury = simplifiedSurvivor.armsLightInjury;
                survivor.armsHeavyInjury = simplifiedSurvivor.armsHeavyInjury;
                survivor.bodyArmor = simplifiedSurvivor.bodyArmor;
                survivor.bodyLightInjury = simplifiedSurvivor.bodyLightInjury;
                survivor.bodyHeavyInjury = simplifiedSurvivor.bodyHeavyInjury;
                survivor.waistArmor = simplifiedSurvivor.waistArmor;
                survivor.waistLightInjury = simplifiedSurvivor.waistLightInjury;
                survivor.waistHeavyInjury = simplifiedSurvivor.waistHeavyInjury;
                survivor.legsArmor = simplifiedSurvivor.legsArmor;
                survivor.legsLightInjury = simplifiedSurvivor.legsLightInjury;
                survivor.legsHeavyInjury = simplifiedSurvivor.legsHeavyInjury;
                survivor.cannotUseFightingArts = simplifiedSurvivor.cannotUseFightingArts;
                survivor.cannotSpendSurvival = simplifiedSurvivor.cannotSpendSurvival;
                survivor.skipNextHunt = simplifiedSurvivor.skipNextHunt;
                survivor.oncePerLifetime = simplifiedSurvivor.oncePerLifetime;
                survivor.understanding = simplifiedSurvivor.understanding;
                survivor.courage = simplifiedSurvivor.courage;
                survivor.weaponProficiencyType = simplifiedSurvivor.weaponProficiencyType;
                survivor.weaponProficiencyXP = simplifiedSurvivor.weaponProficiencyXP;
                simplifiedSurvivor.fightingArtNames.forEach(fightingArtName => this.getFightingArt(fightingArtName).then(fightingArt => survivor.addFightingArt(fightingArt)));
                simplifiedSurvivor.disorderNames.forEach(disorderName => this.getDisorder(disorderName).then(disorder => survivor.addDisorder(disorder)));
                simplifiedSurvivor.equipments.forEach(survivorEquipmentSimplified => this.getEquipment(survivorEquipmentSimplified.equipmentName).then(equipment => survivor.addEquipment(survivorEquipmentSimplified.position, equipment)));
                this.setSurvivorObservers(survivor, settlement);
                settlement.addSurvivor(survivor);
            });
        }
        settlement.survivorsSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        return settlement;
    }
    arrayExistsAndIsNotEmpty(list) {
        return list && list.length > 0;
    }
    setSurvivorObservers(survivor, settlement) {
        survivor.nameChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.isAliveChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.isMaleChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.experienceChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.survivalChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.canDodgeChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.canEncourageChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.canSurgeChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.canDashChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.movementChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.accuracyChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.strengthChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.evasionChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.luckChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.speedChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.insanityChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.isBrainDamagedChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.headArmorChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.headHeavyInjuryChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.armsArmorChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.armsLightInjuryChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.armsHeavyInjuryChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.bodyArmorChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.bodyLightInjuryChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.bodyHeavyInjuryChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.waistArmorChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.waistLightInjuryChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.waistHeavyInjuryChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.legsArmorChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.legsLightInjuryChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.legsHeavyInjuryChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.cannotUseFightingArtsChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.cannotSpendSurvivalChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.skipNextHuntChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.fightingArtsSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.disordersSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.characteristicsSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.equipmentsSizeChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.oncePerLifetimeChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.courageChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.understandingChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.weaponProficiencyTypeChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.weaponProficiencyXPChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.chosenBoldCourageChanged.subscribe(this.saveSettlementObserver(settlement));
        survivor.chosenInsightUnderstandingChanged.subscribe(this.saveSettlementObserver(settlement));
    }
};
KDMDataService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient, KDMDBService])
], KDMDataService);
export { KDMDataService };
//# sourceMappingURL=kdm-data.service.js.map