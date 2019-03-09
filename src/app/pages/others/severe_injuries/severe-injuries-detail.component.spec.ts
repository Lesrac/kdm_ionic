import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  Config, DomController, IonicModule, NavController,
  NavParams, Platform,
} from '@ionic/angular';
import {
  ConfigMock, KDMDataServiceMock, NavMock, NavParamsMock, PlatformMock,
} from '../../../mock/mocks';
import { SevereInjuriesDetailPageComponent } from './severe-injuries-detail.component';
import { KDMDataService } from '../../../service/kdm-data.service';
import { DiceThrowComponent } from '../../template/dice-throw.component';
import { ActivatedRoute } from '@angular/router';

describe('Severe Injuries Detail Component', () => {

  let severeInjuriesDetailPageComponent: SevereInjuriesDetailPageComponent;
  let fixture: ComponentFixture<SevereInjuriesDetailPageComponent>;
  let kdmServiceMock: KDMDataServiceMock;
  let bodypart;

  beforeEach(() => {
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [SevereInjuriesDetailPageComponent, DiceThrowComponent],
      providers: [DomController, ActivatedRoute,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDataService, useValue: kdmServiceMock},
      ],
      imports: [IonicModule],
    });
    bodypart = 'WAIST';
    NavParamsMock.setParams(bodypart);
    fixture = TestBed.createComponent(SevereInjuriesDetailPageComponent);
    severeInjuriesDetailPageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    severeInjuriesDetailPageComponent = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(severeInjuriesDetailPageComponent).toBeTruthy();
  });

  it('ngOnInit', fakeAsync(() => {
    const spy = spyOn(kdmServiceMock, 'getSevereInjuriesToHitLocation').and.callThrough();
    severeInjuriesDetailPageComponent.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledWith(bodypart);
    expect(severeInjuriesDetailPageComponent.severeInjuries.length).toBe(1);
  }));

});
