import { KDMDataService } from './kdm_data.service';
import { KDMDBServiceMock } from '../mock/mocks';
import { inject, TestBed } from '@angular/core/testing';
import { KDMDBService } from './kdm_db.service';
import { Monster } from '../model/monster';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../model/resource';
import { Weapon } from '../model/weapon';
import { Armor } from '../model/armor';
import { Equipment } from '../model/equipment';
import { Storage } from '../model/storage';

describe('KDM Data Service', () => {

  let kdmDBServiceMock: KDMDBServiceMock;

  beforeEach(() => {
    kdmDBServiceMock = new KDMDBServiceMock();
    TestBed.configureTestingModule({
      declarations: [],
      providers: [KDMDataService,
        {provide: KDMDBService, useValue: kdmDBServiceMock},
      ],
      imports: [HttpClientTestingModule],
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('Monsters', () => {
    let monster1: Monster;
    let monster2: Monster;
    let monster3: Monster;
    let monster4: Monster;
    let monster5: Monster;
    let monsters: Monster[];

    beforeEach(() => {
      monster1 = new Monster();
      monster1.id = 1;
      monster1.isNemesis = false;
      monster1.name = 'Monster Dummy';
      monster2 = new Monster();
      monster2.id = 2;
      monster2.isNemesis = false;
      monster2.name = 'Monster Dummy 2';
      monster3 = new Monster();
      monster3.id = 3;
      monster3.isNemesis = false;
      monster3.name = 'Monster Dummy 3';
      monster4 = new Monster();
      monster4.id = 4;
      monster4.isNemesis = true;
      monster4.name = 'Monster Nemesis Dummy';
      monster5 = new Monster();
      monster5.id = 5;
      monster5.isNemesis = true;
      monster5.name = 'Monster Nemesis Dummy 2';
      monsters = [monster1, monster2, monster3, monster4, monster5];
    });

    it('get Monsters from http', inject([KDMDataService, HttpClient, HttpTestingController],
      (kdmDataService: KDMDataService, http: HttpClient, httpMock: HttpTestingController) => {
        const mockResponse = monsters;
        kdmDataService.getMonsters();
        const res = httpMock.expectOne(kdmDataService.monstersURL);
        res.flush(mockResponse);
        expect(kdmDataService.monsters.length).toBe(monsters.length);
      }));

    it('get Monsters from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.monsters = monsters;
        kdmDataService.getMonsters().then(mnstrs => {
          expect(mnstrs.length).toBe(monsters.length);
        });
      }));

    it('get Nemesis Monsters from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.monsters = monsters;
        kdmDataService.getDefaultInitialHuntableNemesisMonsters().then(mnstrs => {
          expect(mnstrs.length).toBe(monsters.filter(monster => monster.isNemesis).length);
        });
      }));

    it('get Quarry Monsters from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.monsters = monsters;
        kdmDataService.getDefaultInitialHuntableQuarries().then(mnstrs => {
          expect(mnstrs.length).toBe(monsters.filter(monster => !monster.isNemesis).length);
        });
      }));

    it('get Monsters by id', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.monsters = monsters;
        kdmDataService.getMonster(3).then(monster => {
          expect(monster).toBe(monster3);
        });
      }));
  });

  describe('Items/Resources', () => {
    let resource1: Resource;
    let resource2: Resource;
    let resources: Resource[];
    let weapon1: Weapon;
    let weapon2: Weapon;
    let weapons: Weapon[];
    let armor1: Armor;
    let armor2: Armor;
    let armors: Armor[];
    let equipment1: Equipment;
    let equipment2: Equipment;
    let equipments: Equipment[];

    beforeEach(() => {
      resource1 = new Resource('Dummy Resource', 'dummy');
      resource2 = new Resource('Dummy Resource 2', 'dummy');
      resources = [resource1, resource2];
      weapon1 = new Weapon('Dummy Weapon', 'Dummy');
      weapon2 = new Weapon('Dummy Weapon 2', 'Dummy');
      weapons = [weapon1, weapon2];
      armor1 = new Armor('Dummy Armor', 'Dummy');
      armor2 = new Armor('Dummy Armor 2', 'Dummy');
      armors = [armor1, armor2];
      equipment1 = new Equipment('Dummy Equipment', 'Dummy');
      equipment2 = new Equipment('Dummy Equipment 2', 'Dummy');
      equipments = [equipment1, equipment2];
    });

    it('get Resources', inject([KDMDataService, HttpClient, HttpTestingController],
      (kdmDataService: KDMDataService, http: HttpClient, httpMock: HttpTestingController) => {
        const mockResponse = resources;
        kdmDataService.getResources();
        const res = httpMock.expectOne(kdmDataService.resourcesURL);
        res.flush(mockResponse);
        expect(kdmDataService.resources.length).toBe(resources.length);
        expect(kdmDataService.resources).toContain(resource1);
        expect(kdmDataService.resources).toContain(resource2);
      }));

    it('get Resources from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.resources = resources;
        kdmDataService.getResources().then(rsrces => {
          expect(rsrces.length).toBe(resources.length);
          expect(rsrces).toContain(resource1);
          expect(rsrces).toContain(resource2);
        });
      }));

    it('get Resource by name', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.resources = resources;
        kdmDataService.getResourceByName(resource2.name).then(resource => {
          expect(resource).toBe(resource2);
        });
      }));

    it('get Weapons', inject([KDMDataService, HttpClient, HttpTestingController],
      (kdmDataService: KDMDataService, http: HttpClient, httpMock: HttpTestingController) => {
        const mockResponse = weapons;
        kdmDataService.getWeapons();
        const res = httpMock.expectOne(kdmDataService.weaponsURL);
        res.flush(mockResponse);
        expect(kdmDataService.weapons.length).toBe(weapons.length);
        expect(kdmDataService.weapons).toContain(weapon1);
        expect(kdmDataService.weapons).toContain(weapon2);
      }));

    it('get Weapons from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.weapons = weapons;
        kdmDataService.getWeapons().then(wpns => {
          expect(wpns.length).toBe(weapons.length);
          expect(wpns).toContain(weapon1);
          expect(wpns).toContain(weapon2);
        });
      }));

    it('get Armors', inject([KDMDataService, HttpClient, HttpTestingController],
      (kdmDataService: KDMDataService, http: HttpClient, httpMock: HttpTestingController) => {
        const mockResponse = armors;
        kdmDataService.getArmors();
        const res = httpMock.expectOne(kdmDataService.armorsURL);
        res.flush(mockResponse);
        expect(kdmDataService.armors.length).toBe(armors.length);
        expect(kdmDataService.armors).toContain(armor1);
        expect(kdmDataService.armors).toContain(armor2);
      }));

    it('get Armors from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.armors = armors;
        kdmDataService.getArmors().then(armrs => {
          expect(armrs.length).toBe(armors.length);
          expect(armrs).toContain(armor1);
          expect(armrs).toContain(armor2);
        });
      }));

    it('get Equipments', inject([KDMDataService, HttpClient, HttpTestingController],
      (kdmDataService: KDMDataService, http: HttpClient, httpMock: HttpTestingController) => {
        const mockResponse = equipments;
        kdmDataService.getEquipments();
        const res = httpMock.expectOne(kdmDataService.equipmentsURL);
        res.flush(mockResponse);
        expect(kdmDataService.equipments.length).toBe(equipments.length);
        expect(kdmDataService.equipments).toContain(equipment1);
        expect(kdmDataService.equipments).toContain(equipment2);
      }));

    it('get Equipments from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.equipments = equipments;
        kdmDataService.getEquipments().then(eqpmnts => {
          expect(eqpmnts.length).toBe(equipments.length);
          expect(eqpmnts).toContain(equipment1);
          expect(eqpmnts).toContain(equipment2);
        });
      }));

    it('get all existing Equipment items from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.equipments = equipments;
        kdmDataService.weapons = weapons;
        kdmDataService.armors = armors;
        kdmDataService.getAllExistingEquipmentItems().then((arr: [Weapon[], Armor[], Equipment[]]) => {
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

    it('get Equipment from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.equipments = equipments;
        kdmDataService.weapons = weapons;
        kdmDataService.armors = armors;
        kdmDataService.getEquipment(weapon2.name).then(item => {
          expect(item).toBe(weapon2);
        });
      }));

    it('get all existing Storage items from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.equipments = equipments;
        kdmDataService.weapons = weapons;
        kdmDataService.armors = armors;
        kdmDataService.resources = resources;
        kdmDataService.getAllExistingStorageItems().then((arr: [Storage[]]) => {
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

    it('get Storage item from cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.equipments = equipments;
        kdmDataService.weapons = weapons;
        kdmDataService.armors = armors;
        kdmDataService.resources = resources;
        kdmDataService.getStorageItem(armor2.name).then(storage => {
          expect(storage).toBe(armor2);
        });
      }));

  });

});
