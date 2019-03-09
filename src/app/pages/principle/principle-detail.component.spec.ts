import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Config, DomController, IonicModule, NavController, NavParams, Platform,
} from '@ionic/angular';
import {
  AppMock, ConfigMock, DeepLinkerMock, NavMock, NavParamsMock, PlatformMock, ViewControllerMock,
} from '../../mock/mocks';
import { Principle, PrincipleType } from '../../model/principle';
import { TextFormattingPipe } from '../../pipe/text-formatting.pipe';
import { PrincipleDetailComponent } from './principle_detail.component';

describe('Principle Detail Component', () => {

  let principleDetailComponent: PrincipleDetailComponent;
  let fixture: ComponentFixture<PrincipleDetailComponent>;

  let principle: Principle;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipleDetailComponent, TextFormattingPipe],
      providers: [DomController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: NavController, useClass: NavMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
      ],
      imports: [IonicModule],
    });
    principle = new Principle('Dummy Principle', 'dummy', new PrincipleType('Dummy'));
    NavParamsMock.setParams(principle);
    fixture = TestBed.createComponent(PrincipleDetailComponent);
    principleDetailComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    principleDetailComponent = null;
  });

/*  it('created', () => {
    expect(fixture).toBeTruthy();
    expect(principleDetailComponent).toBeTruthy();
    expect(principleDetailComponent.principle).toBe(principle);
  });
*/
});
