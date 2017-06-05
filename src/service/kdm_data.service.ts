import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
import { Monster } from '../model/monster';
import { LanternEvent } from '../model/lantern_event';
import { Timeline } from '../model/timeline';
import { Milestone } from '../model/milestone';
import { Location } from '../model/location';
import { Resource } from '../model/resource';
import { Innovation } from '../model/innovation';
import { Disorder } from '../model/disorder';
import { FightingArt } from '../model/fighting_art';
import { Principle } from '../model/principle';
import { KDMDBService } from './kdm_db.service';
import { PrincipleType } from '../model/principle_type';
/**
 * Created by Daniel on 28.01.2017.
 */
@Injectable()
export class KDMDataService {

  constructor(private kdmDB: KDMDBService) {
  }

  getSettlements(): Promise<Settlement[]> {
    return this.kdmDB.getSettlements();
  }

  addSettlement(settlement: Settlement): Promise<Settlement> {
    return this.kdmDB.saveSettlement(settlement);
  }

  removeSettlement(settlement: Settlement): void {
    this.kdmDB.removeSettlement(settlement);
  }

  getMonsters(): Promise<Monster[]> {
    return this.kdmDB.getMonsters();
  }

  getDefaultInitialHuntableNemesisMonsters(): Promise<Monster[]> {
    return this.kdmDB.getAllInitialNemesisMonsters();
  }

  getDefaultInitialHuntableQuarries(): Promise<Monster[]> {
    return this.kdmDB.getAllInitialQuarries();
  }

  getResources(): Promise<Resource[]> {
    return null;
  }

  getEvents(): Promise<LanternEvent[]> {
    return null;
  }

  getInitialMilestones(): Promise<Milestone[]> {
    return this.kdmDB.getInitialMilestones();
  }

  getDefaultTimeline(): Promise<Timeline[]> {
    return null;
  }

  getSettlementLocations(): Promise<Location[]> {
    return null;
  }

  getInnovations(): Promise<Innovation[]> {
    return null;
  }

  getDisorders(): Promise<Disorder[]> {
    return null;
  }

  getFightingArts(): Promise<FightingArt[]> {
    return null;
  }

  getPrinciples(): Promise<Principle[]> {
    return null;
  }

  getPrincipleTypes(): Promise<PrincipleType[]> {
    return null;
  }

  getPrinciplesWithType(principleType: PrincipleType): Promise<Principle[]> {
    return Promise.resolve(this.getPrinciples().then(principles =>
      principles.filter(principle => principle.type === principleType),
    ));
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
