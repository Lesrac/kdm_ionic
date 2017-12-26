import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OthersPage } from './others.component';
import {
  App, Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, NavController,
  NavParams, Platform,
} from 'ionic-angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, NavMock, NavParamsMock,
  PlatformMock,
} from '../../mock/mocks';

describe('Others Component', () => {

  let othersPage: OthersPage;
  let fixture: ComponentFixture<OthersPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OthersPage],
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
    fixture = TestBed.createComponent(OthersPage);
    othersPage = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    othersPage = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(othersPage).toBeTruthy();
  });

});
