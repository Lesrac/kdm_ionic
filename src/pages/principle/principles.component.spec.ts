import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  App,
  Config, DeepLinker, DomController, Form, IonicModule, Keyboard, NavController, NavParams,
  Platform,
} from 'ionic-angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, KDMDataServiceMock, KDMDBServiceMock, NavMock, NavParamsMock, PlatformMock,
} from '../../mock/mocks';
import { TextFormattingPipe } from '../../pipe/text_formatting.pipe';
import { PrinciplesPageComponent } from './principles.component';
import { Settlement } from '../../model/settlement';
import { KDMDataService } from '../../service/kdm_data.service';
import { KDMDBService } from '../../service/kdm_db.service';
import { Principle, PrincipleType } from '../../model/principle';
import { PrincipleChooserPageComponent } from './principle_chooser.component';
import { PrincipleDetailComponent } from './principle_detail.component';

describe('Principle Page Component', () => {

  let principlesPageComponent: PrinciplesPageComponent;
  let fixture: ComponentFixture<PrinciplesPageComponent>;

  let settlement: Settlement;
  let principleType: PrincipleType;
  let kdmDBServiceMock: KDMDBServiceMock;
  let kdmServiceMock: KDMDataServiceMock;

  beforeEach(() => {
    kdmDBServiceMock = new KDMDBServiceMock();
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [PrinciplesPageComponent, TextFormattingPipe],
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
    principleType = new PrincipleType();
    principleType.name = 'Dummy Principle Type';
    fixture = TestBed.createComponent(PrinciplesPageComponent);
    principlesPageComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    principlesPageComponent = null;
  });

  it('created', () => {
    expect(fixture).toBeTruthy();
    expect(principlesPageComponent).toBeTruthy();
  });

  it('ngOnInit', fakeAsync(() => {
    const spy = spyOn(kdmServiceMock, 'getPrincipleTypes').and.callThrough();
    principlesPageComponent.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalled();
    expect(principlesPageComponent.allPrincipleTypes.length).toBe(1);
  }));

  it('principle is chosen', () => {
    const principle = new Principle('Dummy Principle', 'dummy');
    principle.type = principleType;
    principlesPageComponent.settlement.principles.push(principle);
    expect(principlesPageComponent.principleIsChosen(principleType)).toBeTruthy();
  });

  it('principle is not chosen', () => {
    const principle = new Principle('Dummy Principle', 'dummy');
    principle.type = principleType;
    principlesPageComponent.settlement.principles.push(principle);
    const principleType2 = new PrincipleType();
    principleType2.name = 'Dummy Principle Type 2';
    expect(principlesPageComponent.principleIsChosen(principleType2)).toBeFalsy();
  });

  it('select principle', () => {
    const spy = spyOn(principlesPageComponent.navCtrl, 'push').and.callThrough();
    principlesPageComponent.selectPrinciple(principleType);
    expect(spy).toHaveBeenCalledWith(PrincipleChooserPageComponent, {
      principleType: principleType,
      settlement: principlesPageComponent.settlement,
    });
  });

  it('remove principle', () => {
    const principle = new Principle('Dummy Principle', 'dummy');
    const principleType2 = new PrincipleType();
    principleType2.name = 'Principle Type';
    principle.type = principleType2;
    principlesPageComponent.settlement.principles.push(principle);
    const spy = spyOn(kdmDBServiceMock, 'saveSettlement');
    expect(principlesPageComponent.settlement.principles.length).toBe(1);
    principlesPageComponent.removePrinciple(principleType);
    expect(principlesPageComponent.settlement.principles.length).toBe(1);
    principlesPageComponent.removePrinciple(principleType2);
    expect(spy).toHaveBeenCalledWith(principlesPageComponent.settlement);
    expect(principlesPageComponent.settlement.principles.length).toBe(0);
  });

  it('get existing principle name', () => {
    const principle = new Principle('Dummy Principle', 'dummy');
    principle.type = principleType;
    principlesPageComponent.settlement.principles.push(principle);
    expect(principlesPageComponent.getPrincipleName(principleType)).toEqual(principle.name);
  });

  it('get not existing principle name', () => {
    const principle = new Principle('Dummy Principle', 'dummy');
    const principleType2 = new PrincipleType();
    principleType2.name = 'Principle Type';
    principle.type = principleType2;
    principlesPageComponent.settlement.principles.push(principle);
    expect(principlesPageComponent.getPrincipleName(principleType)).toEqual('not chosen');
  });

  it('show detail: principle found', () => {
    const spy = spyOn(principlesPageComponent.navCtrl, 'push').and.callThrough();
    const principle = new Principle('Dummy Principle', 'dummy');
    principle.type = principleType;
    principlesPageComponent.settlement.principles.push(principle);
    principlesPageComponent.showDetail(principleType);
    expect(spy).toHaveBeenCalledWith(PrincipleDetailComponent, {principle: principle});
  });

  it('show detail: principle not found', () => {
    const principle = new Principle('Dummy Principle', 'dummy');
    const principleType2 = new PrincipleType();
    principleType2.name = 'Principle Type';
    principle.type = principleType2;
    principlesPageComponent.settlement.principles.push(principle);
    const spy = spyOn(principlesPageComponent.navCtrl, 'push').and.callThrough();
    principlesPageComponent.showDetail(principleType);
    expect(spy).toHaveBeenCalledTimes(0);
  });

});
