import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  App, Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, NavController,
  NavParams, Platform,
} from 'ionic-angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, NavMock, NavParamsMock, PlatformMock,
} from '../../../mock/mocks';
import { SevereInjuriesPageComponent } from './severe_injuries.component';
import { SevereInjuriesDetailPageComponent } from './severe_injuries_detail.component';

describe('Severe Injuries Component', () => {

  let severeInjuriesPageComponent: SevereInjuriesPageComponent;
  let fixture: ComponentFixture<SevereInjuriesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SevereInjuriesPageComponent],
      providers: [DomController, Keyboard, Form, GestureController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
      ],
      imports: [IonicModule],
    });
    fixture = TestBed.createComponent(SevereInjuriesPageComponent);
    severeInjuriesPageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    severeInjuriesPageComponent = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(severeInjuriesPageComponent).toBeTruthy();
  });

  it('open detail Page', () => {
    const spy = spyOn(severeInjuriesPageComponent.navCtrl, 'push').and.callThrough();
    const bodypart = 'waist';
    severeInjuriesPageComponent.goToDetail(bodypart);
    expect(spy).toHaveBeenCalledWith(SevereInjuriesDetailPageComponent, {bodypart: bodypart});
  });

});
