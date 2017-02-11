import {Injectable} from "@angular/core";
import {Settlement} from "../model/settlement";
import {
  SETTLEMENTS, NEMESISMONSTERS, QUARRIES, EVENTS, DEFAULTTIMELINE,
  MILESTONES
} from "../mockup/default_settlement";
import {Monster} from "../model/monster";
import {LanternEvent} from "../model/lantern_event";
import {Timeline} from "../model/timeline";
import {Milestone} from "../model/milestone";
/**
 * Created by Daniel on 28.01.2017.
 */
@Injectable()
export class KDMDataService {

  static getSettlements(): Promise<Settlement[]> {
    return Promise.resolve(SETTLEMENTS);
  }

  static getSettlement(name: string): Promise<Settlement> {
    return Promise.resolve(SETTLEMENTS.find(settlement => settlement.name === name));
  }

  static addSettlement(settlement: Settlement): void {
    SETTLEMENTS.push(settlement);
  }

  static getNemesisMonsters(): Promise<Monster[]> {
    return Promise.resolve(NEMESISMONSTERS);
  }

  static getQuarries(): Promise<Monster[]> {
    return Promise.resolve(QUARRIES);
  }

  static getEvents(): Promise<LanternEvent[]> {
    return Promise.resolve(EVENTS);
  }

  static getMilestones(): Promise<Milestone[]> {
    return Promise.resolve(MILESTONES);
  }

  static getDefaultTimeline(): Promise<Timeline[]> {
    return Promise.resolve(DEFAULTTIMELINE);
  }

}
