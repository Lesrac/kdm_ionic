import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefeatedMonsterPageComponent } from './defeated-monster.component';
import { ConfigMock, KDMDataServiceMock, ModalControllerMock, ModalMock, NavMock, PlatformMock, } from '../../mock/mocks';
import { Config, DomController, IonicModule, ModalController, NavController, Platform, } from '@ionic/angular';
import { Settlement } from '../../model/settlement';
import { HuntedMonster } from '../../model/linking/hunted-monster';
import { Monster } from '../../model/monster';
import { DefeatedMonsterModalComponent } from './defeated-monster-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { KDMDataService } from '../../service/kdm-data.service';

describe('Defeated Monster Component', () => {
  let defeatedMonsterComponent: DefeatedMonsterPageComponent;
  let fixture: ComponentFixture<DefeatedMonsterPageComponent>;
  let kdmServiceMock: KDMDataServiceMock;
  let modalMock: ModalMock;
  let settlement: Settlement;

  beforeEach(() => {
    modalMock = new ModalMock();
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [DefeatedMonsterPageComponent],
      providers: [DomController,
        {provide: NavController, useClass: NavMock},
        {provide: ModalController, useClass: ModalControllerMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDataService, useValue: kdmServiceMock},
      ],
      imports: [IonicModule, RouterTestingModule],
    });
    settlement = new Settlement('dummy settlementLocal$');
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
