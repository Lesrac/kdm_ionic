import { TestBed } from '@angular/core/testing';
import { App, Config, DeepLinker, DomController, Form, IonicModule, Keyboard, NavController, NavParams, Platform, ViewController, } from 'ionic-angular';
import { AppMock, ConfigMock, DeepLinkerMock, NavMock, NavParamsMock, PlatformMock, ViewControllerMock, } from '../../mock/mocks';
import { Principle, PrincipleType } from '../../model/principle';
import { TextFormattingPipe } from '../../pipe/text-formatting.pipe';
import { PrincipleDetailComponent } from './principle_detail.component';
describe('Principle Detail Component', () => {
    let principleDetailComponent;
    let fixture;
    let principle;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PrincipleDetailComponent, TextFormattingPipe],
            providers: [DomController, Keyboard, Form,
                { provide: NavParams, useClass: NavParamsMock },
                { provide: NavController, useClass: NavMock },
                { provide: App, useClass: AppMock },
                { provide: Config, useClass: ConfigMock },
                { provide: DeepLinker, useClass: DeepLinkerMock },
                { provide: Platform, useClass: PlatformMock },
                { provide: ViewController, useClass: ViewControllerMock },
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
    it('created', () => {
        expect(fixture).toBeTruthy();
        expect(principleDetailComponent).toBeTruthy();
        expect(principleDetailComponent.principle).toBe(principle);
    });
});
//# sourceMappingURL=principle-detail.component.spec.js.map