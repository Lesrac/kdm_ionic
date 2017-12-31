import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PrincipleChooserPageComponent } from './principle_chooser.component';
import {
  App,
  Config, DeepLinker, DomController, Form, IonicModule, Keyboard, NavController, NavParams,
  Platform,
} from 'ionic-angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDataServiceMock, KDMDBServiceMock, NavMock, NavParamsMock, PlatformMock,
} from '../../mock/mocks';
import { Settlement } from '../../model/settlement';
import { Principle, PrincipleType } from '../../model/principle';
import { KDMDataService } from '../../service/kdm_data.service';
import { KDMDBService } from '../../service/kdm_db.service';
import { TextFormattingPipe } from '../../pipe/text_formatting.pipe';

describe('Principle Chooser Component', () => {

  let principleChooserPageComponent: PrincipleChooserPageComponent;
  let fixture: ComponentFixture<PrincipleChooserPageComponent>;

  let settlement: Settlement;
  let kdmDBServiceMock: KDMDBServiceMock;
  let kdmServiceMock: KDMDataServiceMock;

  beforeEach(() => {
    kdmDBServiceMock = new KDMDBServiceMock();
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [PrincipleChooserPageComponent, TextFormattingPipe],
      providers: [DomController, Keyboard, Form,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: App, useClass: AppMock},
        {provide: Config, useClass: ConfigMock},
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDataService, useValue: kdmServiceMock},
        {provide: KDMDBService, useValue: kdmDBServiceMock},
      ],
      imports: [IonicModule],
    });
    settlement = new Settlement('Dummy Settlement');
    NavParamsMock.setParams(settlement);
    fixture = TestBed.createComponent(PrincipleChooserPageComponent);
    principleChooserPageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    principleChooserPageComponent = null;
  });

  it('created', () => {
    expect(fixture).toBeTruthy();
    expect(principleChooserPageComponent).toBeTruthy();
  });

  it('ngOnInit', fakeAsync(() => {
    const spy = spyOn(kdmServiceMock, 'getPrinciplesWithType').and.callThrough();
    principleChooserPageComponent.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledWith(principleChooserPageComponent.principleType);
    expect(principleChooserPageComponent.allPrinciples.length).toBe(2);
    expect(principleChooserPageComponent.isLoading).toBeFalsy();
    expect(principleChooserPageComponent.principleOne).toBe(principleChooserPageComponent.allPrinciples[0]);
    expect(principleChooserPageComponent.principleTwo).toBe(principleChooserPageComponent.allPrinciples[1]);
  }));

  it('select principle', () => {
    const spy = spyOn(kdmDBServiceMock, 'saveSettlement');
    const spyNav = spyOn(principleChooserPageComponent.navCtrl, 'pop');
    const principle = new Principle('Dummy Principle', 'dummy', new PrincipleType('Dummy Principle Type'));
    principleChooserPageComponent.selectPrinciple(principle);
    expect(principleChooserPageComponent.settlement.principles).toContain(principle);
    expect(spy).toHaveBeenCalledWith(principleChooserPageComponent.settlement);
    expect(spyNav).toHaveBeenCalled();
  });

});
