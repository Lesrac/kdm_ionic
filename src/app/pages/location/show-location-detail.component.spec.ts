import { ShowLocationDetailComponent } from './show-location-detail.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Config, DomController, IonicModule, NavController, NavParams, Platform } from '@ionic/angular';
import { ConfigMock, KDMDataServiceMock, NavMock, NavParamsMock, PlatformMock } from '../../mock/mocks';
import { FilterElementsPipe } from '../../pipe/filter-elements.pipe';
import { MapValuesPipe } from '../../pipe/map-values.pipe';
import { Location } from '../../model/location';
import { Equipment } from '../../model/equipment';
import { Innovation } from '../../model/innovation';
import { RouterTestingModule } from '@angular/router/testing';
import { KDMDataService } from '../../service/kdm-data.service';

describe('Show Location Detail', () => {

  let showLocationDetailComponent: ShowLocationDetailComponent;
  let fixture: ComponentFixture<ShowLocationDetailComponent>;

  let object: Location;
  let kdmServiceMock: KDMDataServiceMock;

  beforeEach(() => {
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [ShowLocationDetailComponent, MapValuesPipe, FilterElementsPipe],
      providers: [DomController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDataService, useValue: kdmServiceMock},
      ],
      imports: [IonicModule, RouterTestingModule],
    });
    object = new Location('Dummy Location', 'dummy',
      new Map<Equipment, Map<string | Innovation, [number]>>(), false);
    NavParamsMock.setParams(object);

    fixture = TestBed.createComponent(ShowLocationDetailComponent);
    showLocationDetailComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    showLocationDetailComponent = null;
  });

  /*  it('created', () => {
      expect(fixture).toBeTruthy();
      expect(showLocationDetailComponent).toBeTruthy();
      expect(showLocationDetailComponent.location).toBe(object);
    }); */

  it('contains or element', () => {
    const value = {
      costs: [{
        amount: [3, 1],
      }, {
        amount: [1, 2],
      }],
    };
    expect(showLocationDetailComponent.containsOrElement(value)).toBeTruthy();
    const value2 = {
      costs: [{
        amount: 3,
      }, {
        amount: [3, 1],
      }, {
        amount: [1, 2],
      }],
    };
    expect(showLocationDetailComponent.containsOrElement(value2)).toBeTruthy();
  });

  it('does not contain or element', () => {
    const value = {
      costs: [{
        amount: 3,
      }, {
        amount: 1,
      }],
    };
    expect(showLocationDetailComponent.containsOrElement(value)).toBeFalsy();
  });

});
