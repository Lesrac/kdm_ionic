import {Injectable} from "@angular/core";
import {Settlement} from "../model/settlement";
import {
  SETTLEMENTS, NEMESISMONSTERS, QUARRIES, EVENTS, DEFAULTTIMELINE,
  MILESTONES, SETTLEMENTLOCATIONS, MONSTERRESOURCES, RESSOURCES
} from "../mockup/default_settlement";
import {Monster} from "../model/monster";
import {LanternEvent} from "../model/lantern_event";
import {Timeline} from "../model/timeline";
import {Milestone} from "../model/milestone";
import {Location} from "../model/location";
import {Resource} from "../model/resource";
/**
 * Created by Daniel on 28.01.2017.
 */
@Injectable()
export class KDMDataService {

  getSettlements(): Promise<Settlement[]> {
    return Promise.resolve(SETTLEMENTS);
  }

  getSettlement(name: string): Promise<Settlement> {
    return Promise.resolve(SETTLEMENTS.find(settlement => settlement.name === name));
  }

  addSettlement(settlement: Settlement): void {
    SETTLEMENTS.push(settlement);
  }

  getNemesisMonsters(): Promise<Monster[]> {
    return Promise.resolve(NEMESISMONSTERS);
  }

  getQuarries(): Promise<Monster[]> {
    QUARRIES.forEach(monster => {
      MONSTERRESOURCES.forEach(resource => {
        if (resource.monster == monster) {
          monster.resources.push(resource);
        }
      })
    });
    return Promise.resolve(QUARRIES);
  }

  getResources(): Promise<Resource[]> {
    return Promise.resolve(RESSOURCES);
  }

  getEvents(): Promise<LanternEvent[]> {
    return Promise.resolve(EVENTS);
  }

  getMilestones(): Promise<Milestone[]> {
    return Promise.resolve(MILESTONES);
  }

  getDefaultTimeline(): Promise<Timeline[]> {
    return Promise.resolve(DEFAULTTIMELINE);
  }

  getSettlementLocations(): Promise<Location[]> {
    return Promise.resolve(SETTLEMENTLOCATIONS);
  }

}
