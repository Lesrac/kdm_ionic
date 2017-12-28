import { SettlementSimplified } from '../model/db/settlement_simplified';
import { Settlement } from '../model/settlement';
import { mockApp, mockConfig, mockDeepLinker } from 'ionic-angular/util/mock-providers';
import { ModalController } from 'ionic-angular';
import { StoryEvent } from '../model/story_event';
import { Armor } from '../model/armor';
import { Principle, PrincipleType } from '../model/principle';
import { FightingArt } from '../model/fighting_art';
import { Monster } from '../model/monster';
import { Timeline } from '../model/timeline';
import { Storage } from '../model/storage';
import { Equipment } from '../model/equipment';
import { Resource } from '../model/resource';
import { BaseModel } from '../model/base_model';
import { Weapon } from '../model/weapon';
import { Location } from '../model/location';
import { SevereInjury } from '../model/severe_injury';
import { HuntedMonster } from '../model/linking/hunted_monster';
import { DiceThrow } from '../model/dice_throw';
import { Disorder } from '../model/disorder';
import { Innovation } from '../model/innovation';
import { HuntEvent } from '../model/hunte_event';
import { Milestone } from '../model/milestone';
import { Survivor } from '../model/survivor';
import { LanternEvent } from '../model/lantern_event';
import { ComparableVisitorValue } from '../model/visitor/comparable_visitor';
import { Observer } from 'rxjs/Observer';
import { SettlementPageComponent } from '../pages/settlement/settlement.component';
import { SettlementMilestone } from '../model/linking/settlement_milestone';
import { TimelineEventModalComponent } from '../pages/timeline/timeline_event_modal.component';
import { StaticProvider } from '@angular/core/src/di';

export class DummyMockElements {
  public static storage: Storage = new Storage('Storage Dummy', 'dummy');

}

export class NavMock {

  public pop(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public popToRoot(): any {
    return true;
  }
}

export class AppMock {
  public getActiveNav(): NavMock {
    return new NavMock();
  }
}

export class NavParamsMock {
  static returnParam = null;

  static setParams(value) {
    NavParamsMock.returnParam = value;
  }

  public get(key): any {
    if (NavParamsMock.returnParam) {
      return NavParamsMock.returnParam;
    }
    return 'default';
  }
}

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }

  public setTransition(): void {
    return;
  }
}

export class DeepLinkerMock {
}

