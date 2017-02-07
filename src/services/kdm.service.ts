import {Injectable} from "@angular/core";
import {Settlement} from "../models/settlement";
import {
  SETTLEMENTS, NEMESISMONSTERS, QUARRIES, EVENTS, DEFAULTTIMELINE,
  MILESTONES
} from "../mockups/default_settlement";
import {Monster} from "../models/monster";
import {LanternEvent} from "../models/lantern_event";
import {Timeline} from "../models/timeline";
import {Milestone} from "../models/milestone";
/**
 * Created by Daniel on 28.01.2017.
 */
@Injectable()
export class KDMService {

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
    return Promise.resolve(QUARRIES);
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

}
