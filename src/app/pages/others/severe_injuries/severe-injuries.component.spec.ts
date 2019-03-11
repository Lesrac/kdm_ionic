import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Config, DomController, IonicModule, NavController, Platform,
} from '@ionic/angular';
import {
  ConfigMock, NavMock, PlatformMock,
} from '../../../mock/mocks';
import { SevereInjuriesPageComponent } from './severe-injuries.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Severe Injuries Component', () => {

  let severeInjuriesPageComponent: SevereInjuriesPageComponent;
  let fixture: ComponentFixture<SevereInjuriesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SevereInjuriesPageComponent],
      providers: [DomController,
        {provide: NavController, useClass: NavMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
      ],
      imports: [IonicModule, RouterTestingModule],
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

});
