import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePageComponent } from './storage.component';
import { By } from '@angular/platform-browser';
import {
  App, Config, DeepLinker, DomController, Form, IonicModule, Keyboard, Modal, ModalController, NavController, NavParams,
  Platform,
} from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDataServiceMock, KDMDBServiceMock, ModalControllerMock, ModalMock, NavMock,
  NavParamsMock,
  PlatformMock,
} from '../../mock/mocks';
import { KDMDBService } from '../../service/kdm_db.service';
import { Storage } from '../../model/storage';
import { DebugElement } from '@angular/core';
import { StorageModalComponent } from './storage_modal.component';
import { ShowListDetailComponent } from '../template/show_list_detail.component';
import { KDMDataService } from '../../service/kdm_data.service';

describe('StorageComponent', () => {
  let storageComponent: StoragePageComponent;
  let fixture: ComponentFixture<StoragePageComponent>;

  let modalControllerMock;
  let kdmdbServiceMock: KDMDBServiceMock;
  let kdmServiceMock: KDMDataServiceMock;
  let settlement: Settlement;

  beforeEach(() => {
    modalControllerMock = new ModalControllerMock();
    kdmdbServiceMock = new KDMDBServiceMock();
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [StoragePageComponent],
      providers: [DomController, Keyboard, Form,
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
    expect(typeof storageComponent.settlement).toBe('object');
    const storage = new Storage('Storage 1', 'storage item');
    const storage2 = new Storage('Storage 2', 'storage item 2');
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
    const storage = new Storage('Storage 1', 'storage item');
    const storage2 = new Storage('Storage 2', 'storage item 2');
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

  it('Show Segments contains all added storage elements', () => {
    const storage = new Storage('XKCD', 'storage item');
    const storage2 = new Storage('ABCD', 'storage item 2');
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
    console.log(de2);
    expect(el2.id).toBe(storage2.name);
    expect(el2.children.namedItem(storage2.name).textContent).toContain(storage2.name);
    expect(el2.children.namedItem(storage2.name + ' ' + storage2.amount)
      .getAttribute('ng-reflect-model')).toBe(storage2.amount.toString());
  });

  it('open modal StorageModalComponent', () => {
    const spy = spyOn(storageComponent.modalCtrl, 'create').and.callThrough();
    storageComponent.addStorageItem();
    expect(spy).toHaveBeenCalledWith(StorageModalComponent, {
        settlement: storageComponent.settlement,
        component: jasmine.anything(),
        opts: jasmine.anything(),
      },
    );
  });

  it('open NavContoller with ShowListDetailComponent', () => {
    const storage = new Storage('Storage 1', 'storage item');
    const spy = spyOn(storageComponent.navCtrl, 'push').and.callThrough();
    storageComponent.showDetail(storage);
    expect(spy).toHaveBeenCalledWith(ShowListDetailComponent, {
        object: storage,
      },
    );
  });

  it('check save on leave', () => {
    const spy = spyOn(kdmdbServiceMock, 'saveSettlement');
    storageComponent.ionViewDidLeave();
    expect(spy).toHaveBeenCalledWith(settlement);
  });

})
;
