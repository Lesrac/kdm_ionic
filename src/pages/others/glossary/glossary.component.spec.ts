import {
  App, Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, NavController,
  NavParams, Platform
} from 'ionic-angular';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDataServiceMock, NavMock, NavParamsMock,
  PlatformMock
} from '../../../mock/mocks';
import { DiceThrowComponent } from '../../template/dice-throw.component';
import { KDMDataService } from '../../../service/kdm-data.service';
import { GlossaryPageComponent } from './glossary.component';
import { BaseModel } from '../../../model/base-model';

describe('Glossary Component', () => {

  let glossaryPageComponent: GlossaryPageComponent;
  let fixture: ComponentFixture<GlossaryPageComponent>;
  let kdmServiceMock: KDMDataServiceMock;

  beforeEach(() => {
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [GlossaryPageComponent, DiceThrowComponent],
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
    fixture = TestBed.createComponent(GlossaryPageComponent);
    glossaryPageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    glossaryPageComponent = null;
  });

  it('create', () => {
    expect(fixture).toBeTruthy();
    expect(glossaryPageComponent).toBeTruthy();
  });

  it('ngOnInit', fakeAsync(() => {
    const spy = spyOn(kdmServiceMock, 'getAllGlossaryEntries').and.callThrough();
    glossaryPageComponent.ngOnInit();
    expect(spy).toHaveBeenCalled();
    tick();
    expect(glossaryPageComponent.filteredGlossaryEntries.length).toBe(1);
    expect(glossaryPageComponent.allGlossaryEntries.length).toBe(1);
  }));

  it('filter glossary empty value', () => {
    const event = {
      target: {
        value: ''
      }
    };
    glossaryPageComponent.allGlossaryEntries = [new BaseModel('Base Model', 'dummy')];
    glossaryPageComponent.filteredGlossaryEntries = [new BaseModel('Dummy', 'dummy')];
    glossaryPageComponent.filterGlossary(event);
    expect(glossaryPageComponent.filteredGlossaryEntries).toEqual(glossaryPageComponent.allGlossaryEntries);
  });

  it('filter glossary filter value with found object', () => {
    const event = {
      target: {
        value: 'base model'
      }
    };
    const baseModel = new BaseModel('Base Model 1', 'dummy');
    const baseModel2 = new BaseModel('Base Model 2', 'dummy');
    const baseModel3 = new BaseModel('Whaka', 'dummy');
    glossaryPageComponent.allGlossaryEntries = [baseModel, baseModel2, baseModel3];
    glossaryPageComponent.filterGlossary(event);
    expect(glossaryPageComponent.filteredGlossaryEntries.length).toBe(2);
    expect(glossaryPageComponent.filteredGlossaryEntries).toContain(baseModel);
    expect(glossaryPageComponent.filteredGlossaryEntries).toContain(baseModel2);
  });

  it('filter glossary filter value with no object found', () => {
    const event = {
      target: {
        value: 'bar'
      }
    };
    const baseModel = new BaseModel('Base Model 1', 'dummy');
    const baseModel2 = new BaseModel('Base Model 2', 'dummy');
    const baseModel3 = new BaseModel('Whaka', 'dummy');
    glossaryPageComponent.allGlossaryEntries = [baseModel, baseModel2, baseModel3];
    glossaryPageComponent.filterGlossary(event);
    expect(glossaryPageComponent.filteredGlossaryEntries.length).toBe(0);
  });

});
