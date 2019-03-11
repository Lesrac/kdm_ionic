import { Config, DomController, IonicModule, NavController, NavParams, Platform, } from '@ionic/angular';
import { ConfigMock, KDMCalculationServiceMock, NavMock, NavParamsMock, PlatformMock, } from '../../mock/mocks';
import { Settlement } from '../../model/settlement';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefeatedMonsterModalComponent } from './defeated-monster-modal.component';
import { KDMCalculationService } from '../../service/kdm-calculation.service';
import { HuntableMonster } from '../../model/linking/huntable-monster';
import { Monster } from '../../model/monster';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Defeated Monster Modal', () => {
  let defeatedMonsterModalComponent: DefeatedMonsterModalComponent;
  let fixture: ComponentFixture<DefeatedMonsterModalComponent>;
  let kdmCalculationServiceMock: KDMCalculationServiceMock;
  let settlement: Settlement;

  beforeEach(() => {
    kdmCalculationServiceMock = new KDMCalculationServiceMock();
    TestBed.configureTestingModule({
      declarations: [DefeatedMonsterModalComponent],
      providers: [DomController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMCalculationService, useValue: kdmCalculationServiceMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule],
    });
    settlement = new Settlement('dummy settlementLocal$');
    NavParamsMock.setParams(settlement);
    fixture = TestBed.createComponent(DefeatedMonsterModalComponent);
    defeatedMonsterModalComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    defeatedMonsterModalComponent = null;
  });

  /*  it('close', () => {
      const spy = spyOn(defeatedMonsterModalComponent.viewCtrl, 'dismiss');
      defeatedMonsterModalComponent.close();
      expect(spy).toHaveBeenCalled();
    }); */

  it('ngOnInit', () => {
    const monster = new Monster(1, 'Dummy Monster', false);
    const huntableMonster = new HuntableMonster(settlement, monster);
    huntableMonster.isHuntable = true;
    const notHuntableMonster = new HuntableMonster(settlement, monster);
    defeatedMonsterModalComponent.settlement.addHuntableMonster(huntableMonster);
    defeatedMonsterModalComponent.settlement.addHuntableMonster(notHuntableMonster);
    expect(defeatedMonsterModalComponent.huntableMonsters.length).toBe(0);
    defeatedMonsterModalComponent.ngOnInit();
    expect(defeatedMonsterModalComponent.huntableMonsters.length).toBe(1);
  });

  it('addClose success', () => {
    const spy = spyOn(defeatedMonsterModalComponent, 'close');
    const monsterLevel = 1;
    const monster = new Monster(1, 'Dummy Monster', false);
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
    defeatedMonsterModalComponent.monster = monster;
    defeatedMonsterModalComponent.monsterLevel = monsterLevel;
    defeatedMonsterModalComponent.addClose();
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(1);
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters[0].monsterLevel).toBe(monsterLevel);
    expect(spy).toHaveBeenCalled();
  });

  it('addClose not correctly chosen', () => {
    const spy = spyOn(defeatedMonsterModalComponent, 'close');
    const monster = new Monster(1, 'Dummy Monster', false);
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
    defeatedMonsterModalComponent.addClose();
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
    expect(spy).toHaveBeenCalled();
    defeatedMonsterModalComponent.monster = monster;
    defeatedMonsterModalComponent.monsterLevel = null;
    defeatedMonsterModalComponent.addClose();
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

  it('addClose add hunt resources', () => {
    const spy = spyOn(defeatedMonsterModalComponent, 'close');
    const spyCalculation = spyOn(kdmCalculationServiceMock, 'addResourcesFromKilledMonster');
    const monster = new Monster(1, 'Dummy Monster', false);
    monster.isNemesis = false;
    defeatedMonsterModalComponent.monster = monster;
    defeatedMonsterModalComponent.huntResources = true;
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
    defeatedMonsterModalComponent.addClose();
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(1);
    expect(spy).toHaveBeenCalled();
    expect(spyCalculation).toHaveBeenCalled();
  });
});
