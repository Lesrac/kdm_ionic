import { KDMDataService } from './kdm-data.service';
import { KDMDBServiceMock } from '../mock/mocks';
import { discardPeriodicTasks, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { KDMDBService } from './kdm-db.service';
import { Monster } from '../model/monster';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Resource, ResourceType } from '../model/resource';
import { Weapon } from '../model/weapon';
import { Armor, ArmorSpace } from '../model/armor';
import { Affinity, Direction, Equipment } from '../model/equipment';
import { StorageTag } from '../model/storage';
import { LanternEvent } from '../model/lantern-event';
import { StoryEvent } from '../model/story-event';
import { LanternEventJSON } from '../model/jsonData/lantern-event-json';
import { MilestoneJSON } from '../model/jsonData/milestone-json';
import { Milestone, MilestoneType } from '../model/milestone';
import { ComparableVisitorValue } from '../model/visitor/comparable-visitor';
import { TimelineJSON } from '../model/jsonData/timeline-json';
import { Timeline } from '../model/timeline';
import { Disorder } from '../model/disorder';
import { FightingArt } from '../model/fighting-art';
import { BaseModel } from '../model/base-model';
import { HuntEvent } from '../model/hunt-event';
import { DiceThrow } from '../model/dice-throw';
import { SevereInjury } from '../model/severe-injury';
import { SevereInjuryJSON } from '../model/jsonData/severe-injury-json';
import { Principle, PrincipleType } from '../model/principle';
import { PrincipleJSON } from '../model/jsonData/principle-json';
import { Settlement } from '../model/settlement';
import { SettlementSimplified } from '../model/db/settlement-simplified';
import { ResourceJSON } from '../model/jsonData/resource-json';
import { WeaponJSON } from '../model/jsonData/weapon-json';
import { ArmorJSON } from '../model/jsonData/armor-json';
import { AffinityJSON, EquipmentJSON } from '../model/jsonData/equipment-json';
import { InnovationJSON } from '../model/jsonData/innovation-json';
import { Innovation, InnovationTag } from '../model/innovation';
import { BuildCost, LocationJSON, ManufacturingObject } from '../model/jsonData/location-json';
import { Location } from '../model/location';
import { SettlementTimelineDB } from '../model/db/settlement-timeline-db';
import { HuntableMonsterDB } from '../model/db/huntable-monster-db';
import { HuntedMonsterDB } from '../model/db/hunted-monster-db';
import { SurvivorSimplified } from '../model/db/survivor-simplified';
import { SettlementMilestoneDB } from '../model/db/settlement-milestone-db';
describe('KDM Data Service', () => {
    let kdmDBServiceMock;
    beforeEach(() => {
        kdmDBServiceMock = new KDMDBServiceMock();
        TestBed.configureTestingModule({
            declarations: [],
            providers: [KDMDataService,
                { provide: KDMDBService, useValue: kdmDBServiceMock },
            ],
            imports: [HttpClientTestingModule],
        });
    });
    afterEach(inject([HttpTestingController], (httpMock) => {
        httpMock.verify();
    }));
    describe('Monsters', () => {
        let monster1;
        let monster2;
        let monster3;
        let monster4;
        let monster5;
        let monsters;
        beforeEach(() => {
            monster1 = new Monster(1, 'Monster Dummy', false);
            monster2 = new Monster(2, 'Monster Dummy 2', false);
            monster3 = new Monster(3, 'Monster Dummy 3', false);
            monster4 = new Monster(4, 'Monster Dummy 4', true);
            monster5 = new Monster(5, 'Monster Dummy 5', true);
            monsters = [monster1, monster2, monster3, monster4, monster5];
        });
        it('get Monsters from http', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = monsters;
            kdmDataService.getMonsters();
            const res = httpMock.expectOne(kdmDataService.monstersURL);
            res.flush(mockResponse);
            expect(kdmDataService.monsters.length).toBe(monsters.length);
        }));
        it('get Monsters from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.monsters = monsters;
            kdmDataService.getMonsters().then(mnstrs => {
                expect(mnstrs.length).toBe(monsters.length);
            });
        }));
        it('get Nemesis Monsters from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.monsters = monsters;
            kdmDataService.getDefaultInitialHuntableNemesisMonsters().then(mnstrs => {
                expect(mnstrs.length).toBe(monsters.filter(monster => monster.isNemesis).length);
            });
        }));
        it('get Quarry Monsters from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.monsters = monsters;
            kdmDataService.getDefaultInitialHuntableQuarries().then(mnstrs => {
                expect(mnstrs.length).toBe(monsters.filter(monster => !monster.isNemesis).length);
            });
        }));
        it('get Monsters by id', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.monsters = monsters;
            kdmDataService.getMonster(3).then(monster => {
                expect(monster).toBe(monster3);
            });
        }));
    });
    describe('Items/Resources', () => {
        let resourceJSON1;
        let resourceJSON2;
        let resourceJSONs;
        let resource1;
        let resource2;
        let resources;
        let weaponJSON1;
        let weaponJSON2;
        let weaponJSONs;
        let weapon1;
        let weapon2;
        let weapons;
        let armorJSON1;
        let armorJSON2;
        let armorJSONs;
        let armor1;
        let armor2;
        let armors;
        let equipmentJSON1;
        let equipmentJSON2;
        let equipmentJSONs;
        let equipment1;
        let equipment2;
        let equipments;
        beforeEach(() => {
            resourceJSON1 = new ResourceJSON('Dummy Resource 1', 'dummy', 1, ['ITEM'], 'BASIC', 1);
            resourceJSON2 = new ResourceJSON('Dummy Resource 2', 'dummy 2', 2, ['ITEM', 'FUR'], 'WHITELION', 5);
            resourceJSONs = [resourceJSON1, resourceJSON2];
            resource1 = new Resource('Dummy Resource 1', 'dummy', 1, [StorageTag.ITEM], ResourceType.BASIC, 1);
            resource2 = new Resource('Dummy Resource 2', 'dummy', 1, [StorageTag.ITEM], ResourceType.BASIC, 1);
            resources = [resource1, resource2];
            const map = new Map();
            map.set(Affinity.BLUE, [Direction.DOWN]);
            weaponJSON1 = new WeaponJSON('Dummy Weapon 1', 'dummy', 1, ['ITEM'], [new AffinityJSON('BLUE', ['DOWN', 'UP'])], 1, 1, 1);
            weaponJSON2 = new WeaponJSON('Dummy Weapon 2', 'dummy', 2, ['DAGGER', 'FLAMMABLE'], [new AffinityJSON('GREEN', ['LEFT']), new AffinityJSON('RED', ['LEFT', 'RIGHT'])], 2, 2, 2);
            weaponJSONs = [weaponJSON1, weaponJSON2];
            weapon1 = new Weapon('Dummy Weapon 1', 'Dummy', 1, [StorageTag.ITEM], map, 1, 1, 1);
            weapon2 = new Weapon('Dummy Weapon 2', 'Dummy', 1, [StorageTag.ITEM], map, 1, 1, 1);
            weapons = [weapon1, weapon2];
            armorJSON1 = new ArmorJSON('Dummy Armor 1', 'dummy', 1, ['ITEM'], [new AffinityJSON('BLUE', ['DOWN', 'UP'])], 1, 'HEAD');
            armorJSON2 = new ArmorJSON('Dummy Armor 2', 'dummy', 2, ['DAGGER', 'FLAMMABLE'], [new AffinityJSON('GREEN', ['LEFT']), new AffinityJSON('RED', ['LEFT', 'RIGHT'])], 2, 'BODY');
            armorJSONs = [armorJSON1, armorJSON2];
            armor1 = new Armor('Dummy Armor 1', 'Dummy', 1, [StorageTag.ITEM], map, 1, ArmorSpace.HEAD);
            armor2 = new Armor('Dummy Armor 2', 'Dummy', 1, [StorageTag.ITEM], map, 1, ArmorSpace.ARMS);
            armors = [armor1, armor2];
            equipmentJSON1 = new EquipmentJSON('Dummy Equipment 1', 'dummy', 1, ['ITEM'], [new AffinityJSON('BLUE', ['DOWN', 'UP'])]);
            equipmentJSON2 = new EquipmentJSON('Dummy Equipment 2', 'dummy', 2, ['DAGGER', 'FLAMMABLE'], [new AffinityJSON('GREEN', ['LEFT']), new AffinityJSON('RED', ['LEFT', 'RIGHT'])]);
            equipmentJSONs = [equipmentJSON1, equipmentJSON2];
            equipment1 = new Equipment('Dummy Equipment 1', 'Dummy', 1, [StorageTag.ITEM], map);
            equipment2 = new Equipment('Dummy Equipment 2', 'Dummy', 1, [StorageTag.ITEM], map);
            equipments = [equipment1, equipment2];
        });
        it('get Resources', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = resourceJSONs;
            kdmDataService.getResources();
            const res = httpMock.expectOne(kdmDataService.resourcesURL);
            res.flush(mockResponse);
            expect(kdmDataService.resources.length).toBe(resourceJSONs.length);
            expect(kdmDataService.resources[0].name).toBe(resourceJSON1.name);
            expect(kdmDataService.resources[0].description).toBe(resourceJSON1.description);
            expect(kdmDataService.resources[0].amount).toBe(resourceJSON1.amount);
            expect(kdmDataService.resources[0].existingCards).toBe(resourceJSON1.existingCards);
            expect(kdmDataService.resources[0].type).toBe(ResourceType[resourceJSON1.type]);
            expect(kdmDataService.resources[0].tags).toContain(StorageTag[resourceJSON1.tags[0]]);
            expect(kdmDataService.resources[1].name).toBe(resourceJSON2.name);
            expect(kdmDataService.resources[1].description).toBe(resourceJSON2.description);
            expect(kdmDataService.resources[1].amount).toBe(resourceJSON2.amount);
            expect(kdmDataService.resources[1].existingCards).toBe(resourceJSON2.existingCards);
            expect(kdmDataService.resources[1].type).toBe(ResourceType[resourceJSON2.type]);
            expect(kdmDataService.resources[1].tags).toContain(StorageTag[resourceJSON2.tags[0]]);
            expect(kdmDataService.resources[1].tags).toContain(StorageTag[resourceJSON2.tags[1]]);
        }));
        it('get Resources from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.resources = resources;
            kdmDataService.getResources().then(rsrces => {
                expect(rsrces.length).toBe(resources.length);
                expect(rsrces).toContain(resource1);
                expect(rsrces).toContain(resource2);
            });
        }));
        it('get Resource by name', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.resources = resources;
            kdmDataService.getResourceByName(resource2.name).then(resource => {
                expect(resource).toBe(resource2);
            });
        }));
        it('get Weapons', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = weaponJSONs;
            kdmDataService.getWeapons();
            const res = httpMock.expectOne(kdmDataService.weaponsURL);
            res.flush(mockResponse);
            expect(kdmDataService.weapons.length).toBe(weaponJSONs.length);
            expect(kdmDataService.weapons[0].name).toBe(weaponJSON1.name);
            expect(kdmDataService.weapons[0].description).toBe(weaponJSON1.description);
            expect(kdmDataService.weapons[0].amount).toBe(weaponJSON1.amount);
            expect(kdmDataService.weapons[0].speed).toBe(weaponJSON1.speed);
            expect(kdmDataService.weapons[0].accuracy).toBe(weaponJSON1.accuracy);
            expect(kdmDataService.weapons[0].strength).toBe(weaponJSON1.strength);
            expect(kdmDataService.weapons[0].tags).toContain(StorageTag[weaponJSON1.tags[0]]);
            expect(kdmDataService.weapons[0].affinities.get(Affinity[weaponJSON1.affinities[0].affinity]))
                .toContain(Direction[weaponJSON1.affinities[0].directions[0]]);
            expect(kdmDataService.weapons[0].affinities.get(Affinity[weaponJSON1.affinities[0].affinity]))
                .toContain(Direction[weaponJSON1.affinities[0].directions[1]]);
            expect(kdmDataService.weapons[1].name).toBe(weaponJSON2.name);
            expect(kdmDataService.weapons[1].description).toBe(weaponJSON2.description);
            expect(kdmDataService.weapons[1].amount).toBe(weaponJSON2.amount);
            expect(kdmDataService.weapons[1].speed).toBe(weaponJSON2.speed);
            expect(kdmDataService.weapons[1].accuracy).toBe(weaponJSON2.accuracy);
            expect(kdmDataService.weapons[1].strength).toBe(weaponJSON2.strength);
            expect(kdmDataService.weapons[1].tags).toContain(StorageTag[weaponJSON2.tags[0]]);
            expect(kdmDataService.weapons[1].tags).toContain(StorageTag[weaponJSON2.tags[1]]);
            expect(kdmDataService.weapons[1].affinities.get(Affinity[weaponJSON2.affinities[0].affinity]))
                .toContain(Direction[weaponJSON2.affinities[0].directions[0]]);
            expect(kdmDataService.weapons[1].affinities.get(Affinity[weaponJSON2.affinities[1].affinity]))
                .toContain(Direction[weaponJSON2.affinities[1].directions[0]]);
            expect(kdmDataService.weapons[1].affinities.get(Affinity[weaponJSON2.affinities[1].affinity]))
                .toContain(Direction[weaponJSON2.affinities[1].directions[1]]);
        }));
        it('get Weapons from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.weapons = weapons;
            kdmDataService.getWeapons().then(wpns => {
                expect(wpns.length).toBe(weapons.length);
                expect(wpns).toContain(weapon1);
                expect(wpns).toContain(weapon2);
            });
        }));
        it('get Armors', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = armorJSONs;
            kdmDataService.getArmors();
            const res = httpMock.expectOne(kdmDataService.armorsURL);
            res.flush(mockResponse);
            expect(kdmDataService.armors.length).toBe(armorJSONs.length);
            expect(kdmDataService.armors[0].name).toBe(armorJSON1.name);
            expect(kdmDataService.armors[0].description).toBe(armorJSON1.description);
            expect(kdmDataService.armors[0].amount).toBe(armorJSON1.amount);
            expect(kdmDataService.armors[0].value).toBe(armorJSON1.value);
            expect(kdmDataService.armors[0].space).toBe(ArmorSpace[armorJSON1.space]);
            expect(kdmDataService.armors[0].tags).toContain(StorageTag[armorJSON1.tags[0]]);
            expect(kdmDataService.armors[0].affinities.get(Affinity[armorJSON1.affinities[0].affinity]))
                .toContain(Direction[armorJSON1.affinities[0].directions[0]]);
            expect(kdmDataService.armors[0].affinities.get(Affinity[armorJSON1.affinities[0].affinity]))
                .toContain(Direction[armorJSON1.affinities[0].directions[1]]);
            expect(kdmDataService.armors[1].name).toBe(armorJSON2.name);
            expect(kdmDataService.armors[1].description).toBe(armorJSON2.description);
            expect(kdmDataService.armors[1].amount).toBe(armorJSON2.amount);
            expect(kdmDataService.armors[1].value).toBe(armorJSON2.value);
            expect(kdmDataService.armors[1].space).toBe(ArmorSpace[armorJSON2.space]);
            expect(kdmDataService.armors[1].tags).toContain(StorageTag[armorJSON2.tags[0]]);
            expect(kdmDataService.armors[1].tags).toContain(StorageTag[armorJSON2.tags[1]]);
            expect(kdmDataService.armors[1].affinities.get(Affinity[armorJSON2.affinities[0].affinity]))
                .toContain(Direction[armorJSON2.affinities[0].directions[0]]);
            expect(kdmDataService.armors[1].affinities.get(Affinity[armorJSON2.affinities[1].affinity]))
                .toContain(Direction[armorJSON2.affinities[1].directions[0]]);
            expect(kdmDataService.armors[1].affinities.get(Affinity[armorJSON2.affinities[1].affinity]))
                .toContain(Direction[armorJSON2.affinities[1].directions[1]]);
        }));
        it('get Armors from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.armors = armors;
            kdmDataService.getArmors().then(armrs => {
                expect(armrs.length).toBe(armors.length);
                expect(armrs).toContain(armor1);
                expect(armrs).toContain(armor2);
            });
        }));
        it('get Equipments', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = equipmentJSONs;
            kdmDataService.getEquipments();
            const res = httpMock.expectOne(kdmDataService.equipmentsURL);
            res.flush(mockResponse);
            expect(kdmDataService.equipments.length).toBe(equipmentJSONs.length);
            expect(kdmDataService.equipments[0].name).toBe(equipmentJSON1.name);
            expect(kdmDataService.equipments[0].description).toBe(equipmentJSON1.description);
            expect(kdmDataService.equipments[0].amount).toBe(equipmentJSON1.amount);
            expect(kdmDataService.equipments[0].tags).toContain(StorageTag[equipmentJSON1.tags[0]]);
            expect(kdmDataService.equipments[0].affinities.get(Affinity[equipmentJSON1.affinities[0].affinity]))
                .toContain(Direction[equipmentJSON1.affinities[0].directions[0]]);
            expect(kdmDataService.equipments[0].affinities.get(Affinity[equipmentJSON1.affinities[0].affinity]))
                .toContain(Direction[equipmentJSON1.affinities[0].directions[1]]);
            expect(kdmDataService.equipments[1].name).toBe(equipmentJSON2.name);
            expect(kdmDataService.equipments[1].description).toBe(equipmentJSON2.description);
            expect(kdmDataService.equipments[1].amount).toBe(equipmentJSON2.amount);
            expect(kdmDataService.equipments[1].tags).toContain(StorageTag[equipmentJSON2.tags[0]]);
            expect(kdmDataService.equipments[1].tags).toContain(StorageTag[equipmentJSON2.tags[1]]);
            expect(kdmDataService.equipments[1].affinities.get(Affinity[equipmentJSON2.affinities[0].affinity]))
                .toContain(Direction[equipmentJSON2.affinities[0].directions[0]]);
            expect(kdmDataService.equipments[1].affinities.get(Affinity[equipmentJSON2.affinities[1].affinity]))
                .toContain(Direction[equipmentJSON2.affinities[1].directions[0]]);
            expect(kdmDataService.equipments[1].affinities.get(Affinity[equipmentJSON2.affinities[1].affinity]))
                .toContain(Direction[equipmentJSON2.affinities[1].directions[1]]);
        }));
        it('get Equipments from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.equipments = equipments;
            kdmDataService.getEquipments().then(eqpmnts => {
                expect(eqpmnts.length).toBe(equipments.length);
                expect(eqpmnts).toContain(equipment1);
                expect(eqpmnts).toContain(equipment2);
            });
        }));
        it('get all existing Equipment items from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.equipments = equipments;
            kdmDataService.weapons = weapons;
            kdmDataService.armors = armors;
            kdmDataService.getAllExistingEquipmentItems().then((arr) => {
                expect(arr[0].length).toBe(weapons.length);
                expect(arr[0]).toContain(weapon1);
                expect(arr[0]).toContain(weapon2);
                expect(arr[1].length).toBe(armors.length);
                expect(arr[1]).toContain(armor1);
                expect(arr[1]).toContain(armor2);
                expect(arr[2].length).toBe(equipments.length);
                expect(arr[2]).toContain(equipment1);
                expect(arr[2]).toContain(equipment2);
            });
        }));
        it('get Equipment from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.equipments = equipments;
            kdmDataService.weapons = weapons;
            kdmDataService.armors = armors;
            kdmDataService.getEquipment(weapon2.name).then(item => {
                expect(item).toBe(weapon2);
            });
        }));
        it('get all existing Storage items from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.equipments = equipments;
            kdmDataService.weapons = weapons;
            kdmDataService.armors = armors;
            kdmDataService.resources = resources;
            kdmDataService.getAllExistingStorageItems().then((arr) => {
                expect(arr.length).toBe(4);
                expect(arr[0].length).toBe(resources.length);
                expect(arr[0]).toContain(resource1);
                expect(arr[0]).toContain(resource2);
                expect(arr[1].length).toBe(weapons.length);
                expect(arr[1]).toContain(weapon1);
                expect(arr[1]).toContain(weapon2);
                expect(arr[2].length).toBe(armors.length);
                expect(arr[2]).toContain(armor1);
                expect(arr[2]).toContain(armor2);
                expect(arr[3].length).toBe(equipments.length);
                expect(arr[3]).toContain(equipment1);
                expect(arr[3]).toContain(equipment2);
            });
        }));
        it('get Storage item from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.equipments = equipments;
            kdmDataService.weapons = weapons;
            kdmDataService.armors = armors;
            kdmDataService.resources = resources;
            kdmDataService.getStorageItem(armor2.name).then(storage => {
                expect(storage).toBe(armor2);
            });
        }));
    });
    describe('Events', () => {
        let lanternEvent1;
        let lanternEvent2;
        let lanternEvents;
        let lanternEventJSON1;
        let lanternEventJSON2;
        let lanternEventJSONs;
        let storyEvent1;
        let storyEvent2;
        let storyEvents;
        let milestoneJSON1;
        let milestoneJSON2;
        let milestoneJSON3;
        let milestoneJSONs;
        let milestone1;
        let milestone2;
        let milestones;
        let timelineJSON1;
        let timelineJSON2;
        let timelineJSON3;
        let timelineJSON4;
        let timelineJSONs;
        let timeline1;
        let timeline2;
        let timeline3;
        let timelines;
        beforeEach(() => {
            storyEvent1 = new StoryEvent('Dummy Story Event 1', 'Dummy', 1);
            storyEvent2 = new StoryEvent('Dummy Story Event 2', 'Dummy', 2);
            storyEvents = [storyEvent1, storyEvent2];
            lanternEvent1 = new LanternEvent('Dummy Lantern Event 1', 'dummy todo');
            lanternEvent1.storyEvents.push(storyEvent1);
            lanternEvent2 = new LanternEvent('Dummy Lantern Event 2', 'dummy todo');
            lanternEvent2.storyEvents.push(storyEvent1);
            lanternEvent2.storyEvents.push(storyEvent2);
            lanternEvents = [lanternEvent1, lanternEvent2];
            lanternEventJSON1 = new LanternEventJSON('Dummy Lantern Event JSON 1', 'dummy todo', [1]);
            lanternEventJSON2 = new LanternEventJSON('Dummy Lantern Event JSON 2', 'dummy todo', [1, 2]);
            lanternEventJSONs = [lanternEventJSON1, lanternEventJSON2];
            milestoneJSON1 = new MilestoneJSON('Milestone 1', 'dummy todo', [2], 1, 'dummy tag', 2, 'EQ', 'POPULATION', MilestoneType.Basic);
            milestoneJSON2 = new MilestoneJSON('Milestone 2', 'dummy todo', [1, 2], 2, 'dummy tag', 2, 'EQ', 'POPULATION', MilestoneType.Basic);
            milestoneJSON3 = new MilestoneJSON('Milestone 3', 'dummy todo', [1, 2], 3, 'dummy tag', 2, null, 'POPULATION', MilestoneType.Basic);
            milestoneJSONs = [milestoneJSON1, milestoneJSON2, milestoneJSON3];
            milestone1 = new Milestone(1, 'Milestone', 2, ComparableVisitorValue.EQ, 'POPULATION', MilestoneType.Basic);
            milestone2 = new Milestone(2, 'TAG', 1, ComparableVisitorValue.EQ, 'POPULATION', MilestoneType.Basic);
            milestones = [milestone1, milestone2];
            timelineJSON1 = new TimelineJSON(1, lanternEvent1.name);
            timelineJSON2 = new TimelineJSON(2, lanternEvent1.name);
            timelineJSON3 = new TimelineJSON(3, lanternEvent2.name);
            timelineJSON4 = new TimelineJSON(4, lanternEvent2.name);
            timelineJSONs = [timelineJSON1, timelineJSON2, timelineJSON3, timelineJSON4];
            timeline1 = new Timeline(1, lanternEvent1);
            timeline2 = new Timeline(2, lanternEvent2);
            timeline3 = new Timeline(3, lanternEvent1);
            timelines = [timeline1, timeline2, timeline3];
        });
        it('get Lantern Events', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = lanternEventJSONs;
            kdmDataService.storyEvents = storyEvents;
            kdmDataService.getLanternEvents();
            const res = httpMock.expectOne(kdmDataService.lanterneventsURL);
            res.flush(mockResponse);
            expect(kdmDataService.lanternEvents.length).toBe(lanternEvents.length);
            expect(kdmDataService.lanternEvents[0].name).toBe(lanternEventJSON1.name);
            expect(typeof kdmDataService.lanternEvents[0]).toBe(typeof lanternEvent1);
            expect(kdmDataService.lanternEvents[1].name).toBe(lanternEventJSON2.name);
            expect(typeof kdmDataService.lanternEvents[1]).toBe(typeof lanternEvent1);
        }));
        it('get Lantern Events from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.lanternEvents = lanternEvents;
            kdmDataService.getLanternEvents().then(lntrnEvents => {
                expect(lntrnEvents.length).toBe(lanternEvents.length);
                expect(lntrnEvents).toContain(lanternEvent1);
                expect(lntrnEvents).toContain(lanternEvent2);
            });
        }));
        it('get Lantern Event from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.lanternEvents = lanternEvents;
            kdmDataService.getLanternEvent(lanternEvent1.name).then(lanternEvent => {
                expect(lanternEvent).toBe(lanternEvent1);
            });
        }));
        it('get Story Events', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = storyEvents;
            kdmDataService.getStoryEvents();
            const res = httpMock.expectOne(kdmDataService.storyeventsURL);
            res.flush(mockResponse);
            expect(kdmDataService.storyEvents.length).toBe(storyEvents.length);
            expect(kdmDataService.storyEvents).toContain(storyEvent1);
            expect(kdmDataService.storyEvents).toContain(storyEvent2);
        }));
        it('get Story Events from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.storyEvents = storyEvents;
            kdmDataService.getStoryEvents().then(stryEvents => {
                expect(stryEvents.length).toBe(storyEvents.length);
                expect(stryEvents).toContain(storyEvent1);
                expect(stryEvents).toContain(storyEvent2);
            });
        }));
        it('get Story Event from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.storyEvents = storyEvents;
            kdmDataService.getStoryEvent(storyEvent1.id).then(storyEvent => {
                expect(storyEvent).toBe(storyEvent1);
            });
        }));
        it('get initial Milestones', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = milestoneJSONs;
            kdmDataService.storyEvents = storyEvents;
            kdmDataService.getInitialMilestones();
            const res = httpMock.expectOne(kdmDataService.milestonesURL);
            res.flush(mockResponse);
            expect(kdmDataService.milestones.length).toBe(milestoneJSONs.length);
            expect(typeof kdmDataService.milestones[0]).toBe(typeof milestone1);
            expect(kdmDataService.milestones[0].name).toBe(milestoneJSON1.name);
            expect(kdmDataService.milestones[0].todo).toBe(milestoneJSON1.todo);
            expect(kdmDataService.milestones[0].id).toBe(milestoneJSON1.id);
            expect(kdmDataService.milestones[0].tag).toBe(milestoneJSON1.tag);
            expect(kdmDataService.milestones[0].value).toBe(milestoneJSON1.value);
            expect(kdmDataService.milestones[0].observerTarget).toBe(milestoneJSON1.observerTarget);
            expect(kdmDataService.milestones[0].visitor).not.toBeUndefined();
            expect(kdmDataService.milestones[0].milestoneType).toBe(MilestoneType[milestoneJSON1.milestoneType]);
            expect(typeof kdmDataService.milestones[1]).toBe(typeof milestone1);
            expect(kdmDataService.milestones[1].name).toBe(milestoneJSON2.name);
            expect(kdmDataService.milestones[1].todo).toBe(milestoneJSON2.todo);
            expect(kdmDataService.milestones[1].id).toBe(milestoneJSON2.id);
            expect(kdmDataService.milestones[1].tag).toBe(milestoneJSON2.tag);
            expect(kdmDataService.milestones[1].value).toBe(milestoneJSON2.value);
            expect(kdmDataService.milestones[1].observerTarget).toBe(milestoneJSON2.observerTarget);
            expect(kdmDataService.milestones[1].visitor).not.toBeUndefined();
            expect(kdmDataService.milestones[1].milestoneType).toBe(MilestoneType[milestoneJSON2.milestoneType]);
            expect(typeof kdmDataService.milestones[2]).toBe(typeof milestone1);
            expect(kdmDataService.milestones[2].name).toBe(milestoneJSON3.name);
            expect(kdmDataService.milestones[2].todo).toBe(milestoneJSON3.todo);
            expect(kdmDataService.milestones[2].id).toBe(milestoneJSON3.id);
            expect(kdmDataService.milestones[2].tag).toBe(milestoneJSON3.tag);
            expect(kdmDataService.milestones[2].value).toBe(milestoneJSON3.value);
            expect(kdmDataService.milestones[2].observerTarget).toBe(milestoneJSON3.observerTarget);
            expect(kdmDataService.milestones[2].visitor).toBeUndefined();
            expect(kdmDataService.milestones[2].milestoneType).toBe(MilestoneType[milestoneJSON3.milestoneType]);
        }));
        it('get Initial Milestones from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.milestones = milestones;
            kdmDataService.getInitialMilestones().then(mlstns => {
                expect(mlstns.length).toBe(milestones.length);
                expect(mlstns).toContain(milestone1);
                expect(mlstns).toContain(milestone2);
            });
        }));
        it('get Milestone from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.milestones = milestones;
            kdmDataService.getMilestone(milestone2.id).then(milestone => {
                expect(milestone).toBe(milestone2);
            });
        }));
        it('get Default Timeline', fakeAsync(inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            kdmDataService.lanternEvents = lanternEvents;
            const mockResponse = timelineJSONs;
            kdmDataService.getDefaultTimeline();
            tick();
            const res = httpMock.expectOne(kdmDataService.defaulttimelineURL);
            res.flush(mockResponse);
            expect(kdmDataService.timeline.length).toBe(timelineJSONs.length);
            expect(kdmDataService.timeline[0].position).toBe(timelineJSON1.position);
            expect(kdmDataService.timeline[0].lanternEvent).toBe(lanternEvent1);
            expect(kdmDataService.timeline[1].position).toBe(timelineJSON2.position);
            expect(kdmDataService.timeline[1].lanternEvent).toBe(lanternEvent1);
            expect(kdmDataService.timeline[2].position).toBe(timelineJSON3.position);
            expect(kdmDataService.timeline[2].lanternEvent).toBe(lanternEvent2);
            expect(kdmDataService.timeline[3].position).toBe(timelineJSON4.position);
            expect(kdmDataService.timeline[3].lanternEvent).toBe(lanternEvent2);
            // TODO find other solution for discardPeriodicTasks();
            discardPeriodicTasks();
        })));
        it('get Default Timeline from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.timeline = timelines;
            kdmDataService.getDefaultTimeline();
            expect(kdmDataService.timeline.length).toBe(timelines.length);
            expect(kdmDataService.timeline).toContain(timeline1);
            expect(kdmDataService.timeline).toContain(timeline2);
            expect(kdmDataService.timeline).toContain(timeline3);
        }));
    });
    describe('Surivor', () => {
        let disorder1;
        let disorder2;
        let disorders;
        let fightingArt1;
        let fightingArt2;
        let fightingArts;
        beforeEach(() => {
            disorder1 = new Disorder('Dummy DISORDER 1', 'dummy');
            disorder2 = new Disorder('Dummy DISORDER 1', 'dummy');
            disorders = [disorder1, disorder2];
            fightingArt1 = new FightingArt('Dummy Fighting Art 1', 'dummy');
            fightingArt2 = new FightingArt('Dummy Fighting Art 2', 'dummy');
            fightingArts = [fightingArt1, fightingArt2];
        });
        it('get Disorders from http', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = disorders;
            kdmDataService.getDisorders();
            const res = httpMock.expectOne(kdmDataService.disordersURL);
            res.flush(mockResponse);
            expect(kdmDataService.disorders.length).toBe(disorders.length);
            expect(kdmDataService.disorders).toContain(disorder1);
            expect(kdmDataService.disorders).toContain(disorder2);
        }));
        it('get Disorders from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.disorders = disorders;
            kdmDataService.getDisorders().then(dsordrs => {
                expect(dsordrs.length).toBe(disorders.length);
            });
        }));
        it('get DISORDER from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.disorders = disorders;
            kdmDataService.getDisorder(disorder1.name).then(disorder => {
                expect(disorder).toBe(disorder1);
            });
        }));
        it('get Fighting Arts from http', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = fightingArts;
            kdmDataService.getFightingArts();
            const res = httpMock.expectOne(kdmDataService.fightingartsURL);
            res.flush(mockResponse);
            expect(kdmDataService.fightingArts.length).toBe(fightingArts.length);
            expect(kdmDataService.fightingArts).toContain(fightingArt1);
            expect(kdmDataService.fightingArts).toContain(fightingArt2);
        }));
        it('get Fighting Arts from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.fightingArts = fightingArts;
            kdmDataService.getFightingArts().then(fghtingrts => {
                expect(fghtingrts.length).toBe(fightingArts.length);
            });
        }));
        it('get Fighting Art from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.fightingArts = fightingArts;
            kdmDataService.getFightingArt(fightingArt2.name).then(fightingArt => {
                expect(fightingArt).toBe(fightingArt2);
            });
        }));
        it('create Survivor', inject([KDMDataService], (kdmDataService) => {
            const settlement = new Settlement('Dummy Settlement');
            let survivor = kdmDataService.createAndAddSurvivor(settlement);
            expect(survivor.id).toBe(1);
            expect(survivor.name).toBe(kdmDataService.initSurvivorName);
            expect(settlement.survivors.length).toBe(1);
            survivor = kdmDataService.createAndAddSurvivor(settlement);
            expect(survivor.id).toBe(2);
            expect(survivor.name).toBe(kdmDataService.initSurvivorName);
            expect(settlement.survivors.length).toBe(2);
        }));
    });
    describe('Others', () => {
        let glossaryEntry1;
        let glossaryEntry2;
        let glossaryEntries;
        let huntEvent1;
        let huntEvent2;
        let huntEvents;
        let brainTrauma1;
        let brainTrauma2;
        let brainTraumas;
        let severeInjuryJSON1;
        let severeInjuryJSON2;
        let severeInjuryJSON3;
        let severeInjuryJSONs;
        let severeInjury1;
        let severeInjury2;
        let severeInjury3;
        let severeInjuries;
        beforeEach(() => {
            glossaryEntry1 = new BaseModel('Dummy Glossary Entry 1', 'dummy');
            glossaryEntry2 = new BaseModel('Dummy Glossary Entry 2', 'dummy');
            glossaryEntries = [glossaryEntry1, glossaryEntry2];
            huntEvent1 = new HuntEvent('Dummy Hunt Event 1', 'dummy');
            huntEvent2 = new HuntEvent('Dummy Hunt Event 2', 'dummy');
            huntEvents = [huntEvent1, huntEvent2];
            brainTrauma1 = new DiceThrow('Dummy Brain Trauma 1', 'dummy', 2, 4);
            brainTrauma2 = new DiceThrow('Dummy Brain Trauma 2', 'dummy', 4, 4);
            brainTraumas = [brainTrauma1, brainTrauma2];
            severeInjuryJSON1 = new SevereInjuryJSON('Dummy Severe Injury 1', 'dummy', 1, 3, 'BODY');
            severeInjuryJSON2 = new SevereInjuryJSON('Dummy Severe Injury 2', 'dummy', 3, 3, 'HEAD');
            severeInjuryJSON3 = new SevereInjuryJSON('Dummy Severe Injury 3', 'dummy', 9, 0, 'BODY');
            severeInjuryJSONs = [severeInjuryJSON1, severeInjuryJSON2, severeInjuryJSON3];
            severeInjury1 = new SevereInjury('Dummy Severe Injury 1', 'dummy', 1, 3, ArmorSpace.BODY);
            severeInjury2 = new SevereInjury('Dummy Severe Injury 2', 'dummy', 5, 6, ArmorSpace.HEAD);
            severeInjury3 = new SevereInjury('Dummy Severe Injury 3', 'dummy', 5, 6, ArmorSpace.BODY);
            severeInjuries = [severeInjury1, severeInjury2, severeInjury3];
        });
        it('get Glossary Entries from http', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = glossaryEntries;
            kdmDataService.getAllGlossaryEntries();
            const res = httpMock.expectOne(kdmDataService.glossaryentriesURL);
            res.flush(mockResponse);
            expect(kdmDataService.glossaryEntries.length).toBe(glossaryEntries.length);
            expect(kdmDataService.glossaryEntries).toContain(glossaryEntry1);
            expect(kdmDataService.glossaryEntries).toContain(glossaryEntry2);
        }));
        it('get Glossary Entries from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.glossaryEntries = glossaryEntries;
            kdmDataService.getAllGlossaryEntries().then(glsrntrys => {
                expect(glsrntrys.length).toBe(glossaryEntries.length);
                expect(glsrntrys).toContain(glossaryEntry1);
                expect(glsrntrys).toContain(glossaryEntry2);
            });
        }));
        it('get Hunt Events from http', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = huntEvents;
            kdmDataService.getAllHuntEvents();
            const res = httpMock.expectOne(kdmDataService.hunteventsURL);
            res.flush(mockResponse);
            expect(kdmDataService.huntEvents.length).toBe(huntEvents.length);
            expect(kdmDataService.huntEvents).toContain(huntEvent1);
            expect(kdmDataService.huntEvents).toContain(huntEvent2);
        }));
        it('get Hunt Events from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.huntEvents = huntEvents;
            kdmDataService.getAllHuntEvents().then(hntvnts => {
                expect(hntvnts.length).toBe(huntEvents.length);
                expect(hntvnts).toContain(huntEvent1);
                expect(hntvnts).toContain(huntEvent2);
            });
        }));
        it('get Brain Traumas from http', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = brainTraumas;
            kdmDataService.getAllBrainTraumas();
            const res = httpMock.expectOne(kdmDataService.braintraumasURL);
            res.flush(mockResponse);
            expect(kdmDataService.brainTraumas.length).toBe(brainTraumas.length);
            expect(kdmDataService.brainTraumas).toContain(brainTrauma1);
            expect(kdmDataService.brainTraumas).toContain(brainTrauma2);
        }));
        it('get Brain Traumas from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.brainTraumas = brainTraumas;
            kdmDataService.getAllBrainTraumas().then(brntrms => {
                expect(brntrms.length).toBe(brainTraumas.length);
                expect(brntrms).toContain(brainTrauma1);
                expect(brntrms).toContain(brainTrauma2);
            });
        }));
        it('get Severe Injuries from http', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = severeInjuryJSONs;
            kdmDataService.getAllSevereInjuries();
            const res = httpMock.expectOne(kdmDataService.severeinjuriesURL);
            res.flush(mockResponse);
            expect(kdmDataService.severeInjuries.length).toBe(severeInjuries.length);
            expect(kdmDataService.severeInjuries[0].name).toEqual(severeInjuryJSON1.name);
            expect(kdmDataService.severeInjuries[0].description).toEqual(severeInjuryJSON1.description);
            expect(kdmDataService.severeInjuries[0].maxRoll).toBe(severeInjuryJSON1.maxRoll);
            expect(kdmDataService.severeInjuries[0].minRoll).toBe(severeInjuryJSON1.minRoll);
            expect(kdmDataService.severeInjuries[0].hitLocation).toBe(ArmorSpace[severeInjuryJSON1.hitLocation]);
            expect(kdmDataService.severeInjuries[1].name).toEqual(severeInjuryJSON2.name);
            expect(kdmDataService.severeInjuries[1].description).toEqual(severeInjuryJSON2.description);
            expect(kdmDataService.severeInjuries[1].maxRoll).toBe(severeInjuryJSON2.maxRoll);
            expect(kdmDataService.severeInjuries[1].minRoll).toBe(severeInjuryJSON2.minRoll);
            expect(kdmDataService.severeInjuries[1].hitLocation).toBe(ArmorSpace[severeInjuryJSON2.hitLocation]);
            expect(kdmDataService.severeInjuries[2].name).toEqual(severeInjuryJSON3.name);
            expect(kdmDataService.severeInjuries[2].description).toEqual(severeInjuryJSON3.description);
            expect(kdmDataService.severeInjuries[2].maxRoll).toBe(severeInjuryJSON3.maxRoll);
            expect(kdmDataService.severeInjuries[2].minRoll).toBe(severeInjuryJSON3.minRoll);
            expect(kdmDataService.severeInjuries[2].hitLocation).toBe(ArmorSpace[severeInjuryJSON3.hitLocation]);
        }));
        it('get Severe Injuries from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.severeInjuries = severeInjuries;
            kdmDataService.getAllSevereInjuries().then(svrnjrs => {
                expect(svrnjrs.length).toBe(severeInjuries.length);
                expect(svrnjrs).toContain(severeInjury1);
                expect(svrnjrs).toContain(severeInjury2);
                expect(svrnjrs).toContain(severeInjury3);
            });
        }));
        it('get Severe Injuries to Hit Location from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.severeInjuries = severeInjuries;
            kdmDataService.getSevereInjuriesToHitLocation(ArmorSpace.HEAD).then(svrnjrs => {
                expect(svrnjrs.length).toBe(severeInjuries.filter(injury => injury.hitLocation === ArmorSpace.HEAD).length);
            });
        }));
        it('check Sort By name', inject([KDMDataService], (kdmDataService) => {
            const baseModel1 = new BaseModel('Aaaa', 'dummy');
            const baseModel2 = new BaseModel('Zzzz', 'dummy');
            expect(kdmDataService.sortByName(baseModel1, baseModel2)).toBe(-1);
            expect(kdmDataService.sortByName(baseModel1, baseModel1)).toBe(0);
            expect(kdmDataService.sortByName(baseModel2, baseModel1)).toBe(1);
        }));
    });
    describe('Settlement', () => {
        let principleType1;
        let principleType2;
        let principleTypes;
        let principleJSON1;
        let principleJSON2;
        let principleJSON3;
        let principleJSONs;
        let principle1;
        let principle2;
        let principle3;
        let principle4;
        let principles;
        let settlement1;
        let settlement2;
        let settlement3;
        let settlement4;
        let settlements;
        let simpleSettlement1;
        let simpleSettlement2;
        let simpleSettlement3;
        let simpleSettlements;
        let innovationJSON1;
        let innovationJSON2;
        let innovationJSONs;
        let innovation1;
        let innovation2;
        let innovations;
        beforeEach(() => {
            principleType1 = new PrincipleType('Dummy Principle Type 1');
            principleType2 = new PrincipleType('Dummy Principle Type 2');
            principleTypes = [principleType1, principleType2];
            principleJSON1 = new PrincipleJSON('Dummy Principle 1', 'dummy', principleType1.name);
            principleJSON2 = new PrincipleJSON('Dummy Principle 2', 'dummy', principleType2.name);
            principleJSON3 = new PrincipleJSON('Dummy Principle 3', 'dummy', principleType2.name);
            principleJSONs = [principleJSON1, principleJSON2, principleJSON3];
            principle1 = new Principle('Dummy Principle 1', 'dummy', principleType1);
            principle2 = new Principle('Dummy Principle 2', 'dummy', principleType2);
            principle3 = new Principle('Dummy Principle 3', 'dummy', principleType2);
            principle4 = new Principle('Dummy Principle 4', 'dummy', null);
            principles = [principle1, principle2, principle3, principle4];
            settlement1 = new Settlement('Dummy Settlement 1');
            settlement1.id = 1;
            settlement2 = new Settlement('Dummy Settlement 2');
            settlement2.id = 2;
            settlement3 = new Settlement('Dummy Settlement 3');
            settlement3.id = 3;
            settlement4 = new Settlement('Dummy Settlement 4');
            settlement4.id = 4;
            settlements = [settlement1, settlement2, settlement3, settlement4];
            simpleSettlement1 = new SettlementSimplified(1, 'Settlement 1', 3, 3, 3, 3);
            simpleSettlement2 = new SettlementSimplified(2, 'Settlement 2', 3, 3, 3, 3);
            simpleSettlement3 = new SettlementSimplified(3, 'Settlement 3', 3, 3, 3, 3);
            simpleSettlements = [simpleSettlement1, simpleSettlement2, simpleSettlement3];
            innovationJSON1 = new InnovationJSON('Dummy Innovation 1', 'description', 'FAMILY_CONSEQUENCE', ['ART'], true);
            innovationJSON2 = new InnovationJSON('Dummy Innovation 2', 'description', 'FORBIDDEN_DANCE_CONSEQUENCE', ['EDUCATION', 'HOME'], false);
            innovationJSONs = [innovationJSON1, innovationJSON2];
            innovation1 = new Innovation('Dummy Innovation 1', 'description', InnovationTag.AMMONIA_CONSEQUENCE, [InnovationTag.ART], true);
            innovation2 = new Innovation('Dummy Innovation 2', 'description', InnovationTag.SCULPURE_CONSEQUENCE, [InnovationTag.EDUCATION, InnovationTag.FAITH], false);
            innovations = [innovation1, innovation2];
        });
        it('get Principles from http', fakeAsync(inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = principleJSONs;
            kdmDataService.principleTypes = principleTypes;
            kdmDataService.getPrinciples();
            tick();
            const res = httpMock.expectOne(kdmDataService.principlesURL);
            res.flush(mockResponse);
            expect(kdmDataService.principles.length).toBe(principleJSONs.length);
            expect(kdmDataService.principles[0].name).toEqual(principleJSON1.name);
            expect(kdmDataService.principles[0].description).toEqual(principleJSON1.description);
            expect(kdmDataService.principles[0].type).toBe(principleTypes.find(principle => principle.name === principleJSON1.type));
            expect(typeof kdmDataService.principles[0]).toBe(typeof principle1);
            expect(kdmDataService.principles[1].name).toEqual(principleJSON2.name);
            expect(kdmDataService.principles[1].description).toEqual(principleJSON2.description);
            expect(kdmDataService.principles[1].type).toBe(principleTypes.find(principle => principle.name === principleJSON2.type));
            expect(typeof kdmDataService.principles[1]).toBe(typeof principle1);
            expect(kdmDataService.principles[2].name).toEqual(principleJSON3.name);
            expect(kdmDataService.principles[2].description).toEqual(principleJSON3.description);
            expect(kdmDataService.principles[2].type).toBe(principleTypes.find(principle => principle.name === principleJSON3.type));
            expect(typeof kdmDataService.principles[2]).toBe(typeof principle1);
            // TODO find other solution for discardPeriodicTasks();
            discardPeriodicTasks();
        })));
        it('get Principles from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.principles = principles;
            kdmDataService.getPrinciples().then(prncpls => {
                expect(prncpls.length).toBe(principles.length);
                expect(prncpls).toContain(principle1);
                expect(prncpls).toContain(principle2);
                expect(prncpls).toContain(principle3);
                expect(prncpls).toContain(principle4);
            });
        }));
        it('get Principle from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.principles = principles;
            kdmDataService.getPrinciple(principle2.name).then(principle => {
                expect(principle).toBe(principle2);
            });
        }));
        it('get Principles with type from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.principles = principles;
            kdmDataService.getPrinciplesWithType(principleType1).then(prncpls => {
                expect(prncpls.length).toBe(principles.filter(principle => principle.type === principleType1).length);
            });
        }));
        it('get Principle Types from http', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = principleTypes;
            kdmDataService.getPrincipleTypes();
            const res = httpMock.expectOne(kdmDataService.principletypesURL);
            res.flush(mockResponse);
            expect(kdmDataService.principleTypes.length).toBe(principleTypes.length);
            expect(kdmDataService.principleTypes).toContain(principleType1);
            expect(kdmDataService.principleTypes).toContain(principleType2);
        }));
        it('get Principle Types from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.principleTypes = principleTypes;
            kdmDataService.getPrincipleTypes().then(prncpltps => {
                expect(prncpltps.length).toBe(principleTypes.length);
                expect(prncpltps).toContain(principleType1);
                expect(prncpltps).toContain(principleType2);
            });
        }));
        it('get settlements', fakeAsync(inject([KDMDataService], (kdmDataService) => {
            const spy = spyOn(kdmDBServiceMock, 'getSettlements').and.callThrough()
                .and.returnValue(Promise.resolve([simpleSettlements, undefined]));
            kdmDataService.storyEvents = [new StoryEvent('Dummy Story Event', 'dummy', 1)];
            kdmDataService.lanternEvents = [new LanternEvent()];
            kdmDataService.milestones = [new Milestone(1, 'Milestone', 2, ComparableVisitorValue.EQ, 'POPULATION', MilestoneType.Basic)];
            kdmDataService.getSettlements();
            tick();
            expect(kdmDataService.settlements.length).toBe(simpleSettlements.length);
            expect(spy).toHaveBeenCalled();
            // TODO find other solution for discardPeriodicTasks();
            discardPeriodicTasks();
        })));
        it('get settlements from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.settlements = settlements;
            kdmDataService.getSettlements();
            expect(kdmDataService.settlements.length).toBe(settlements.length);
            expect(kdmDataService.settlements).toContain(settlement2);
            expect(kdmDataService.settlements).toContain(settlement1);
            expect(kdmDataService.settlements).toContain(settlement3);
            expect(kdmDataService.settlements).toContain(settlement4);
        }));
        it('get settlement from cache', inject([KDMDataService], (kdmDataService) => {
            spyOn(kdmDBServiceMock, 'getSettlementById').and.callThrough()
                .and.returnValue(Promise.resolve(simpleSettlement2));
            kdmDataService.getSettlement(2).then(settlement => {
                expect(settlement.id).toBe(simpleSettlement2.id, 'the id is not set correctly');
                expect(settlement.name).toBe(simpleSettlement2.name, 'the name is not set correctly');
                expect(settlement.survivalLimit).toBe(simpleSettlement2.survivalLimit, 'the survival limit is not set correctly');
                expect(settlement.population).toBe(simpleSettlement2.population, 'the population is not set correctly');
                expect(settlement.deathcount).toBe(simpleSettlement2.deathcount, 'the deathcount is not set correctly');
                expect(settlement.settlementLost).toBe(simpleSettlement2.settlementLost, 'the settlement lost is not set correctly');
            });
        }));
        it('remove settlement', inject([KDMDataService], (kdmDataService) => {
            const spy = spyOn(kdmDBServiceMock, 'removeSettlement').and.returnValue(true);
            const length = settlements.length;
            kdmDataService.settlements = settlements;
            kdmDataService.removeSettlement(settlement2);
            expect(kdmDataService.settlements.length).toBe(length - 1);
            expect(kdmDataService.settlements).not.toContain(settlement2);
            expect(kdmDataService.settlements).toContain(settlement1);
            expect(kdmDataService.settlements).toContain(settlement3);
            expect(kdmDataService.settlements).toContain(settlement4);
            expect(spy).toHaveBeenCalledWith(settlement2.id);
        }));
        it('add settlement', fakeAsync(inject([KDMDataService], (kdmDataService) => {
            const spy = spyOn(kdmDBServiceMock, 'saveSettlement').and.returnValue(true);
            kdmDataService.storyEvents = [new StoryEvent('Dummy Story Event', 'dummy', 1)];
            kdmDataService.lanternEvents = [new LanternEvent()];
            kdmDataService.milestones = [new Milestone(1, 'Milestone', 2, ComparableVisitorValue.EQ, 'POPULATION', MilestoneType.Basic)];
            kdmDataService.addSettlement(settlement1);
            tick();
            expect(kdmDataService.settlements.length).toBe(1);
            expect(kdmDataService.settlements).toContain(settlement1);
            expect(settlement1.id).toBe(1);
            expect(spy).toHaveBeenCalledWith(settlement1);
            kdmDataService.addSettlement(settlement2);
            tick();
            expect(kdmDataService.settlements.length).toBe(2);
            expect(kdmDataService.settlements).toContain(settlement1);
            expect(kdmDataService.settlements).toContain(settlement2);
            expect(settlement2.id).toBe(2);
            expect(spy).toHaveBeenCalledWith(settlement2);
            kdmDataService.addSettlement(settlement3);
            tick();
            expect(kdmDataService.settlements.length).toBe(3);
            expect(kdmDataService.settlements).toContain(settlement1);
            expect(kdmDataService.settlements).toContain(settlement2);
            expect(kdmDataService.settlements).toContain(settlement3);
            expect(settlement3.id).toBe(3);
            // TODO find other solution for discardPeriodicTasks();
            discardPeriodicTasks();
        })));
        it('get Innovations from http', inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = innovationJSONs;
            kdmDataService.getInnovations();
            const res = httpMock.expectOne(kdmDataService.innovationsURL);
            res.flush(mockResponse);
            expect(kdmDataService.innovations.length).toBe(innovationJSONs.length);
            expect(kdmDataService.innovations[0].name).toBe(innovationJSON1.name);
            expect(kdmDataService.innovations[0].description).toBe(innovationJSON1.description);
            expect(kdmDataService.innovations[0].isBase).toBe(innovationJSON1.isBase);
            expect(kdmDataService.innovations[0].consequence).toBe(InnovationTag[innovationJSON1.consequence]);
            expect(kdmDataService.innovations[0].tags).toContain(InnovationTag[innovationJSON1.tags[0]]);
            expect(kdmDataService.innovations[1].name).toBe(innovationJSON2.name);
            expect(kdmDataService.innovations[1].description).toBe(innovationJSON2.description);
            expect(kdmDataService.innovations[1].isBase).toBe(innovationJSON2.isBase);
            expect(kdmDataService.innovations[1].consequence).toBe(InnovationTag[innovationJSON2.consequence]);
            expect(kdmDataService.innovations[1].tags).toContain(InnovationTag[innovationJSON2.tags[0]]);
            expect(kdmDataService.innovations[1].tags).toContain(InnovationTag[innovationJSON2.tags[1]]);
        }));
        it('get Innovations from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.innovations = innovations;
            kdmDataService.getInnovations().then(novtns => {
                expect(novtns.length).toBe(innovations.length);
                expect(novtns).toContain(innovation1);
                expect(novtns).toContain(innovation2);
            });
        }));
        it('get Innovation from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.innovations = innovations;
            kdmDataService.getInnovation(innovation2.name).then(innovation => {
                expect(innovation).toBe(innovation2);
            });
        }));
        it('get Innovation that are not added but available from cache, empty array', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.innovations = innovations;
            kdmDataService.getInnovationsThatAreNotAddedButAvailable([]).then(novations => {
                expect(novations.length).toBe(1);
                expect(novations).toContain(innovation1);
            });
        }));
        it('get Innovation that are not added but available from cache, base innovation', inject([KDMDataService], (kdmDataService) => {
            const innovation3 = new Innovation('Dummy Innovation 3', 'description', InnovationTag.AMMONIA_CONSEQUENCE, [InnovationTag.HOME, InnovationTag.LANGUAGE_CONSEQUENCE], false);
            const innovation4 = new Innovation('Dummy Innovation 4', 'description', InnovationTag.SYMPOSIUM_CONSEQUENCE, [InnovationTag.SCIENCE, InnovationTag.LANGUAGE_CONSEQUENCE], false);
            const innovation5 = new Innovation('Dummy Innovation 5', 'description', InnovationTag.LANGUAGE_CONSEQUENCE, [InnovationTag.STARTING_INNOVATION], true);
            innovations.push(innovation3);
            innovations.push(innovation4);
            innovations.push(innovation5);
            kdmDataService.innovations = innovations;
            kdmDataService.getInnovationsThatAreNotAddedButAvailable([innovation5]).then(novations => {
                expect(novations).toContain(innovation3);
                expect(novations).toContain(innovation4);
                expect(novations.length).toBe(2);
            });
        }));
    });
    describe('Location', () => {
        let locationJSONInnovation;
        let locationJSONStorageTag;
        let locationJSONResource;
        let locationJSONDefault;
        let locationJSONs;
        let equipment1;
        let equipment2;
        let equipments;
        let location1;
        let location2;
        let locations;
        let innovation;
        let resource;
        beforeEach(() => {
            locationJSONInnovation = new LocationJSON('Lantern Hort', 'dummy', [new ManufacturingObject('Bone Dagger', [new BuildCost('Ammonia', 1, 'innovation')])], true);
            locationJSONStorageTag = new LocationJSON('Bone Smith', 'dummy', [new ManufacturingObject('Bone Dagger', [new BuildCost('BONE', 1, 'storageTag')]),
                new ManufacturingObject('Skull Helm', [new BuildCost('SKULL', 1, 'storageTag', 2),
                    new BuildCost('BONE', 2, 'storageTag', 1)])], true);
            locationJSONResource = new LocationJSON('Lantern Hort', 'dummy', [new ManufacturingObject('Bone Dagger', [new BuildCost('Dummy Resource', 1, 'resource'),
                    new BuildCost('Dummy Resource', 1, 'resource', 2)])], true);
            locationJSONDefault = new LocationJSON('Lantern Hort', 'dummy', [new ManufacturingObject('Bone Dagger', [new BuildCost('Ammonia', 1, undefined)])], true);
            locationJSONs = [locationJSONInnovation, locationJSONStorageTag, locationJSONResource, locationJSONDefault];
            location1 = new Location('Dummy Location 1', 'dummy', new Map(), false);
            location2 = new Location('Dummy Location 2', 'dummy', new Map(), false);
            locations = [location1, location2];
            equipment1 = new Equipment('Bone Dagger', 'dummy', 4, [StorageTag.BONE], new Map());
            equipment2 = new Equipment('Skull Helm', 'dummy', 4, [StorageTag.BONE], new Map());
            equipments = [equipment1, equipment2];
            innovation = new Innovation('Ammonia', 'dummy', InnovationTag.AMMONIA_CONSEQUENCE, [InnovationTag.LANGUAGE_CONSEQUENCE], false);
            resource = new Resource('Dummy Resource', 'dummy', 1, [StorageTag.ITEM], ResourceType.BASIC, 1);
        });
        it('get Settlement Locations from http', fakeAsync(inject([KDMDataService, HttpClient, HttpTestingController], (kdmDataService, http, httpMock) => {
            const mockResponse = locationJSONs;
            kdmDataService.equipments = equipments;
            kdmDataService.innovations = [innovation];
            kdmDataService.resources = [resource];
            kdmDataService.weapons = [new Weapon('Bone Dagger', 'dummy', 4, [StorageTag.BONE], new Map(), 1, 1, 1)];
            kdmDataService.armors = [new Armor('Bone Dagger', 'dummy', 4, [StorageTag.BONE], new Map(), 1, ArmorSpace.BODY)];
            kdmDataService.getSettlementLocations();
            const res = httpMock.expectOne(kdmDataService.locationsURL);
            res.flush(mockResponse);
            tick();
            expect(kdmDataService.locations.length).toBe(locationJSONs.length);
            expect(kdmDataService.locations[0].name).toBe(locationJSONInnovation.name);
            expect(kdmDataService.locations[0].description).toBe(locationJSONInnovation.description);
            expect(kdmDataService.locations[0].isStartLocation).toBe(locationJSONInnovation.isStartLocation);
            expect(kdmDataService.locations[0].manufacturingObjects.size)
                .toBe(locationJSONInnovation.manufacturingObjects.length);
            expect(kdmDataService.locations[0].manufacturingObjects.has(equipment1)).toBeTruthy();
            expect(kdmDataService.locations[0].manufacturingObjects.get(equipment1).size)
                .toBe(locationJSONInnovation.manufacturingObjects[0].buildCosts.length);
            expect(kdmDataService.locations[0].manufacturingObjects.get(equipment1).get(innovation)).toBeTruthy();
            expect(kdmDataService.locations[0].manufacturingObjects.get(equipment1).get(innovation)[0])
                .toBe(locationJSONInnovation.manufacturingObjects[0].buildCosts[0].amount);
            expect(kdmDataService.locations[1].name).toBe(locationJSONStorageTag.name);
            expect(kdmDataService.locations[1].description).toBe(locationJSONStorageTag.description);
            expect(kdmDataService.locations[1].isStartLocation).toBe(locationJSONStorageTag.isStartLocation);
            expect(kdmDataService.locations[1].manufacturingObjects.size)
                .toBe(locationJSONStorageTag.manufacturingObjects.length);
            expect(kdmDataService.locations[1].manufacturingObjects.has(equipment1)).toBeTruthy();
            expect(kdmDataService.locations[1].manufacturingObjects.get(equipment1).size)
                .toBe(locationJSONStorageTag.manufacturingObjects[0].buildCosts.length);
            expect(kdmDataService.locations[1].manufacturingObjects.get(equipment1).get(StorageTag.BONE)).toBeTruthy();
            expect(kdmDataService.locations[1].manufacturingObjects.get(equipment1).get(StorageTag.BONE)[0])
                .toBe(locationJSONStorageTag.manufacturingObjects[0].buildCosts[0].amount);
            expect(kdmDataService.locations[2].name).toBe(locationJSONResource.name);
            expect(kdmDataService.locations[2].description).toBe(locationJSONResource.description);
            expect(kdmDataService.locations[2].isStartLocation).toBe(locationJSONResource.isStartLocation);
            expect(kdmDataService.locations[2].manufacturingObjects.size)
                .toBe(locationJSONResource.manufacturingObjects.length);
            // TODO find other solution for discardPeriodicTasks();
            discardPeriodicTasks();
        })));
        it('get Settlement Locations from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.locations = locations;
            kdmDataService.getSettlementLocations().then(lctns => {
                expect(lctns.length).toBe(locations.length);
                expect(lctns).toContain(location1);
                expect(lctns).toContain(location2);
            });
        }));
        it('get Location from cache', inject([KDMDataService], (kdmDataService) => {
            kdmDataService.locations = locations;
            kdmDataService.getLocation(location1.name).then(location => {
                expect(location).toBe(location1);
            });
        }));
    });
    describe('Desimplify Settlement', () => {
        let storyEvent = new StoryEvent('Dummy Story Event 1', 'Dummy', 1);
        let lanternEvent1 = new LanternEvent('Dummy Lantern Event 1', 'dummy todo');
        let lanternEvent2 = new LanternEvent('Dummy Lantern Event 2', 'dummy todo');
        let location = new Location('Dummy Location 1', 'dummy', new Map(), false);
        let monster = new Monster(1, 'Monster Dummy', false);
        let nemesisMonster = new Monster(2, 'Monster Dummy', true);
        let innovation = new Innovation('Dummy Innovation 1', 'description', InnovationTag.AMMONIA_CONSEQUENCE, [InnovationTag.ART], true);
        let principleType = new PrincipleType('Dummy Principle Type 1');
        let principle = new Principle('Dummy Principle 1', 'dummy', principleType);
        let milestone = new Milestone(1, 'Milestone', 2, ComparableVisitorValue.EQ, 'POPULATION', MilestoneType.Basic);
        let resource = new Resource('Dummy Resource 1', 'dummy', 1, [StorageTag.ITEM], ResourceType.BASIC, 1);
        let weapon = new Weapon('Dummy Weapon 1', 'Dummy', 1, [StorageTag.ITEM], undefined, 1, 1, 1);
        let armor = new Armor('Dummy Armor 1', 'Dummy', 1, [StorageTag.ITEM], undefined, 1, ArmorSpace.HEAD);
        let equipment = new Equipment('Dummy Equipment 1', 'Dummy', 1, [StorageTag.ITEM], undefined);
        let map = new Map();
        beforeEach(() => {
            map.set(Affinity.BLUE, [Direction.DOWN]);
            weapon.affinities = map;
            armor.affinities = map;
            equipment.affinities = map;
        });
        it('Desimplify a Settlement with all elements', fakeAsync(inject([KDMDataService], (kdmDataService) => {
            const settlementTimelineDB = new SettlementTimelineDB(1, [1, lanternEvent1.name], true);
            const settlementTimelineDB2 = new SettlementTimelineDB(1, [2, lanternEvent2.name], false);
            const huntableMonsterDB = new HuntableMonsterDB(1, 1, true, true, true, false);
            const huntedMonsterDB = new HuntedMonsterDB(1, 1, 2, [[resource.name, 2]]);
            const survivorSimplified = new SurvivorSimplified(1, 1, 'Hugo', true, true, 17, 16, true, false, true, false, 1, 2, 3, 4, 5, 6, 7, false, 8, false, 9, true, false, 10, false, false, 11, false, true, 12, true, false, false, true, true, 'Stand Up', 13, 14, 'Sword', 15, '', '');
            const settlementMilestoneDB = new SettlementMilestoneDB(1, 1, false);
            const simplifiedSettlement = new SettlementSimplified(1, 'Simple Settlement', 2, 3, 4, 5);
            simplifiedSettlement.timeline = [settlementTimelineDB, settlementTimelineDB2];
            simplifiedSettlement.huntedMonsters = [huntedMonsterDB];
            simplifiedSettlement.huntableMonsters = [huntableMonsterDB];
            simplifiedSettlement.survivors = [survivorSimplified];
            simplifiedSettlement.milestones = [settlementMilestoneDB];
            simplifiedSettlement.locationNames = [location.name];
            simplifiedSettlement.storagesNameAmount = [[weapon.name, 4], [armor.name, 2]];
            simplifiedSettlement.principleNames = [principle.name];
            simplifiedSettlement.innovationNames = [innovation.name];
            const spy = spyOn(kdmDBServiceMock, 'getSettlementById')
                .and.callThrough().and.returnValue(Promise.resolve(simplifiedSettlement));
            kdmDataService.storyEvents = [storyEvent];
            kdmDataService.locations = [location];
            kdmDataService.lanternEvents = [lanternEvent1, lanternEvent2];
            kdmDataService.monsters = [monster, nemesisMonster];
            kdmDataService.innovations = [innovation];
            kdmDataService.principles = [principle];
            kdmDataService.principleTypes = [principleType];
            kdmDataService.milestones = [milestone];
            kdmDataService.resources = [resource];
            kdmDataService.weapons = [weapon];
            kdmDataService.armors = [armor];
            kdmDataService.equipments = [equipment];
            kdmDataService.getSettlement(simplifiedSettlement.id).then(settlement => {
                tick();
                expect(spy).toHaveBeenCalledWith(simplifiedSettlement.id);
                expect(settlement.id).toBe(simplifiedSettlement.id);
                expect(settlement.name).toBe(simplifiedSettlement.name);
                expect(settlement.survivalLimit).toBe(simplifiedSettlement.survivalLimit);
                expect(settlement.population).toBe(simplifiedSettlement.population);
                expect(settlement.settlementLost).toBe(simplifiedSettlement.settlementLost);
                expect(settlement.deathcount).toBe(simplifiedSettlement.deathcount);
                expect(settlement.milestones.length).toBe(simplifiedSettlement.milestones.length);
                expect(settlement.principles.length).toBe(simplifiedSettlement.principleNames.length);
                expect(settlement.innovations.length).toBe(simplifiedSettlement.innovationNames.length);
                expect(settlement.locations.length).toBe(simplifiedSettlement.locationNames.length);
                expect(settlement.huntedMonsters.length).toBe(simplifiedSettlement.huntedMonsters.length);
                expect(settlement.huntableMonsters.length).toBe(simplifiedSettlement.huntableMonsters.length);
                expect(settlement.timeline.length).toBe(simplifiedSettlement.timeline.length);
            });
            // TODO find other solution for discardPeriodicTasks();
            discardPeriodicTasks();
        })));
    });
});
//# sourceMappingURL=kdm-data.service.spec.js.map