export class PlatformMock {
  public ready(): Promise<{ String }> {
    return Promise.resolve({String: 'READY'});
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return false;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class ModalControllerMock {
  constructor() {
    return new ModalController(mockApp(), mockConfig(), mockDeepLinker());
  }
}

export class ModalMock {

  public present(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public onDidDismiss(callback: (data: any, role: string) => void): void {

  }
}

export class KDMDBServiceMock {
  private settlements: string = 'settlements';

  getSettlements(): Promise<[SettlementSimplified[], void]> {
    const settlements: SettlementSimplified[] = [];
    let x: void;
    return Promise.all<SettlementSimplified[], void>([settlements, x]);
  }

  getSettlementById(id: number): Promise<SettlementSimplified> {
    return Promise.resolve(new SettlementSimplified(id, 'Dummy simplified settlement', 1, 1, 0, 0));
  }

  saveSettlements(settlements: Settlement[]): void {
    settlements.forEach(settlement => this.saveSettlement(settlement));
  }

  saveSettlement(settlement: Settlement): void {
  }

  removeSettlement(settlementId: number): void {
  }

}

export class KDMDataServiceMock {

  storageItems: Storage[] = [new Storage('Kosh', 'dummy'), new Storage('Barbal', 'dummy')];

  getSettlements(): Promise<Settlement[]> {
    return Promise.resolve([new Settlement('dummy settlement')]);
  }

  addSettlement(settlement: Settlement): void {
  }

  removeSettlement(settlement: Settlement): void {
  }

  createSurvivor(settlement: Settlement): Survivor {
    return new Survivor('Survivor', 1, settlement.id);
  }

  getMonsters(): Promise<Monster[]> {
    return Promise.resolve([new Monster()]);
  }

  getMonster(id: number): Promise<Monster> {
    return Promise.resolve(new Monster());
  }

  getDefaultInitialHuntableNemesisMonsters(): Promise<Monster[]> {
    return Promise.resolve([new Monster()]);
  }

  getDefaultInitialHuntableQuarries(): Promise<Monster[]> {
    return Promise.resolve([new Monster()]);
  }

  getResources(): Promise<Resource[]> {
    return Promise.resolve([new Resource('Resource', 'dummy')]);
  }

  getResourceByName(name: string): Promise<Resource> {
    return Promise.resolve(new Resource(name, 'dummy'));
  }

  getAllExistingStorageItems(): Promise<Storage[][]> {
    return Promise.resolve([this.storageItems]);
  }

  getStorageItem(name: string): Promise<Storage> {
    return Promise.resolve(new Storage(name, 'dummy'));
  }

  getLanternEvents(): Promise<LanternEvent[]> {
    return Promise.resolve([new LanternEvent()]);
  }

  getLanternEvent(name: string): Promise<LanternEvent> {
    return Promise.resolve(new LanternEvent(name));
  }

  getStoryEvents(): Promise<StoryEvent[]> {
    return Promise.resolve([new StoryEvent('Story Event', 'dummy')]);
  }

  getStoryEvent(id: number): Promise<StoryEvent> {
    return Promise.resolve(new StoryEvent('Story Event', 'dummy'));
  }

  getInitialMilestones(): Promise<Milestone[]> {
    return Promise.resolve([new Milestone(ComparableVisitorValue.EQ)]);
  }

  getMilestone(id: number): Promise<Milestone> {
    return Promise.resolve(new Milestone(ComparableVisitorValue.EQ));
  }

  getDefaultTimeline(): Promise<Timeline[]> {
    return Promise.resolve([new Timeline()]);
  }

  getSettlementLocations(): Promise<Location[]> {
    return Promise.resolve([new Location('Location', 'dummy')]);
  }

  getLocation(name: string): Promise<Location> {
    return Promise.resolve(new Location(name, 'dummy'));
  }

  getInnovations(): Promise<Innovation[]> {
    return Promise.resolve([new Innovation('Innovation', 'dummy')]);
  }

  getInnovation(name: string): Promise<Innovation> {
    return Promise.resolve(new Innovation(name, 'dummy'));
  }

  getInnovationsThatAreNotAddedButAvailable(objects: Innovation[]): Promise<Innovation[]> {
    return Promise.resolve(objects);
  }

  getDisorders(): Promise<Disorder[]> {
    return Promise.resolve([new Disorder('Disorder', 'dummy')]);
  }

  getDisorder(name: string): Promise<Disorder> {
    return Promise.resolve(new Disorder(name, 'dummy'));
  }

  getFightingArts(): Promise<FightingArt[]> {
    return Promise.resolve([new FightingArt('FightingArt', 'dummy')]);
  }

  getFightingArt(name: string): Promise<FightingArt> {
    return Promise.resolve(new FightingArt(name, 'dummy'));
  }

  getPrinciples(): Promise<Principle[]> {
    return Promise.resolve([new Principle('Principle', 'dummy'), new Principle('Principle 2', 'dummy')]);
  }

  getPrinciple(name: string): Promise<Principle> {
    return Promise.resolve(new Principle(name, 'dummy'));
  }

  getPrincipleTypes(): Promise<PrincipleType[]> {
    return Promise.resolve([new PrincipleType()]);
  }

  getPrinciplesWithType(principleType: PrincipleType): Promise<Principle[]> {
    return this.getPrinciples();
  }

  getWeapons(): Promise<Weapon[]> {
    return Promise.resolve([new Weapon('Weapon', 'dummy')]);
  }

  getArmors(): Promise<Armor[]> {
    return Promise.resolve([new Armor('Armor', 'dummy')]);
  }

  getEquipments(): Promise<Equipment[]> {
    return Promise.resolve([new Equipment('Armor', 'dummy')]);
  }

  getAllExistingEquipmentItems(): Promise<[Weapon[], Armor[], Equipment[]]> {
    return Promise.all<Weapon[], Armor[], Equipment[]>([this.getWeapons(), this.getArmors(), this.getEquipments()]);
  }

  getEquipment(name: string): Promise<Equipment> {
    return Promise.resolve(new Equipment(name, 'dummy'));
  }

  getAllSevereInjuries(): Promise<SevereInjury[]> {
    return Promise.resolve([new SevereInjury('SevereInjury', 'dummy')]);
  }

  getSevereInjuriesToHitLocation(hitLocation: string): Promise<SevereInjury[]> {
    return this.getAllSevereInjuries();
  }

  getAllBrainTraumas(): Promise<DiceThrow[]> {
    return Promise.resolve([new DiceThrow('DiceThrow', 'dummy')]);
  }

  getAllHuntEvents(): Promise<HuntEvent[]> {
    return Promise.resolve([new HuntEvent('HuntEvent', 'dummy')]);
  }

  getAllGlossaryEntries(): Promise<BaseModel[]> {
    return Promise.resolve([new BaseModel('BaseModel', 'dummy')]);
  }

  sortByName(l, r) {
    if (l.name < r.name) {
      return -1;
    }
    if (l.name > r.name) {
      return 1;
    }
    return 0;
  }
}

export class KDMCalculationServiceMock {
  addResourcesFromKilledMonster(huntedMonster: HuntedMonster, originalMonster: Monster): void {
  }
}

export class KDMObserverServiceMock {
  registerObserverForMilestone(settlementPageComponent: SettlementPageComponent, milestone: SettlementMilestone): void {
  }
}

export class ViewControllerMock {
  readReady = {
    subscribe() {
    },
  };
  writeReady = {
    subscribe() {
    },
  };

  dismiss() {
    console.log('View Controller Dismiss Called');
  }

  _setHeader() {
  }

  _setNavbar() {
  }

  _setIONContent() {
  }

  _setIONContentRef() {
  }
}

export class KeyValueChangesMock<K, V> {
  forEachItem(fn: (r: any) => void): void {
  }

  forEachPreviousItem(fn: (r: any) => void): void {
  }

  forEachChangedItem(fn: (r: any) => void): void {
  }

  forEachAddedItem(fn: (r: any) => void): void {
  }

  forEachRemovedItem(fn: (r: any) => void): void {
  }
}

export class KeyValueDifferMock<K, V> {
  diff(object: Map<K, V>): KeyValueChangesMock<K, V> {
    return new KeyValueChangesMock<K, V>();
  }
}

export class KeyValueDifferFactoryMock {
  supports(objects: any): boolean {
    return true;
  }

  create<K, V>(): KeyValueDifferMock<K, V> {
    return new KeyValueDifferMock<K, V>();
  }
}

export class KeyValueDiffersMock {
  static create<S>(factories: KeyValueDifferFactoryMock[], parent?: KeyValueDiffersMock): KeyValueDiffersMock {
    return new KeyValueDiffersMock();
  }

  static extend<S>(factories: KeyValueDifferFactoryMock[]): StaticProvider {
    return [];
  }

  find(kv: any): KeyValueDifferFactoryMock {
    return new KeyValueDifferFactoryMock();
  }
}

export class StorageMock {
  store = {};

  public ready(): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve({});
    });
  }

  public get(key: string): Promise<string> {
    return Promise.resolve(key in this.store ? this.store[key] : null);
  }

  public set(key: string, value: string): Promise<{}> {
    this.store[key] = value;
    return Promise.resolve({});
  }

  public remove(key: string): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve({key: key});
    });
  }

  public query(): Promise<{ res: { rows: Array<{}> } }> {
    return new Promise((resolve) => {
      resolve({
        res: {
          rows: [{}]
        }
      });
    });
  }
}
