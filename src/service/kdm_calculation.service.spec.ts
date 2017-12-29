import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { KDMCalculationService } from './kdm_calculation.service';
import { KDMDataServiceMock, PlatformMock, StorageMock } from '../mock/mocks';
import { Platform } from 'ionic-angular';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { Monster, MonsterLevelResources, MonsterResourceAmount } from '../model/monster';
import { HuntedMonster } from '../model/linking/hunted_monster';
import { Settlement } from '../model/settlement';
import { Resource, ResourceType } from '../model/resource';
import { KDMDataService } from './kdm_data.service';
import { StorageTag } from '../model/storage';

describe('Service: Calculation', () => {

  let kdmDataServiceMock: KDMDataServiceMock;
  let resources: Resource[];
  let basicResource1;
  let basicResource2;
  let whiteLionResource1;

  beforeEach(() => {
    kdmDataServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        KDMCalculationService,
        {provide: KDMDataService, useValue: kdmDataServiceMock},
        {provide: Storage, useClass: StorageMock},
        {provide: Platform, useClass: PlatformMock},
      ],
    });
    basicResource1 = new Resource('Resource 1', 'first');
    basicResource1.type = ResourceType.Basic;
    basicResource1.existingCards = 2;
    basicResource1.tags = [StorageTag.armor];
    basicResource2 = new Resource('Resource 2', 'second');
    basicResource2.type = ResourceType.Basic;
    basicResource2.existingCards = 1;
    basicResource2.tags = [StorageTag.fur, StorageTag.hide];
    whiteLionResource1 = new Resource('Resource 3', 'third');
    whiteLionResource1.type = ResourceType.WhiteLion;
    whiteLionResource1.existingCards = 4;
    whiteLionResource1.tags = [StorageTag.katar, StorageTag.melee];

    resources = [];
    resources.push(basicResource1);
    resources.push(basicResource2);
    resources.push(whiteLionResource1);
  });

  it('addResourcesFromKilledMonster',
    fakeAsync(inject([KDMCalculationService], (kdmCalculationService: KDMCalculationService) => {
      spyOn(kdmDataServiceMock, 'getResources').and.returnValue(new Promise(resolve => resolve(resources)));

      const settlement: Settlement = new Settlement('Dummy Settlement');
      const resource: Resource = new Resource('Dummy Resource', 'dummy');
      resource.type = ResourceType.Basic;
      const originalMonster: Monster = new Monster();
      originalMonster.name = 'White Lion';

      const monsterLevelResource = new MonsterLevelResources();
      monsterLevelResource.level = 1;
      const monsterResourceAmount = new MonsterResourceAmount();
      monsterResourceAmount.name = resource.type;
      monsterResourceAmount.amount = 3;
      monsterLevelResource.resources = [monsterResourceAmount];

      originalMonster.resources = [monsterLevelResource];
      const huntedMonster: HuntedMonster = new HuntedMonster(settlement, originalMonster);
      huntedMonster.monsterLevel = 1;
      kdmCalculationService.addResourcesFromKilledMonster(huntedMonster);
      tick();
      expect(huntedMonster.huntedResources.length).toBe(1);
      let amount = 0;
      huntedMonster.huntedResources.forEach(rs => amount += rs.amount);
      expect(amount).toBe(3);
    })));

});
