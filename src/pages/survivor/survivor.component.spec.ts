import {
  App,
  Config,
  DeepLinker, DomController, Form, GestureController, Haptic, IonicModule, Keyboard, Modal, ModalController,
  NavController,
  NavParams,
  Platform,
} from 'ionic-angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDBServiceMock, KDMObserverServiceMock,
  KeyValueDiffersMock, ModalControllerMock, ModalMock,
  NavMock, NavParamsMock, PlatformMock,
} from '../../mock/mocks';
import { KDMObserverService } from '../../service/kdm_observer.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Settlement } from '../../model/settlement';
import { KDMDBService } from '../../service/kdm_db.service';
import { SurvivorPageComponent } from './survivor.component';
import { KeyValueDiffers } from '@angular/core';
import { InputNumberComponent } from '../template/input_number.component';

describe('SurvivorComponent', () => {
  let survivorPageComponent: SurvivorPageComponent;
  let fixture: ComponentFixture<SurvivorPageComponent>;
  let kdmDBServiceMock: KDMDBServiceMock;
  let settlement: Settlement;

  beforeEach(() => {
    kdmDBServiceMock = new KDMDBServiceMock();
    TestBed.configureTestingModule({
      declarations: [SurvivorPageComponent, InputNumberComponent],
      providers: [DomController, Keyboard, Form, GestureController, Haptic,
        {provide: KeyValueDiffers, useClass: KeyValueDiffersMock},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: ModalController, useClass: ModalControllerMock},
        {provide: Modal, useClass: ModalMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDBService, useValue: kdmDBServiceMock},
        {provide: KDMObserverService, useClass: KDMObserverServiceMock},
      ],
      imports: [IonicModule],
    });
    settlement = new Settlement('Dummy Settlement');
    NavParamsMock.setParams(settlement);
    fixture = TestBed.createComponent(SurvivorPageComponent);
    survivorPageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    survivorPageComponent = null;
  });

  it('created', () => {
    expect(fixture).toBeTruthy();
    expect(survivorPageComponent).toBeTruthy();
  });

});
