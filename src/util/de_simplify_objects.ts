/**
 * Created by Daniel on 18.10.2017.
 */
import { Settlement } from '../model/settlement';
import { SettlementSimplified } from '../model/db/settlement_simplified';
import { SettlementMilestoneDB } from '../model/db/settlement_milestone_db';
import { SettlementMilestone } from '../model/linking/settlement_milestone';
import { HuntableMonster } from '../model/linking/huntable_monster';
import { HuntableMonsterDB } from '../model/db/huntable_monster_db';
import { SettlementTimelineDB } from '../model/db/settlement_timeline_db';
import { SettlementTimeline } from '../model/linking/settlement_timeline';
import { HuntedMonster } from '../model/linking/hunted_monster';
import { HuntedMonsterDB } from '../model/db/hunted_monster_db';
import { Storage } from '../model/storage';

export class DeSimplifyObjects {

  public static simplifySettlement(settlement: Settlement): SettlementSimplified {
    const simplifiedSettlement: SettlementSimplified = new SettlementSimplified(settlement.id, settlement.name,
      settlement.survivalLimit, settlement.population, settlement.deathcount, settlement.settlementLost);
    settlement.milestones.forEach(milestone =>
      simplifiedSettlement.milestones.push(DeSimplifyObjects.simplifySettlementMilestone(milestone)));
    settlement.timeline.forEach(timeline =>
      simplifiedSettlement.timeline.push(DeSimplifyObjects.simplifySettlementTimeline(timeline)));
    settlement.huntableMonsters.forEach(huntableMonster =>
      simplifiedSettlement.huntableMonsters.push(DeSimplifyObjects.simplifyHuntableMonster(huntableMonster)));
    settlement.huntedMonsters.forEach(huntedMonster =>
      simplifiedSettlement.huntedMonsters.push(DeSimplifyObjects.simplifyHuntedMonster(huntedMonster)));
    settlement.locations.forEach(location =>
      simplifiedSettlement.locationNames.push(location.name));
    settlement.innovations.forEach(innovation =>
      simplifiedSettlement.innovationNames.push(innovation.name));
    settlement.principles.forEach(principle =>
      simplifiedSettlement.principleNames.push(principle.name));
    settlement.storages.forEach((storage: Storage) =>
      simplifiedSettlement.storagesNameAmount.push([storage.name, storage.amount]));

    // todo simplify survivors
    return simplifiedSettlement;
  }

  public static simplifySettlementMilestone(settlementMilestone: SettlementMilestone): SettlementMilestoneDB {
    return {
      milestoneId: settlementMilestone.milestone.id,
      settlementId: settlementMilestone.settlement.id,
      reached: settlementMilestone.reached,
    };
  }

  public static simplifySettlementTimeline(settlementTimeline: SettlementTimeline): SettlementTimelineDB {
    const lanternEvent = settlementTimeline.timeline.lanternEvent;
    return new SettlementTimelineDB(settlementTimeline.settlement.id, [settlementTimeline.timeline.position,
      lanternEvent ? lanternEvent.name : ''], settlementTimeline.reached);
  }

  public static simplifyHuntableMonster(huntableMonster: HuntableMonster): HuntableMonsterDB {
    return new HuntableMonsterDB(huntableMonster.settlement.id, huntableMonster.monster.id, huntableMonster.isHuntable,
      huntableMonster.defeatedLevelOne, huntableMonster.defeatedLevelTwo, huntableMonster.defeatedLevelThree);
  }

  public static simplifyHuntedMonster(huntedMonster: HuntedMonster): HuntedMonsterDB {
    const huntedResources: Array<[string, number]> = [];
    huntedMonster.huntedResources.forEach(storage => huntedResources.push([storage.name, storage.amount]));
    return new HuntedMonsterDB(huntedMonster.settlement.id, huntedMonster.monster.id, huntedMonster.monsterLevel,
      huntedResources);
  }

}
