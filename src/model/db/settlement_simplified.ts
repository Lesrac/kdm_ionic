import { SettlementTimelineDB } from './settlement_timeline_db';
import { HuntableMonsterDB } from './huntable_monster_db';
import { HuntedMonsterDB } from './hunted_monster_db';
import { Survivor } from '../survivor';
import { SettlementMilestoneDB } from './settlement_milestone_db';

/**
 * Created by Daniel on 18.10.2017.
 */
export class SettlementSimplified {
  id: number;
  name: string;
  survivalLimit: number = 0;
  population: number = 0;
  deathcount: number = 0;
  settlementLost: number = 0;
  timeline: SettlementTimelineDB[] = [];
  huntableMonsters: HuntableMonsterDB[] = [];
  huntedMonsters: HuntedMonsterDB[] = [];
  locationNames: string[] = [];
  storagesNameAmount: Array<[string, number]> = [];
  innovationNames: string[] = [];
  survivors: Survivor[] = [];
  milestones: SettlementMilestoneDB[] = [];
  principleNames: string[] = [];

  constructor(id: number, name: string, survivalLimit: number, population: number,
              deathcount: number, settlementLost: number) {
    this.id = id;
    this.name = name;
    this.survivalLimit = survivalLimit;
    this.population = population;
    this.deathcount = deathcount;
    this.settlementLost = settlementLost;
  }
}
