import {
  App, Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, NavController,
  NavParams, Platform
} from 'ionic-angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDataServiceMock, NavMock, NavParamsMock,
  PlatformMock
} from '../../../mock/mocks';
import { BrainTraumaPageComponent } from './brain_trauma.component';
import { DiceThrowComponent } from '../../template/dice_throw.component';
import { KDMDataService } from '../../../service/kdm_data.service';

describe('Brain Trauma Component', () => {

  let brainTraumaPageComponent: BrainTraumaPageComponent;
  let fixture: ComponentFixture<BrainTraumaPageComponent>;
  let kdmServiceMock: KDMDataServiceMock;

  beforeEach(() => {
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [BrainTraumaPageComponent, DiceThrowComponent],
      providers: [DomController, Keyboard, Form, GestureController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDataService, useValue: kdmServiceMock},
      ],
      imports: [IonicModule],
    });
    fixture = TestBed.createComponent(BrainTraumaPageComponent);
    brainTraumaPageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    brainTraumaPageComponent = null;
  });

  it('create', () => {
    expect(fixture).toBeTruthy();
    expect(brainTraumaPageComponent).toBeTruthy();
  });

  it('ngOnInit', () => {
    const spy = spyOn(kdmServiceMock, 'getAllBrainTraumas').and.callThrough();
    brainTraumaPageComponent.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

});
