import { App, Config, DeepLinker, DomController, Form, IonicModule, Keyboard, NavController, NavParams, Platform, ViewController, } from 'ionic-angular';
import { AppMock, ConfigMock, DeepLinkerMock, KDMDataServiceMock, NavMock, NavParamsMock, PlatformMock, ViewControllerMock, } from '../../mock/mocks';
import { KDMDataService } from '../../service/kdm-data.service';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Settlement } from '../../model/settlement';
import { Storage, StorageTag } from '../../model/storage';
import { StorageModalComponent } from './storage-modal.component';
import { isEmpty } from 'rxjs/operators';
describe('StorageModalComponent', () => {
    let storageModalComponent;
    let fixture;
    let kdmServiceMock;
    let settlement;
    beforeEach(() => {
        kdmServiceMock = new KDMDataServiceMock();
        TestBed.configureTestingModule({
            declarations: [StorageModalComponent],
            providers: [DomController, Keyboard, Form,
                { provide: NavParams, useClass: NavParamsMock },
                { provide: NavController, useClass: NavMock },
                { provide: App, useClass: AppMock },
                { provide: Config, useClass: ConfigMock },
                { provide: DeepLinker, useClass: DeepLinkerMock },
                { provide: Platform, useClass: PlatformMock },
                { provide: ViewController, useClass: ViewControllerMock },
                { provide: KDMDataService, useValue: kdmServiceMock },
            ],
            imports: [IonicModule],
        });
        settlement = new Settlement('dummy settlement');
        NavParamsMock.setParams(settlement);
        fixture = TestBed.createComponent(StorageModalComponent);
        storageModalComponent = fixture.componentInstance;
        fixture.detectChanges();
    });
    afterEach(() => {
        fixture.destroy();
        storageModalComponent = null;
    });
    it('select item', () => {
        expect(storageModalComponent.storageItemName).toBe(undefined);
        const storageItemName = 'Dummy Storage';
        storageModalComponent.selectItem(new Storage(storageItemName, 'dummy test', 1, [StorageTag.ITEM]));
        expect(storageModalComponent.storageItemName).toEqual(storageItemName);
    });
    it('close', () => {
        const spy = spyOn(storageModalComponent.viewCtrl, 'dismiss');
        storageModalComponent.close();
        expect(spy).toHaveBeenCalled();
    });
    it('on init', fakeAsync(() => {
        spyOn(kdmServiceMock, 'getAllExistingStorageItems').and.callThrough();
        storageModalComponent.ngOnInit();
        tick();
        expect(storageModalComponent.storageItems.length).toBe(2);
        expect(storageModalComponent.foundStorageItems.pipe(isEmpty())).toBeTruthy();
    }));
    it('add on close', () => {
        const storageItem = new Storage('Storage dummy', 'dummy', 1, [StorageTag.ITEM]);
        storageModalComponent.storageItems = [storageItem,
            new Storage('Storage dummy2', 'dummy', 1, [StorageTag.ITEM])];
        const spy = spyOn(storageModalComponent, 'close').and.returnValue(true);
        storageModalComponent.storageItemName = 'Storage dummy';
        expect(storageModalComponent.settlement.storages.length).toBe(0);
        storageModalComponent.addAndClose();
        expect(storageModalComponent.settlement.storages.length).toBe(1);
        expect(storageModalComponent.settlement.storages).toContain(storageItem);
        expect(spy).toHaveBeenCalled();
    });
    it('add on close with no item found', () => {
        storageModalComponent.storageItems = [new Storage('Storage dummy', 'dummy', 1, [StorageTag.ITEM]),
            new Storage('Storage dummy2', 'dummy', 1, [StorageTag.ITEM])];
        const spy = spyOn(storageModalComponent, 'close').and.returnValue(true);
        storageModalComponent.storageItemName = 'Hommy';
        expect(storageModalComponent.settlement.storages.length).toBe(0);
        storageModalComponent.addAndClose();
        expect(storageModalComponent.settlement.storages.length).toBe(0);
        expect(spy).toHaveBeenCalled();
    });
});
//# sourceMappingURL=storage-modal.component.spec.js.map