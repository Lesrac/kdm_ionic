import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { KDMCalculationService } from './kdm_calculation.service';
import { KDMDataServiceMock, PlatformMock, StorageMock } from '../mock/mocks';
import { Platform } from 'ionic-angular';
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
    basicResource1 = new Resource('Resource 1', 'first', 1, [StorageTag.ARMOR], ResourceType.BASIC, 2);
    basicResource2 = new Resource('Resource 2', 'second', 1, [StorageTag.FUR, StorageTag.HIDE], ResourceType.BASIC, 1);
    whiteLionResource1 = new Resource('Resource 3', 'third', 1,
      [StorageTag.KATAR, StorageTag.MELEE], ResourceType.WHITELION, 4);

    resources = [];
    resources.push(basicResource1);
    resources.push(basicResource2);
    resources.push(whiteLionResource1);
  });

  it('addResourcesFromKilledMonster',
    fakeAsync(inject([KDMCalculationService], (kdmCalculationService: KDMCalculationService) => {
      spyOn(kdmDataServiceMock, 'getResources').and.returnValue(Promise.resolve(resources));

      const settlement: Settlement = new Settlement('Dummy Settlement');
      const originalMonster: Monster = new Monster(1, 'White Lion', false);

      const monsterResourceAmount = new MonsterResourceAmount(ResourceType.BASIC, 3);
      const monsterLevelResource = new MonsterLevelResources(1, [monsterResourceAmount]);

      originalMonster.resources = [monsterLevelResource];
      const huntedMonster: HuntedMonster = new HuntedMonster(settlement, originalMonster);
      huntedMonster.monsterLevel = 1;
      kdmCalculationService.addResourcesFromKilledMonster(huntedMonster);
      tick();
      let amount = 0;
      huntedMonster.huntedResources.forEach(rs => amount += rs.amount);
      expect(amount).toBe(3);
    })));

});
