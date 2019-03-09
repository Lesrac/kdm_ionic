import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Config, DomController, IonicModule, NavController,
  NavParams, Platform,
} from '@ionic/angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, NavMock, NavParamsMock, PlatformMock,
} from '../../../mock/mocks';
import { SevereInjuriesPageComponent } from './severe-injuries.component';
import { SevereInjuriesDetailPageComponent } from './severe-injuries-detail.component';

describe('Severe Injuries Component', () => {

  let severeInjuriesPageComponent: SevereInjuriesPageComponent;
  let fixture: ComponentFixture<SevereInjuriesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SevereInjuriesPageComponent],
      providers: [DomController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: Config, useClass: ConfigMock},
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

/*  it('open detail Page', () => {
    const spy = spyOn(severeInjuriesPageComponent.navCtrl, 'push').and.callThrough();
    const bodypart = 'WAIST';
    severeInjuriesPageComponent.goToDetail(bodypart);
    expect(spy).toHaveBeenCalledWith(SevereInjuriesDetailPageComponent, {bodypart: bodypart});
  }); */

});
