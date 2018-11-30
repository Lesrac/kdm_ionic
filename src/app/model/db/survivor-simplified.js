/**
 * Created by Daniel on 22.10.2017.
 */
export class SurvivorSimplified {
    constructor(id, settlementId, name, isAlive, isMale, experience, survival, canDodge, canEncourage, canSurge, canDash, movement, accuracy, strength, evasion, luck, speed, insanity, isBrainDamaged, headArmor, headHeavyInjury, armsArmor, armsLightInjury, armsHeavyInjury, bodyArmor, bodyLightInjury, bodyHeavyInjury, waistArmor, waistLightInjury, waistHeavyInjury, legsArmor, legsLightInjury, legsHeavyInjury, cannotUseFightingArts, cannotSpendSurvival, skipNextHunt, oncePerLifetime, courage, understanding, weaponProficiencyType, weaponProficiencyXP, chosenBoldCourage, chosenInsightUnderstanding) {
        this.isAlive = true;
        this.isMale = true;
        this.experience = 0;
        this.survival = 0;
        this.canDodge = true;
        this.canEncourage = false;
        this.canSurge = false;
        this.canDash = false;
        this.movement = 5;
        this.accuracy = 0;
        this.strength = 0;
        this.evasion = 0;
        this.luck = 0;
        this.speed = 0;
        this.insanity = 0;
        this.isBrainDamaged = false;
        this.headArmor = 0;
        this.headHeavyInjury = false;
        this.armsArmor = 0;
        this.armsLightInjury = false;
        this.armsHeavyInjury = false;
        this.bodyArmor = 0;
        this.bodyLightInjury = false;
        this.bodyHeavyInjury = false;
        this.waistArmor = 0;
        this.waistLightInjury = false;
        this.waistHeavyInjury = false;
        this.legsArmor = 0;
        this.legsLightInjury = false;
        this.legsHeavyInjury = false;
        this.cannotUseFightingArts = false;
        this.cannotSpendSurvival = false;
        this.skipNextHunt = false;
        this.fightingArtNames = [];
        this.disorderNames = [];
        this.characteristicNames = [];
        this.equipments = [];
        this.id = id;
        this.settlementId = settlementId;
        this.name = name;
        this.isAlive = isAlive;
        this.isMale = isMale;
        this.experience = experience;
        this.survival = survival;
        this.canDodge = canDodge;
        this.canEncourage = canEncourage;
        this.canSurge = canSurge;
        this.canDash = canDash;
        this.movement = movement;
        this.accuracy = accuracy;
        this.strength = strength;
        this.evasion = evasion;
        this.luck = luck;
        this.speed = speed;
        this.insanity = insanity;
        this.isBrainDamaged = isBrainDamaged;
        this.headArmor = headArmor;
        this.headHeavyInjury = headHeavyInjury;
        this.armsArmor = armsArmor;
        this.armsLightInjury = armsLightInjury;
        this.armsHeavyInjury = armsHeavyInjury;
        this.bodyArmor = bodyArmor;
        this.bodyLightInjury = bodyLightInjury;
        this.bodyHeavyInjury = bodyHeavyInjury;
        this.waistArmor = waistArmor;
        this.waistLightInjury = waistLightInjury;
        this.waistHeavyInjury = waistHeavyInjury;
        this.legsArmor = legsArmor;
        this.legsLightInjury = legsLightInjury;
        this.legsHeavyInjury = legsHeavyInjury;
        this.cannotUseFightingArts = cannotUseFightingArts;
        this.cannotSpendSurvival = cannotSpendSurvival;
        this.skipNextHunt = skipNextHunt;
        this.courage = courage;
        this.understanding = understanding;
        this.oncePerLifetime = oncePerLifetime;
        this.weaponProficiencyType = weaponProficiencyType;
        this.weaponProficiencyXP = weaponProficiencyXP;
        this.chosenBoldCourage = chosenBoldCourage;
        this.chosenInsightUnderstanding = chosenInsightUnderstanding;
    }
}
export class SurvivorEquipmentSimplified {
    constructor(position, equipmentName) {
        this.position = position;
        this.equipmentName = equipmentName;
    }
}
//# sourceMappingURL=survivor-simplified.js.map