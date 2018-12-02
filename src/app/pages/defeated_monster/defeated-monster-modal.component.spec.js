import { App, Config, DeepLinker, DomController, Form, IonicModule, Keyboard, NavController, NavParams, Platform, ViewController, } from 'ionic-angular';
import { AppMock, ConfigMock, DeepLinkerMock, KDMCalculationServiceMock, NavMock, NavParamsMock, PlatformMock, ViewControllerMock, } from '../../mock/mocks';
import { Settlement } from '../../model/settlement';
import { TestBed } from '@angular/core/testing';
import { DefeatedMonsterModalComponent } from './defeated-monster-modal.component';
import { KDMCalculationService } from '../../service/kdm-calculation.service';
import { HuntableMonster } from '../../model/linking/huntable-monster';
import { Monster } from '../../model/monster';
describe('Defeated Monster Modal', () => {
    let defeatedMonsterModalComponent;
    let fixture;
    let kdmCalculationServiceMock;
    let settlement;
    beforeEach(() => {
        kdmCalculationServiceMock = new KDMCalculationServiceMock();
        TestBed.configureTestingModule({
            declarations: [DefeatedMonsterModalComponent],
            providers: [DomController, Keyboard, Form,
                { provide: NavParams, useClass: NavParamsMock },
                { provide: NavController, useClass: NavMock },
                { provide: App, useClass: AppMock },
                { provide: Config, useClass: ConfigMock },
                { provide: DeepLinker, useClass: DeepLinkerMock },
                { provide: Platform, useClass: PlatformMock },
                { provide: KDMCalculationService, useValue: kdmCalculationServiceMock },
                { provide: ViewController, useClass: ViewControllerMock },
            ],
            imports: [IonicModule],
        });
        settlement = new Settlement('dummy settlementLocal$');
        NavParamsMock.setParams(settlement);
        fixture = TestBed.createComponent(DefeatedMonsterModalComponent);
        defeatedMonsterModalComponent = fixture.componentInstance;
        fixture.detectChanges();
    });
    afterEach(() => {
        fixture.destroy();
        defeatedMonsterModalComponent = null;
    });
    it('close', () => {
        const spy = spyOn(defeatedMonsterModalComponent.viewCtrl, 'dismiss');
        defeatedMonsterModalComponent.close();
        expect(spy).toHaveBeenCalled();
    });
    it('ngOnInit', () => {
        const monster = new Monster(1, 'Dummy Monster', false);
        const huntableMonster = new HuntableMonster(settlement, monster);
        huntableMonster.isHuntable = true;
        const notHuntableMonster = new HuntableMonster(settlement, monster);
        defeatedMonsterModalComponent.settlement.addHuntableMonster(huntableMonster);
        defeatedMonsterModalComponent.settlement.addHuntableMonster(notHuntableMonster);
        expect(defeatedMonsterModalComponent.huntableMonsters.length).toBe(0);
        defeatedMonsterModalComponent.ngOnInit();
        expect(defeatedMonsterModalComponent.huntableMonsters.length).toBe(1);
    });
    it('addClose success', () => {
        const spy = spyOn(defeatedMonsterModalComponent, 'close');
        const monsterLevel = 1;
        const monster = new Monster(1, 'Dummy Monster', false);
        expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
        defeatedMonsterModalComponent.monster = monster;
        defeatedMonsterModalComponent.monsterLevel = monsterLevel;
        defeatedMonsterModalComponent.addClose();
        expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(1);
        expect(defeatedMonsterModalComponent.settlement.huntedMonsters[0].monsterLevel).toBe(monsterLevel);
        expect(spy).toHaveBeenCalled();
    });
    it('addClose not correctly chosen', () => {
        const spy = spyOn(defeatedMonsterModalComponent, 'close');
        const monster = new Monster(1, 'Dummy Monster', false);
        expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
        defeatedMonsterModalComponent.addClose();
        expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
        expect(spy).toHaveBeenCalled();
        defeatedMonsterModalComponent.monster = monster;
        defeatedMonsterModalComponent.monsterLevel = null;
        defeatedMonsterModalComponent.addClose();
        expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
        expect(spy).toHaveBeenCalled();
    });
    it('addClose add hunt resources', () => {
        const spy = spyOn(defeatedMonsterModalComponent, 'close');
        const spyCalculation = spyOn(kdmCalculationServiceMock, 'addResourcesFromKilledMonster');
        const monster = new Monster(1, 'Dummy Monster', false);
        monster.isNemesis = false;
        defeatedMonsterModalComponent.monster = monster;
        defeatedMonsterModalComponent.huntResources = true;
        expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(0);
        defeatedMonsterModalComponent.addClose();
        expect(defeatedMonsterModalComponent.settlement.huntedMonsters.length).toBe(1);
        expect(spy).toHaveBeenCalled();
        expect(spyCalculation).toHaveBeenCalled();
    });
});
//# sourceMappingURL=defeated-monster-modal.component.spec.js.map