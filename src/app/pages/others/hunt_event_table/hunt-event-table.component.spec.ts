import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  App, Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, NavController,
  NavParams, Platform,
} from '@ionic/angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDataServiceMock, NavMock, NavParamsMock,
  PlatformMock,
} from '../../../mock/mocks';
import { HuntEventTablePageComponent } from './hunt-event-table.component';
import { KDMDataService } from '../../../service/kdm-data.service';
import { HuntEvent } from '../../../model/hunt-event';
import { TextFormattingPipe } from '../../../pipe/text-formatting.pipe';

describe('Hunt Event Table Component', () => {

  let huntEventTablePageComponent: HuntEventTablePageComponent;
  let fixture: ComponentFixture<HuntEventTablePageComponent>;
  let kdmServiceMock: KDMDataServiceMock;

  beforeEach(() => {
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [HuntEventTablePageComponent, TextFormattingPipe],
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
    fixture = TestBed.createComponent(HuntEventTablePageComponent);
    huntEventTablePageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    huntEventTablePageComponent = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(huntEventTablePageComponent).toBeTruthy();
  });

  it('ngOnInit', fakeAsync(() => {
    const spy = spyOn(kdmServiceMock, 'getAllHuntEvents').and.callThrough();
    huntEventTablePageComponent.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalled();
    expect(huntEventTablePageComponent.allHuntEvents).toEqual(huntEventTablePageComponent.filteredHuntEvents);
  }));

  it('filter hunt event table empty value', () => {
    const event = {
      target: {
        value: ''
      }
    };
    huntEventTablePageComponent.allHuntEvents = [new HuntEvent('Hunt Event', 'dummy')];
    huntEventTablePageComponent.filteredHuntEvents = [new HuntEvent('Dummy', 'dummy')];
    huntEventTablePageComponent.filterEventTable(event);
    expect(huntEventTablePageComponent.filteredHuntEvents).toEqual(huntEventTablePageComponent.allHuntEvents);
  });

  it('filter hunt event table filter value with found object', () => {
    const event = {
      target: {
        value: 'hunt Event'
      }
    };
    const huntEvent = new HuntEvent('Hunt Event 1', 'dummy');
    const huntEvent2 = new HuntEvent('Hunt Event 2', 'dummy');
    const huntEvent3 = new HuntEvent('Whaka', 'dummy');
    huntEventTablePageComponent.allHuntEvents = [huntEvent, huntEvent2, huntEvent3];
    huntEventTablePageComponent.filterEventTable(event);
    expect(huntEventTablePageComponent.filteredHuntEvents.length).toBe(2);
    expect(huntEventTablePageComponent.filteredHuntEvents).toContain(huntEvent);
    expect(huntEventTablePageComponent.filteredHuntEvents).toContain(huntEvent2);
  });

  it('filter hunt event table filter value with no object found', () => {
    const event = {
      target: {
        value: 'bar'
      }
    };
    const huntEvent = new HuntEvent('Hunt Event 1', 'dummy');
    const huntEvent2 = new HuntEvent('Hunt Event 2', 'dummy');
    const huntEvent3 = new HuntEvent('Whaka', 'dummy');
    huntEventTablePageComponent.allHuntEvents = [huntEvent, huntEvent2, huntEvent3];
    huntEventTablePageComponent.filterEventTable(event);
    expect(huntEventTablePageComponent.filteredHuntEvents.length).toBe(0);
  });

});
