import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
import {
  SETTLEMENTS, QUARRIES, EVENTS, DEFAULTTIMELINE,
  MILESTONES, SETTLEMENTLOCATIONS, MONSTERRESOURCES, RESSOURCES, INNOVATIONS, DISORDERS, FIGHTINGARTS, PRINCIPLES,
  PRINCIPLETYPES,
} from '../mockup/default_settlement';
import { Monster } from '../model/monster';
import { LanternEvent } from '../model/lantern_event';
import { Timeline } from '../model/timeline';
import { Milestone } from '../model/milestone';
import { Location } from '../model/location';
import { Resource } from '../model/resource';
import { Innovation } from '../model/innovation';
import { Disorder } from '../model/disorder';
import { FightingArt } from '../model/fighting_art';
import { Principle, PrincipleType } from '../model/principle';
import { KDMDBService } from './kdm_db.service';
import { KDMInitDBService } from './kdm_init_db.service';
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
    return Promise.resolve(RESSOURCES);
  }

  getEvents(): Promise<LanternEvent[]> {
    return Promise.resolve(EVENTS);
  }

  getInitialMilestones(): Promise<Milestone[]> {
    return this.kdmDB.getInitialMilestones();
  }

  getDefaultTimeline(): Promise<Timeline[]> {
    return Promise.resolve(DEFAULTTIMELINE);
  }

  getSettlementLocations(): Promise<Location[]> {
    return Promise.resolve(SETTLEMENTLOCATIONS);
  }

  getInnovations(): Promise<Innovation[]> {
    return Promise.resolve(INNOVATIONS);
  }

  getDisorders(): Promise<Disorder[]> {
    return Promise.resolve(DISORDERS);
  }

  getFightingArts(): Promise<FightingArt[]> {
    return Promise.resolve(FIGHTINGARTS);
  }

  getPrinciples(): Promise<Principle[]> {
    return Promise.resolve(PRINCIPLES);
  }

  getPrincipleTypes(): Promise<PrincipleType[]> {
    return Promise.resolve(PRINCIPLETYPES);
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
