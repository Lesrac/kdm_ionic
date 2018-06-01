import { Location } from './location';
import { Storage } from './storage';
import { Innovation } from './innovation';
import { Survivor } from './survivor';
import { SettlementTimeline } from './linking/settlement-timeline';
import { SettlementMilestone } from './linking/settlement-milestone';
import { Principle } from './principle';
import { HuntableMonster } from './linking/huntable-monster';
import { HuntedMonster } from './linking/hunted-monster';
import { Subject } from 'rxjs/Subject';

/**
 * Created by Daniel on 27.01.2017.
 */
export class Settlement {
  id: number;
  nameChange: Subject<string> = new Subject<string>();
  survivalLimitChange: Subject<number> = new Subject<number>();
  populationChange: Subject<number> = new Subject<number>();
  deathcountChange: Subject<number> = new Subject<number>();
  settlementLostChange: Subject<number> = new Subject<number>();
  timelineSizeChanged: Subject<number> = new Subject<number>();
  huntableMonstersSizeChanged: Subject<number> = new Subject<number>();
  huntedMonstersSizeChanged: Subject<number> = new Subject<number>();
  locationsSizeChanged: Subject<number> = new Subject<number>();
  storagesSizeChanged: Subject<number> = new Subject<number>();
  innovationsSizeChanged: Subject<number> = new Subject<number>();
  survivorsSizeChanged: Subject<number> = new Subject<number>();
  milestonesSizeChanged: Subject<number> = new Subject<number>();
  principlesSizeChanged: Subject<number> = new Subject<number>();
  private _name: string;
  private _survivalLimit: number = 0;
  private _population: number = 0;
  private _deathcount: number = 0;
  private _settlementLost: number = 0;
  private _timeline: SettlementTimeline[] = [];
  private _huntableMonsters: HuntableMonster[] = [];
  private _huntedMonsters: HuntedMonster[] = [];
  private _locations: Location[] = [];
  private _storages: Storage[] = [];
  private _innovations: Innovation[] = [];
  private _milestones: SettlementMilestone[] = [];
  private _survivors: Survivor[] = [];
  private _principles: Principle[] = [];

  constructor(name: string) {
    this._name = name;
  }

  public addStorageItem(storage: Storage): void {
    if (!storage) {
      console.log('Settlement - addStorageItem: Storage is null');
      return;
    }
    const str = this._storages.find(storageL => storageL.name === storage.name);
    if (str) {
      str.amount++;
    } else {
      storage.amount = 1;
      this._storages.push(storage);
      this.storagesSizeChanged.next(this._storages.length);
    }
  }

  public addTimelineItem(timeline: SettlementTimeline): void {
    if (!timeline) {
      console.log('Settlement - addTimelineItem: Timeline is null');
      return;
    }
    this._timeline.push(timeline);
    this.timelineSizeChanged.next(this._timeline.length);
  }

  public addHuntableMonster(huntableMonster: HuntableMonster): void {
    if (!huntableMonster) {
      console.log('Settlement - addHuntableMonster: HuntableMonster is null');
      return;
    }
    this._huntableMonsters.push(huntableMonster);
    this.huntableMonstersSizeChanged.next(this._huntableMonsters.length);
  }

  public addHuntedMonster(huntedMonster: HuntedMonster): void {
    if (!huntedMonster) {
      console.log('Settlement - addHuntedMonster: HuntedMonster is null');
      return;
    }
    this._huntedMonsters.push(huntedMonster);
    this.huntableMonstersSizeChanged.next(this._huntedMonsters.length);
  }

  public addInnovation(innovation: Innovation): void {
    if (!innovation) {
      console.log('Settlement - addInnovation: Innovation is null');
      return;
    }
    this._innovations.push(innovation);
    this.innovationsSizeChanged.next(this._innovations.length);
  }

  public addSurvivor(survivor: Survivor): void {
    if (!survivor) {
      console.log('Settlement - addSurvivor: Survivor is null');
      return;
    }
    this._survivors.push(survivor);
    this.survivorsSizeChanged.next(this._survivors.length);
  }

  public addLocation(location: Location): void {
    if (!location) {
      console.log('Settlement - addLocation: Location is null');
      return;
    }
    this._locations.push(location);
    this.locationsSizeChanged.next(this._locations.length);
  }

  public addMilestone(milestone: SettlementMilestone): void {
    if (!milestone) {
      console.log('Settlement - addMilestone: SettlementMilestone is null');
      return;
    }
    this._milestones.push(milestone);
    this.milestonesSizeChanged.next(this._milestones.length);
  }

  public addPrinciple(principle: Principle): void {
    if (!principle) {
      console.log('Settlement - addPrinciple: Principle is null');
      return;
    }
    this._principles.push(principle);
    this.principlesSizeChanged.next(this._principles.length);
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this.nameChange.next(value);
  }

  get survivalLimit(): number {
    return this._survivalLimit;
  }

  set survivalLimit(value: number) {
    this._survivalLimit = value;
    this.survivalLimitChange.next(value);
  }

  get deathcount(): number {
    return this._deathcount;
  }

  set deathcount(value: number) {
    this._deathcount = value;
    this.deathcountChange.next(value);
  }

  get settlementLost(): number {
    return this._settlementLost;
  }

  set settlementLost(value: number) {
    this._settlementLost = value;
    this.settlementLostChange.next(value);
  }

  get population(): number {
    return this._population;
  }

  set population(value: number) {
    this._population = value;
    this.populationChange.next(value);
  }

  get timeline(): SettlementTimeline[] {
    return this._timeline;
  }

  get huntableMonsters(): HuntableMonster[] {
    return this._huntableMonsters;
  }

  get huntedMonsters(): HuntedMonster[] {
    return this._huntedMonsters;
  }

  get locations(): Location[] {
    return this._locations;
  }

  get storages(): Storage[] {
    return this._storages;
  }

  get innovations(): Innovation[] {
    return this._innovations;
  }

  get survivors(): Survivor[] {
    return this._survivors;
  }

  get milestones(): SettlementMilestone[] {
    return this._milestones;
  }

  get principles(): Principle[] {
    return this._principles;
  }
}
