import { SettlementSimplified } from '../model/db/settlement_simplified';
import { Settlement } from '../model/settlement';
import { mockApp, mockConfig, mockDeepLinker } from 'ionic-angular/util/mock-providers';
import { ModalController } from 'ionic-angular';
import { StoryEvent } from '../model/story_event';
import { Armor, ArmorSpace } from '../model/armor';
import { Principle, PrincipleType } from '../model/principle';
import { FightingArt } from '../model/fighting_art';
import { Monster } from '../model/monster';
import { Timeline } from '../model/timeline';
import { Storage, StorageTag } from '../model/storage';
import { Affinity, Direction, Equipment } from '../model/equipment';
import { Resource, ResourceType } from '../model/resource';
import { BaseModel } from '../model/base_model';
import { Weapon } from '../model/weapon';
import { Location } from '../model/location';
import { SevereInjury } from '../model/severe_injury';
import { HuntedMonster } from '../model/linking/hunted_monster';
import { DiceThrow } from '../model/dice_throw';
import { Disorder } from '../model/disorder';
import { Innovation, InnovationTag } from '../model/innovation';
import { HuntEvent } from '../model/hunt_event';
import { Milestone, MilestoneType } from '../model/milestone';
import { Survivor } from '../model/survivor';
import { LanternEvent } from '../model/lantern_event';
import { ComparableVisitorValue } from '../model/visitor/comparable_visitor';
import { SettlementPageComponent } from '../pages/settlement/settlement.component';
import { SettlementMilestone } from '../model/linking/settlement_milestone';
import { StaticProvider } from '@angular/core/src/di';
import { SurvivorPageComponent } from '../pages/survivor/survivor.component';

export class DummyMockElements {
  public static storage: Storage = new Storage('Storage Dummy', 'dummy', 1, [StorageTag.ITEM]);

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

export class NavParamsSettlementSurvivorMock {
  static settlement = null;
  static survivor = null;

  static setParams(settlement, survivor) {
    NavParamsSettlementSurvivorMock.settlement = settlement;
    NavParamsSettlementSurvivorMock.survivor = survivor;
  }

