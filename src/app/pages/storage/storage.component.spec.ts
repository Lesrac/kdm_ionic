import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePageComponent } from './storage.component';
import {
  Config, DomController, IonicModule, ModalController,
  NavController, NavParams, Platform,
} from '@ionic/angular';
import { Settlement } from '../../model/settlement';
import {
  AppMock, ConfigMock, DeepLinkerMock, DummyMockElements, KDMDataServiceMock, KDMDBServiceMock, ModalControllerMock,
  ModalMock, NavMock,
  NavParamsMock,
  PlatformMock,
} from '../../mock/mocks';
import { KDMDBService } from '../../service/kdm-db.service';
import { Storage, StorageTag } from '../../model/storage';
import { StorageModalComponent } from './storage-modal.component';
import { ShowListDetailComponent } from '../template/show-list-detail.component';
import { KDMDataService } from '../../service/kdm-data.service';

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
      providers: [DomController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: ModalController, useClass: ModalControllerMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDBService, useValue: kdmdbServiceMock},
        {provide: KDMDataService, useValue: kdmServiceMock},
      ],
      imports: [IonicModule],
    });
    settlement = new Settlement('dummy settlementLocal$');
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
    storageComponent.localSettlement.addStorageItem(storage);
    storageComponent.localSettlement.addStorageItem(storage2);
    const storageAmountChangeElement = storageComponent.localSettlement.storages[0].amount;
    const storageAmountFixElement = storageComponent.localSettlement.storages[1].amount;
    storageComponent.increaseAmount(storage);
    expect(storageComponent.localSettlement.storages[0].amount).toEqual(storageAmountChangeElement + 1);
    expect(storageComponent.localSettlement.storages[1].amount).toEqual(storageAmountFixElement);
    storageComponent.decreaseAmount(storage);
    expect(storageComponent.localSettlement.storages[0].amount).toEqual(storageAmountChangeElement);
    expect(storageComponent.localSettlement.storages[1].amount).toEqual(storageAmountFixElement);
    storageComponent.decreaseAmount(storage);
    expect(storageComponent.localSettlement.storages[0]).toEqual(storage2);
  });

  it('Change storage amount', () => {
    expect(typeof storageComponent.localSettlement).toBe('object');
    const storage = new Storage('Storage 1', 'storage item', 1, [StorageTag.ITEM]);
    const storage2 = new Storage('Storage 2', 'storage item 2', 1, [StorageTag.ITEM]);
    storageComponent.localSettlement.addStorageItem(storage);
    storageComponent.localSettlement.addStorageItem(storage2);
    const storageAmountChangeElement = storageComponent.localSettlement.storages[0].amount;
    const storageAmountFixElement = storageComponent.localSettlement.storages[1].amount;
    storageComponent.changedAmount(storage);
    expect(storageComponent.localSettlement.storages[0].amount).toEqual(storageAmountChangeElement);
    expect(storageComponent.localSettlement.storages[1].amount).toEqual(storageAmountFixElement);
    storage.amount = 0;
    storageComponent.changedAmount(storage);
    expect(storageComponent.localSettlement.storages[0].amount).toEqual(storageAmountChangeElement);
  });

  it('open modal StorageModalComponent', () => {
    const spy = spyOn(storageComponent.modalCtrl, 'create').and.returnValue(modalMock);
    storageComponent.addStorageItem();
    expect(spy).toHaveBeenCalledWith(StorageModalComponent, {
        settlement: storageComponent.localSettlement,
      },
    );
  });

/*  it('open NavContoller with ShowListDetailComponent', () => {
    const spy = spyOn(storageComponent.navCtrl, 'push').and.callThrough();
    storageComponent.showDetail(DummyMockElements.storage);
    expect(spy).toHaveBeenCalledWith(ShowListDetailComponent, {
        object: DummyMockElements.storage,
      },
    );
  }); */

});
