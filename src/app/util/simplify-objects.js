import { SettlementSimplified } from '../model/db/settlement-simplified';
import { HuntableMonsterDB } from '../model/db/huntable-monster-db';
import { SettlementTimelineDB } from '../model/db/settlement-timeline-db';
import { HuntedMonsterDB } from '../model/db/hunted-monster-db';
import { SurvivorEquipmentSimplified, SurvivorSimplified } from '../model/db/survivor-simplified';
export class SimplifyObjects {
    static simplifySettlement(settlement) {
        const simplifiedSettlement = new SettlementSimplified(settlement.id, settlement.name, settlement.survivalLimit, settlement.population, settlement.deathcount, settlement.settlementLost);
        settlement.milestones.forEach(milestone => simplifiedSettlement.milestones.push(SimplifyObjects.simplifySettlementMilestone(milestone)));
        settlement.timeline.forEach(timeline => simplifiedSettlement.timeline.push(SimplifyObjects.simplifySettlementTimeline(timeline)));
        settlement.huntableMonsters.forEach(huntableMonster => simplifiedSettlement.huntableMonsters.push(SimplifyObjects.simplifyHuntableMonster(huntableMonster)));
        settlement.huntedMonsters.forEach(huntedMonster => simplifiedSettlement.huntedMonsters.push(SimplifyObjects.simplifyHuntedMonster(huntedMonster)));
        settlement.locations.forEach(location => simplifiedSettlement.locationNames.push(location.name));
        settlement.innovations.forEach(innovation => simplifiedSettlement.innovationNames.push(innovation.name));
        settlement.principles.forEach(principle => simplifiedSettlement.principleNames.push(principle.name));
        settlement.storages.forEach((storage) => simplifiedSettlement.storagesNameAmount.push([storage.name, storage.amount]));
        settlement.survivors.forEach(survivor => simplifiedSettlement.survivors.push(SimplifyObjects.simplifySurvivor(survivor)));
        // todo simplify survivors
        return simplifiedSettlement;
    }
    static simplifySurvivor(survivor) {
        const simplifiedSurvivor = new SurvivorSimplified(survivor.id, survivor.settlementId, survivor.name, survivor.isAlive, survivor.isMale, survivor.experience, survivor.survival, survivor.canDodge, survivor.canEncourage, survivor.canSurge, survivor.canDash, survivor.movement, survivor.accuracy, survivor.strength, survivor.evasion, survivor.luck, survivor.speed, survivor.insanity, survivor.isBrainDamaged, survivor.headArmor, survivor.headHeavyInjury, survivor.armsArmor, survivor.armsLightInjury, survivor.armsHeavyInjury, survivor.bodyArmor, survivor.bodyLightInjury, survivor.bodyHeavyInjury, survivor.waistArmor, survivor.waistLightInjury, survivor.waistHeavyInjury, survivor.legsArmor, survivor.legsLightInjury, survivor.legsHeavyInjury, survivor.cannotUseFightingArts, survivor.cannotSpendSurvival, survivor.skipNextHunt, survivor.oncePerLifetime, survivor.courage, survivor.understanding, survivor.weaponProficiencyType, survivor.weaponProficiencyXP, survivor.chosenBoldCourage, survivor.chosenInsightUnderstanding);
        survivor.fightingArts.forEach(fightingArt => simplifiedSurvivor.fightingArtNames.push(fightingArt.name));
        survivor.disorders.forEach(disorder => simplifiedSurvivor.disorderNames.push(disorder.name));
        survivor.characteristics.forEach(characteristic => simplifiedSurvivor.characteristicNames.push(characteristic.name));
        survivor.equipments.forEach((value, key) => {
            simplifiedSurvivor.equipments.push(new SurvivorEquipmentSimplified(key, value.name));
        });
        return simplifiedSurvivor;
    }
    static simplifySettlementMilestone(settlementMilestone) {
        return {
            milestoneId: settlementMilestone.milestone.id,
            settlementId: settlementMilestone.settlement.id,
            reached: settlementMilestone.reached,
        };
    }
    static simplifySettlementTimeline(settlementTimeline) {
        const lanternEvent = settlementTimeline.timeline.lanternEvent;
        return new SettlementTimelineDB(settlementTimeline.settlement.id, [settlementTimeline.timeline.position,
            lanternEvent ? lanternEvent.name : ''], settlementTimeline.reached);
    }
    static simplifyHuntableMonster(huntableMonster) {
        return new HuntableMonsterDB(huntableMonster.settlement.id, huntableMonster.monster.id, huntableMonster.isHuntable, huntableMonster.defeatedLevelOne, huntableMonster.defeatedLevelTwo, huntableMonster.defeatedLevelThree);
    }
    static simplifyHuntedMonster(huntedMonster) {
        const huntedResources = [];
        huntedMonster.huntedResources.forEach(storage => huntedResources.push([storage.name, storage.amount]));
        return new HuntedMonsterDB(huntedMonster.settlement.id, huntedMonster.monster.id, huntedMonster.monsterLevel, huntedResources);
    }
}
//# sourceMappingURL=simplify-objects.js.map