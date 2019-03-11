import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OthersPageComponent } from './others.component';
import {
  Config, DomController, IonicModule, NavController, NavParams, Platform,
} from '@ionic/angular';
import { ConfigMock, NavMock, NavParamsMock, PlatformMock } from '../../mock/mocks';
import { RouterTestingModule } from '@angular/router/testing';

describe('Others Component', () => {

  let othersPage: OthersPageComponent;
  let fixture: ComponentFixture<OthersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OthersPageComponent],
      providers: [DomController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
      ],
      imports: [IonicModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(OthersPageComponent);
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
