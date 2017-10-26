import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePageComponent } from './storage.component';
import { By } from '@angular/platform-browser';
import {
  App, Config, DeepLinker, DomController, Form, IonicModule, Keyboard, ModalController, NavController, NavParams,
  Platform,
} from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { AppMock, ConfigMock, DeepLinkerMock, NavParamsMock, PlatformMock } from '../../mock/mocks';

describe('StorageComponent', () => {
  let storageComponent: StoragePageComponent;
  let fixture: ComponentFixture<StoragePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoragePageComponent],
      providers: [NavController, ModalController, DomController, Keyboard, Form,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
      ],
      imports: [IonicModule],
    });
    NavParamsMock.setParams(new Settlement('brabl'));

    fixture = TestBed.createComponent(StoragePageComponent);
    storageComponent = fixture.componentInstance;
    fixture.detectChanges();

  });

  afterEach(() => {
    fixture.destroy();
  });

  it('What now', () => {
    fixture.debugElement.query(By.css('button'));
    console.log(storageComponent.settlement);
    console.log(typeof storageComponent.settlement);
    expect(typeof storageComponent.settlement).toBe('object');
  });

})
;
