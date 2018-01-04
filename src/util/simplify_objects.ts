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
import { Survivor } from '../model/survivor';
import { SurvivorSimplified } from '../model/db/survivor_simplified';

export class SimplifyObjects {

  public static simplifySettlement(settlement: Settlement): SettlementSimplified {
    const simplifiedSettlement: SettlementSimplified = new SettlementSimplified(settlement.id, settlement.name,
      settlement.survivalLimit, settlement.population, settlement.deathcount, settlement.settlementLost);
    settlement.milestones.forEach(milestone =>
      simplifiedSettlement.milestones.push(SimplifyObjects.simplifySettlementMilestone(milestone)));
    settlement.timeline.forEach(timeline =>
      simplifiedSettlement.timeline.push(SimplifyObjects.simplifySettlementTimeline(timeline)));
    settlement.huntableMonsters.forEach(huntableMonster =>
      simplifiedSettlement.huntableMonsters.push(SimplifyObjects.simplifyHuntableMonster(huntableMonster)));
    settlement.huntedMonsters.forEach(huntedMonster =>
      simplifiedSettlement.huntedMonsters.push(SimplifyObjects.simplifyHuntedMonster(huntedMonster)));
    settlement.locations.forEach(location =>
      simplifiedSettlement.locationNames.push(location.name));
    settlement.innovations.forEach(innovation =>
      simplifiedSettlement.innovationNames.push(innovation.name));
    settlement.principles.forEach(principle =>
      simplifiedSettlement.principleNames.push(principle.name));
    settlement.storages.forEach((storage: Storage) =>
      simplifiedSettlement.storagesNameAmount.push([storage.name, storage.amount]));
    settlement.survivors.forEach(survivor =>
      simplifiedSettlement.survivors.push(SimplifyObjects.simplifySurvivor(survivor)));
    // todo simplify survivors
    return simplifiedSettlement;
  }

  public static simplifySurvivor(survivor: Survivor): SurvivorSimplified {
    const simplifiedSurvivor: SurvivorSimplified = new SurvivorSimplified(survivor.id, survivor.settlementId,
      survivor.name, survivor.isAlive, survivor.isMale, survivor.experience, survivor.survival, survivor.canDodge,
      survivor.canEncourage, survivor.canSurge, survivor.canDash, survivor.movement, survivor.accuracy,
      survivor.strength, survivor.evasion, survivor.luck, survivor.speed, survivor.insanity, survivor.isBrainDamaged,
      survivor.headArmor, survivor.headHeavyInjury, survivor.armsArmor, survivor.armsLightInjury,
      survivor.armsHeavyInjury, survivor.bodyArmor, survivor.bodyLightInjury, survivor.bodyHeavyInjury,
      survivor.waistArmor, survivor.waistLightInjury, survivor.waistHeavyInjury, survivor.legsArmor,
      survivor.legsLightInjury, survivor.legsHeavyInjury, survivor.cannotUseFightingArts, survivor.cannotSpendSurvival,
      survivor.skipNextHunt, survivor.oncePerLifetime, survivor.courage, survivor.understanding,
      survivor.weaponProficiencyType, survivor.weaponProficiencyXP, survivor.chosenBoldCourage,
      survivor.chosenInsightUnderstanding);
    survivor.fightingArts.forEach(fightingArt => simplifiedSurvivor.fightingArtNames.push(fightingArt.name));
    survivor.disorders.forEach(disorder => simplifiedSurvivor.disorderNames.push(disorder.name));
    survivor.characteristics.forEach(characteristic =>
      simplifiedSurvivor.characteristicNames.push(characteristic.name));
    return simplifiedSurvivor;
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
