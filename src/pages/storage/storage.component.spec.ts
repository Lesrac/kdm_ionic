import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePageComponent } from './storage.component';
import { By } from '@angular/platform-browser';
import {
  App, Config, DeepLinker, DomController, Form, GestureController, IonicModule, Keyboard, Modal, ModalController,
  NavController, NavParams,
  Platform,
} from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import {
  AppMock, ConfigMock, DeepLinkerMock, DummyMockElements, KDMDataServiceMock, KDMDBServiceMock, ModalControllerMock,
  ModalMock, NavMock,
  NavParamsMock,
  PlatformMock,
} from '../../mock/mocks';
import { KDMDBService } from '../../service/kdm_db.service';
import { Storage, StorageTag } from '../../model/storage';
import { DebugElement } from '@angular/core';
import { StorageModalComponent } from './storage_modal.component';
import { ShowListDetailComponent } from '../template/show_list_detail.component';
import { KDMDataService } from '../../service/kdm_data.service';

describe('StorageComponent', () => {
  let storageComponent: StoragePageComponent;
  let fixture: ComponentFixture<StoragePageComponent>;

  let kdmdbServiceMock: KDMDBServiceMock;
  let kdmServiceMock: KDMDataServiceMock;
  let settlement: Settlement;
  let modalMock: ModalMock;

  beforeEach(() => {
    kdmdbServiceMock = new KDMDBServiceMock();
    kdmServiceMock = new KDMDataServiceMock();
    modalMock = new ModalMock();
    TestBed.configureTestingModule({
      declarations: [StoragePageComponent],
      providers: [DomController, Keyboard, GestureController, Form,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: ModalController, useClass: ModalControllerMock},
        {provide: Modal, useClass: ModalMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDBService, useValue: kdmdbServiceMock},
        {provide: KDMDataService, useValue: kdmServiceMock},
      ],
      imports: [IonicModule],
    });
    settlement = new Settlement('dummy settlement');
    NavParamsMock.setParams(settlement);
    fixture = TestBed.createComponent(StoragePageComponent);
    storageComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    storageComponent = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(storageComponent).toBeTruthy();
  });

  it('Decrease and increase storage amount', () => {
    const storage = new Storage('Storage 1', 'storage item', 1, [StorageTag.ITEM]);
    const storage2 = new Storage('Storage 2', 'storage item 2', 1, [StorageTag.ITEM]);
    storageComponent.settlement.addStorageItem(storage);
    storageComponent.settlement.addStorageItem(storage2);
    const storageAmountChangeElement = storageComponent.settlement.storages[0].amount;
    const storageAmountFixElement = storageComponent.settlement.storages[1].amount;
    storageComponent.increaseAmount(storage);
    expect(storageComponent.settlement.storages[0].amount).toEqual(storageAmountChangeElement + 1);
    expect(storageComponent.settlement.storages[1].amount).toEqual(storageAmountFixElement);
    storageComponent.decreaseAmount(storage);
    expect(storageComponent.settlement.storages[0].amount).toEqual(storageAmountChangeElement);
    expect(storageComponent.settlement.storages[1].amount).toEqual(storageAmountFixElement);
    storageComponent.decreaseAmount(storage);
    expect(storageComponent.settlement.storages[0]).toEqual(storage2);
  });

  it('Change storage amount', () => {
    expect(typeof storageComponent.settlement).toBe('object');
    const storage = new Storage('Storage 1', 'storage item', 1, [StorageTag.ITEM]);
    const storage2 = new Storage('Storage 2', 'storage item 2', 1, [StorageTag.ITEM]);
    storageComponent.settlement.addStorageItem(storage);
    storageComponent.settlement.addStorageItem(storage2);
    const storageAmountChangeElement = storageComponent.settlement.storages[0].amount;
    const storageAmountFixElement = storageComponent.settlement.storages[1].amount;
    storageComponent.changedAmount(storage);
    expect(storageComponent.settlement.storages[0].amount).toEqual(storageAmountChangeElement);
    expect(storageComponent.settlement.storages[1].amount).toEqual(storageAmountFixElement);
    storage.amount = 0;
    storageComponent.changedAmount(storage);
    expect(storageComponent.settlement.storages[0].amount).toEqual(storageAmountChangeElement);
  });

  xit('Show Segments contains all added storage elements', () => {
    const storage = new Storage('XKCD', 'storage item', 1, [StorageTag.ITEM]);
    const storage2 = new Storage('ABCD', 'storage item 2', 1, [StorageTag.ITEM]);
    storageComponent.settlement.addStorageItem(storage);
    storageComponent.settlement.addStorageItem(storage2);
    fixture.detectChanges();
    let de: DebugElement = fixture.debugElement.query(By.css('#' + storage.name));
    let el: HTMLElement = de.nativeElement;
    expect(el.id).toBe(storage.name);
    expect(el.children.namedItem(storage.name).textContent).toContain(storage.name);
    expect(el.children.namedItem(storage.name + ' ' + storage.amount)
      .getAttribute('ng-reflect-model')).toBe(storage.amount.toString());
    fixture.detectChanges();
    let de2: DebugElement = fixture.debugElement.query(By.css('#' + storage2.name));
    let el2: HTMLElement = de2.nativeElement;
    expect(el2.id).toBe(storage2.name);
    expect(el2.children.namedItem(storage2.name).textContent).toContain(storage2.name);
    expect(el2.children.namedItem(storage2.name + ' ' + storage2.amount)
      .getAttribute('ng-reflect-model')).toBe(storage2.amount.toString());
  });

  it('open modal StorageModalComponent', () => {
    const spy = spyOn(storageComponent.modalCtrl, 'create').and.returnValue(modalMock);
    storageComponent.addStorageItem();
    expect(spy).toHaveBeenCalledWith(StorageModalComponent, {
        settlement: storageComponent.settlement,
      },
    );
  });

  it('open NavContoller with ShowListDetailComponent', () => {
    const spy = spyOn(storageComponent.navCtrl, 'push').and.callThrough();
    storageComponent.showDetail(DummyMockElements.storage);
    expect(spy).toHaveBeenCalledWith(ShowListDetailComponent, {
        object: DummyMockElements.storage,
      },
    );
  });

});
