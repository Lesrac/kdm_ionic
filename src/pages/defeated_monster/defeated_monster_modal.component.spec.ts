import {
  App, Config, DeepLinker, DomController, Form, IonicModule, Keyboard, NavController, NavParams, Platform,
  ViewController,
} from 'ionic-angular';
import {
  AppMock,
  ConfigMock,
  DeepLinkerMock,
  KDMCalculationServiceMock,
  NavMock,
  NavParamsMock,
  PlatformMock, ViewControllerMock,
} from '../../mock/mocks';
import { Settlement } from '../../model/settlement';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefeatedMonsterModalComponent } from './defeated_monster_modal.component';
import { KDMCalculationService } from '../../service/kdm_calculation.service';
import { HuntableMonster } from '../../model/linking/huntable_monster';
import { Monster } from '../../model/monster';

describe('Defeated Monster Modal', () => {
  let defeatedMonsterModalComponent: DefeatedMonsterModalComponent;
  let fixture: ComponentFixture<DefeatedMonsterModalComponent>;
  let kdmCalculationServiceMock: KDMCalculationServiceMock;
  let settlement: Settlement;

  beforeEach(() => {
    kdmCalculationServiceMock = new KDMCalculationServiceMock();
    TestBed.configureTestingModule({
      declarations: [DefeatedMonsterModalComponent],
      providers: [DomController, Keyboard, Form,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMCalculationService, useValue: kdmCalculationServiceMock},
        {provide: ViewController, useClass: ViewControllerMock},
      ],
      imports: [IonicModule],
    });
    settlement = new Settlement('dummy settlement');
    NavParamsMock.setParams(settlement);
    fixture = TestBed.createComponent(DefeatedMonsterModalComponent);
    defeatedMonsterModalComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    defeatedMonsterModalComponent = null;
  });

  it('close', () => {
    const spy = spyOn(defeatedMonsterModalComponent.viewCtrl, 'dismiss');
    defeatedMonsterModalComponent.close();
    expect(spy).toHaveBeenCalled();
  });

  it('ngOnInit', () => {
    const monster = new Monster();
    const huntableMonster = new HuntableMonster(settlement, monster);
    huntableMonster.isHuntable = true;
    const notHuntableMonster = new HuntableMonster(settlement, monster);
    defeatedMonsterModalComponent.settlement.huntableMonsters.push(huntableMonster);
    defeatedMonsterModalComponent.settlement.huntableMonsters.push(notHuntableMonster);
    expect(defeatedMonsterModalComponent.huntableMonsters.length).toBe(0);
    defeatedMonsterModalComponent.ngOnInit();
    expect(defeatedMonsterModalComponent.huntableMonsters.length).toBe(1);
  });

  it('addClose success', () => {
    const spy = spyOn(defeatedMonsterModalComponent, 'close');
    const monsterLevel = 1;
    const monster = new Monster();
    monster.level = monsterLevel;
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
    defeatedMonsterModalComponent.monster = monster;
    defeatedMonsterModalComponent.monsterLevel = monsterLevel;
    defeatedMonsterModalComponent.addClose();
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(1);
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters[0].monsterLevel).toBe(monsterLevel);
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters[0].monster.level).toBe(monsterLevel);
    expect(spy).toHaveBeenCalled();
  });

  it('addClose not correctly chosen', () => {
    const spy = spyOn(defeatedMonsterModalComponent, 'close');
    const monsterLevel = 1;
    const monster = new Monster();
    monster.level = monsterLevel;
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
    defeatedMonsterModalComponent.addClose();
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
    defeatedMonsterModalComponent.monster = monster;
    defeatedMonsterModalComponent.monsterLevel = null;
    defeatedMonsterModalComponent.addClose();
    expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
    expect(spy).toHaveBeenCalled();
  });
});