  public get(key): any {
    if (key === 'settlement') {
      return NavParamsSettlementSurvivorMock.settlement;
    } else if (key === 'survivor') {
      return NavParamsSettlementSurvivorMock.survivor;
    } else {
      return 'default';
    }
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

  storageItems: Storage[] = [new Storage('Kosh', 'dummy', 1, [StorageTag.ITEM]),
    new Storage('Barbal', 'dummy', 1, [StorageTag.ITEM])];

  getSettlements(): Promise<Settlement[]> {
    return Promise.resolve([new Settlement('dummy settlement')]);
  }

  addSettlement(settlement: Settlement): void {
  }

  removeSettlement(settlement: Settlement): void {
  }

  createAndAddSurvivor(settlement: Settlement): Survivor {
    const survivor = new Survivor('Survivor', 1, settlement.id);
    settlement.survivors.push(survivor);
    return survivor;
  }

  getMonsters(): Promise<Monster[]> {
    return Promise.resolve([new Monster(1, 'Dummy Monster', false)]);
  }

  getMonster(id: number): Promise<Monster> {
    return Promise.resolve(new Monster(1, 'Dummy Monster', false));
  }

  getDefaultInitialHuntableNemesisMonsters(): Promise<Monster[]> {
    return Promise.resolve([new Monster(1, 'Dummy Monster', true)]);
  }

  getDefaultInitialHuntableQuarries(): Promise<Monster[]> {
    return Promise.resolve([new Monster(1, 'Dummy Monster', false)]);
  }

  getResources(): Promise<Resource[]> {
    return Promise.resolve([new Resource('Resource', 'dummy', 1, [StorageTag.ITEM], ResourceType.BASIC, 1)]);
  }

  getResourceByName(name: string): Promise<Resource> {
    return Promise.resolve(new Resource(name, 'dummy', 1, [StorageTag.ITEM], ResourceType.BASIC, 1));
  }

  getAllExistingStorageItems(): Promise<Storage[][]> {
    return Promise.resolve([this.storageItems]);
  }

  getStorageItem(name: string): Promise<Storage> {
    return Promise.resolve(new Storage(name, 'dummy', 1, [StorageTag.ITEM]));
  }

  getLanternEvents(): Promise<LanternEvent[]> {
    return Promise.resolve([new LanternEvent()]);
  }

  getLanternEvent(name: string): Promise<LanternEvent> {
    return Promise.resolve(new LanternEvent(name));
  }

  getStoryEvents(): Promise<StoryEvent[]> {
    return Promise.resolve([new StoryEvent('Story Event', 'dummy', 1)]);
  }

  getStoryEvent(id: number): Promise<StoryEvent> {
    return Promise.resolve(new StoryEvent('Story Event', 'dummy', 1));
  }

  getInitialMilestones(): Promise<Milestone[]> {
    return Promise.resolve([new Milestone(1, 'Milestone', 1, ComparableVisitorValue.EQ, 'test', MilestoneType.Basic)]);
  }

  getMilestone(id: number): Promise<Milestone> {
    return Promise.resolve(new Milestone(1, 'Milestone', 1, ComparableVisitorValue.EQ, 'test', MilestoneType.Basic));
  }

  getDefaultTimeline(): Promise<Timeline[]> {
    return Promise.resolve([new Timeline(1, new LanternEvent())]);
  }

  getSettlementLocations(): Promise<Location[]> {
    return Promise.resolve([new Location('Location', 'dummy',
      new Map<Equipment, Map<string | Innovation, [number]>>(), false)]);
  }

  getLocation(name: string): Promise<Location> {
    return Promise.resolve(new Location(name, 'dummy',
      new Map<Equipment, Map<string | Innovation, [number]>>(), false));
  }

  getInnovations(): Promise<Innovation[]> {
    return Promise.resolve([new Innovation('Innovation', 'dummy',
      InnovationTag.SCULPURE_CONSEQUENCE, [InnovationTag.FAITH], false)]);
  }

  getInnovation(name: string): Promise<Innovation> {
    return Promise.resolve(new Innovation(name, 'dummy', InnovationTag.SCULPURE_CONSEQUENCE,
      [InnovationTag.FAITH], false));
  }

  getInnovationsThatAreNotAddedButAvailable(objects: Innovation[]): Promise<Innovation[]> {
    return Promise.resolve(objects);
  }

  getDisorders(): Promise<Disorder[]> {
    return Promise.resolve([new Disorder('DISORDER', 'dummy')]);
  }

  getDisorder(name: string): Promise<Disorder> {
    return Promise.resolve(new Disorder(name, 'dummy'));
  }

  getFightingArts(): Promise<FightingArt[]> {
    return Promise.resolve([new FightingArt('FIGHTINGART', 'dummy')]);
  }

  getFightingArt(name: string): Promise<FightingArt> {
    return Promise.resolve(new FightingArt(name, 'dummy'));
  }

  getPrinciples(): Promise<Principle[]> {
    return Promise.resolve([new Principle('Principle', 'dummy', new PrincipleType('Dummy Type')),
      new Principle('Principle 2', 'dummy', new PrincipleType('Dummy Type'))]);
  }

  getPrinciple(name: string): Promise<Principle> {
    return Promise.resolve(new Principle(name, 'dummy', new PrincipleType('Dummy Type')));
  }

  getPrincipleTypes(): Promise<PrincipleType[]> {
    return Promise.resolve([new PrincipleType('Dummy Type')]);
  }

  getPrinciplesWithType(principleType: PrincipleType): Promise<Principle[]> {
    return this.getPrinciples();
  }

  getWeapons(): Promise<Weapon[]> {
    return Promise.resolve([new Weapon('Weapon', 'dummy', 1, [StorageTag.ITEM],
      new Map<Affinity, Direction[]>(), 1, 1, 1)]);
  }

  getArmors(): Promise<Armor[]> {
    return Promise.resolve([new Armor('Armor', 'dummy', 1, [StorageTag.ITEM],
      new Map<Affinity, Direction[]>(), 1, ArmorSpace.HEAD)]);
  }

  getEquipments(): Promise<Equipment[]> {
    return Promise.resolve([new Equipment('Armor', 'dummy', 1, [StorageTag.ITEM],
      new Map<Affinity, Direction[]>())]);
  }

  getAllExistingEquipmentItems(): Promise<[Weapon[], Armor[], Equipment[]]> {
    return Promise.all<Weapon[], Armor[], Equipment[]>([this.getWeapons(), this.getArmors(), this.getEquipments()]);
  }

  getEquipment(name: string): Promise<Equipment> {
    return Promise.resolve(new Equipment(name, 'dummy', 1, [StorageTag.ITEM],
      new Map<Affinity, Direction[]>()));
  }

  getAllSevereInjuries(): Promise<SevereInjury[]> {
    return Promise.resolve([new SevereInjury('SevereInjury', 'dummy', 1, 2, ArmorSpace.BODY)]);
  }

  getSevereInjuriesToHitLocation(hitLocation: string): Promise<SevereInjury[]> {
    return this.getAllSevereInjuries();
  }

  getAllBrainTraumas(): Promise<DiceThrow[]> {
    return Promise.resolve([new DiceThrow('DiceThrow', 'dummy', 1, 2)]);
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

  registerObserverForSurvivorHappenings(survivorPageComponent: SurvivorPageComponent): void {
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
          rows: [{}],
        },
      });
    });
  }
}
