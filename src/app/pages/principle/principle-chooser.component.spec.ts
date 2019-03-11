import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PrincipleChooserPageComponent } from './principle-chooser.component';
import { Config, DomController, IonicModule, NavController, Platform } from '@ionic/angular';
import { ConfigMock, KDMDataServiceMock, KDMDBServiceMock, NavMock, NavParamsMock, PlatformMock } from '../../mock/mocks';
import { Settlement } from '../../model/settlement';
import { Principle, PrincipleType } from '../../model/principle';
import { KDMDataService } from '../../service/kdm-data.service';
import { KDMDBService } from '../../service/kdm-db.service';
import { TextFormattingPipe } from '../../pipe/text-formatting.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

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
      providers: [DomController,
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({
                type: 'Death',
              }),
            ),
          },
        },
        {provide: NavController, useClass: NavMock},
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: KDMDataService, useValue: kdmServiceMock},
        {provide: KDMDBService, useValue: kdmDBServiceMock},
      ],
      imports: [IonicModule, RouterTestingModule],
    });
    settlement = new Settlement('Dummy Settlement');
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
    const spy = spyOn(kdmServiceMock, 'getPrinciplesWithTypeName').and.callThrough();
    const spy2 = spyOn(kdmServiceMock, 'getPrincipleTypeByName').and.callThrough();
    principleChooserPageComponent.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledWith(principleChooserPageComponent.principleType.name);
    expect(spy2).toHaveBeenCalledWith(principleChooserPageComponent.principleType.name);
    expect(principleChooserPageComponent.allPrinciples.length).toBe(2);
    expect(principleChooserPageComponent.isLoading).toBeFalsy();
    expect(principleChooserPageComponent.principleOne).toBe(principleChooserPageComponent.allPrinciples[0]);
    expect(principleChooserPageComponent.principleTwo).toBe(principleChooserPageComponent.allPrinciples[1]);
  }));

  it('select principle', () => {
    const spyRouter = spyOn(principleChooserPageComponent.router, 'navigate');
    spyRouter.and.returnValue(new Promise(() => {}));
    principleChooserPageComponent.settlement = settlement;
    const principle = new Principle('Dummy Principle', 'dummy', new PrincipleType('Dummy Principle Type'));
    principleChooserPageComponent.selectPrinciple(principle);
    expect(principleChooserPageComponent.settlement.principles).toContain(principle);
    expect(spyRouter).toHaveBeenCalled();
  });

});
