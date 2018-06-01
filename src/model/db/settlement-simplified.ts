import { SettlementTimelineDB } from './settlement-timeline-db';
import { HuntableMonsterDB } from './huntable-monster-db';
import { HuntedMonsterDB } from './hunted-monster-db';
import { SettlementMilestoneDB } from './settlement-milestone-db';
import { SurvivorSimplified } from './survivor-simplified';

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
  survivors: SurvivorSimplified[] = [];
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
