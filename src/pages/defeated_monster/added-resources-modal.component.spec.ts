import {
  AppMock, ConfigMock, DeepLinkerMock, DummyMockElements, NavMock, NavParamsMock, PlatformMock, ViewControllerMock,
} from '../../mock/mocks';
import {
  App, Config, DeepLinker, DomController, Form, IonicModule, Keyboard, NavController, NavParams, Platform,
  ViewController,
} from 'ionic-angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddedResourcesModalComponent } from './added-resources-modal.component';
import { Settlement } from '../../model/settlement';
import { HuntedMonster } from '../../model/linking/hunted-monster';
import { Monster } from '../../model/monster';
import { ShowListDetailComponent } from '../template/show-list-detail.component';

describe('Added Resources Modal', () => {

  let addedResourceModal: AddedResourcesModalComponent;
  let fixture: ComponentFixture<AddedResourcesModalComponent>;
  let huntedMonster: HuntedMonster;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddedResourcesModalComponent],
      providers: [DomController, Keyboard, Form,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: ViewController, useClass: ViewControllerMock},
      ],
      imports: [IonicModule],
    });
    const settlement = new Settlement('Dummy Settlement');
    const monster = new Monster(1, 'Dummy Monster', false);
    huntedMonster = new HuntedMonster(settlement, monster);
    NavParamsMock.setParams(huntedMonster);
    fixture = TestBed.createComponent(AddedResourcesModalComponent);
    addedResourceModal = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    addedResourceModal = null;
  });

  it('close', () => {
    const spy = spyOn(addedResourceModal.viewCtrl, 'dismiss');
    addedResourceModal.close();
    expect(spy).toHaveBeenCalled();
  });

  it('show Details', () => {
    const spy = spyOn(addedResourceModal.navCtrl, 'push').and.callThrough();
    addedResourceModal.showDetail(DummyMockElements.storage);
    expect(spy).toHaveBeenCalledWith(ShowListDetailComponent, {
      object: DummyMockElements.storage,
    });
  });

});
