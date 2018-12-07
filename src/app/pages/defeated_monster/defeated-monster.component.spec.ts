import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefeatedMonsterPageComponent } from './defeated-monster.component';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDBServiceMock, ModalControllerMock, ModalMock, NavMock,
  NavParamsMock, PlatformMock,
} from '../../mock/mocks';
import { KDMDBService } from '../../service/kdm-db.service';
import {
  App,
  Config, DeepLinker, DomController, Form, IonicModule, Keyboard, Modal, ModalController, NavController, NavParams,
  Platform,
} from '@ionic/angular';
import { Settlement } from '../../model/settlement';
import { HuntedMonster } from '../../model/linking/hunted-monster';
import { Monster } from '../../model/monster';
import { DefeatedMonsterModalComponent } from './defeated-monster-modal.component';

describe('Defeated Monster Component', () => {
  let defeatedMonsterComponent: DefeatedMonsterPageComponent;
  let fixture: ComponentFixture<DefeatedMonsterPageComponent>;
  let kdmdbServiceMock: KDMDBServiceMock;
  let modalMock: ModalMock;
  let settlement: Settlement;

  beforeEach(() => {
    kdmdbServiceMock = new KDMDBServiceMock();
    modalMock = new ModalMock();
    TestBed.configureTestingModule({
      declarations: [DefeatedMonsterPageComponent],
      providers: [DomController, Keyboard, Form,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: ModalController, useClass: ModalControllerMock},
        {provide: Modal, useClass: ModalMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDBService, useValue: kdmdbServiceMock},
      ],
      imports: [IonicModule],
    });
    settlement = new Settlement('dummy settlementLocal$');
    NavParamsMock.setParams(settlement);
    fixture = TestBed.createComponent(DefeatedMonsterPageComponent);
    defeatedMonsterComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    defeatedMonsterComponent = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(defeatedMonsterComponent).toBeTruthy();
  });

  it('remove hunted monster', () => {
    const monster = new Monster(1, 'Dummy Monster', false);
    const huntedMonster1 = new HuntedMonster(settlement, monster);
    const huntedMonster2 = new HuntedMonster(settlement, monster);
    const huntedMonster3 = new HuntedMonster(settlement, monster);
    settlement.addHuntedMonster(huntedMonster1);
    settlement.addHuntedMonster(huntedMonster2);
    settlement.addHuntedMonster(huntedMonster3);
    defeatedMonsterComponent.removeDefeatedMonster(huntedMonster2);
    expect(defeatedMonsterComponent.settlementLocal.huntedMonsters.length).toBe(2);
    expect(defeatedMonsterComponent.settlementLocal.huntedMonsters).toContain(huntedMonster1);
    expect(defeatedMonsterComponent.settlementLocal.huntedMonsters).toContain(huntedMonster3);
  });

  it('add defeated monster', () => {
    const spyModalCtrlCreate = spyOn(defeatedMonsterComponent.modalCtrl, 'create').and.returnValue(modalMock);
    const spyModalPresent = spyOn(modalMock, 'present');
    const spyModalOnDidDismiss = spyOn(modalMock, 'onDidDismiss').and.callThrough();
    defeatedMonsterComponent.addDefeatedMonster();
    expect(spyModalCtrlCreate).toHaveBeenCalledWith(DefeatedMonsterModalComponent, {
        settlement: defeatedMonsterComponent.settlementLocal,
      },
    );
    expect(spyModalPresent).toHaveBeenCalled();
    expect(spyModalOnDidDismiss).toHaveBeenCalledWith(jasmine.anything());
  });

});
