import { KDMDataService } from './kdm_data.service';
import { KDMDBServiceMock } from '../mock/mocks';
import { inject, TestBed } from '@angular/core/testing';
import { KDMDBService } from './kdm_db.service';
import { Monster } from '../model/monster';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../model/resource';

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
      monster1.isNemesis = false;
      monster1.name = 'Monster Dummy';
      monster2 = new Monster();
      monster1.isNemesis = false;
      monster1.name = 'Monster Dummy 2';
      monster3 = new Monster();
      monster1.isNemesis = false;
      monster1.name = 'Monster Dummy 3';
      monster4 = new Monster();
      monster1.isNemesis = true;
      monster1.name = 'Monster Nemesis Dummy';
      monster5 = new Monster();
      monster1.isNemesis = true;
      monster1.name = 'Monster Nemesis Dummy 2';
      monsters = [monster1, monster2, monster3, monster4, monster5];
    });

    it('get Monsters from http', inject([KDMDataService, HttpClient, HttpTestingController],
      (kdmDataService: KDMDataService, http: HttpClient, httpMock: HttpTestingController) => {
        const mockResponse = monsters;
        kdmDataService.getMonsters();
        const res = httpMock.expectOne('assets/data/monsters.json');
        res.flush(mockResponse);
        expect(kdmDataService.monsters.length).toBe(monsters.length);
      }));

    it('get Monsters from local cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.monsters = monsters;
        kdmDataService.getMonsters().then(mnstrs => {
          expect(mnstrs.length).toBe(monsters.length);
        });
      }));

    it('get Nemesis Monsters from local cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.monsters = monsters;
        kdmDataService.getDefaultInitialHuntableNemesisMonsters().then(mnstrs => {
          expect(mnstrs.length).toBe(monsters.filter(monster => monster.isNemesis).length);
        });
      }));

    it('get Quarry Monsters from local cache', inject([KDMDataService],
      (kdmDataService: KDMDataService) => {
        kdmDataService.monsters = monsters;
        kdmDataService.getDefaultInitialHuntableQuarries().then(mnstrs => {
          expect(mnstrs.length).toBe(monsters.filter(monster => !monster.isNemesis).length);
        });
      }));
  });

  describe('Items/Resources', () => {
    let resource1: Resource;
    let resource2: Resource;
    let resources: Resource[];

    beforeEach(() => {
      resource1 = new Resource('Dummy Resource', 'dummy');
      resource2 = new Resource('Dummy Resource 2', 'dummy');
      resources = [resource1, resource2];
    });

    it('get Resources', inject([KDMDataService, HttpClient, HttpTestingController],
      (kdmDataService: KDMDataService, http: HttpClient, httpMock: HttpTestingController) => {
        const mockResponse = resources;
        kdmDataService.getResources();
        const res = httpMock.expectOne('assets/data/resources.json');
        res.flush(mockResponse);
        expect(kdmDataService.resources.length).toBe(resources.length);
      }));
  });

});
