/**
 * Created by Daniel on 22.10.2017.
 */
export class SurvivorSimplified {
  id: number;
  settlementId: number;
  name: string;
  isAlive: boolean = true;
  isMale: boolean = true;
  experience: number = 0;
  survival: number = 0;
  canDodge: boolean = true;
  canEncourage: boolean = false;
  canSurge: boolean = false;
  canDash: boolean = false;
  movement: number = 5;
  accuracy: number = 0;
  strength: number = 0;
  evasion: number = 0;
  luck: number = 0;
  speed: number = 0;
  insanity: number = 0;
  isBrainDamaged: boolean = false;
  headArmor: number = 0;
  headHeavyInjury: boolean = false;
  armsArmor: number = 0;
  armsLightInjury: boolean = false;
  armsHeavyInjury: boolean = false;
  bodyArmor: number = 0;
  bodyLightInjury: boolean = false;
  bodyHeavyInjury: boolean = false;
  waistArmor: number = 0;
  waistLightInjury: boolean = false;
  waistHeavyInjury: boolean = false;
  legsArmor: number = 0;
  legsLightInjury: boolean = false;
  legsHeavyInjury: boolean = false;
  cannotUseFightingArts: boolean = false;
  cannotSpendSurvival: boolean = false;
  skipNextHunt: boolean = false;
  fightingArtNames: string[] = [];
  disorderNames: string[] = [];
  characteristicNames: string[];
  oncePerLifetime: string;
  courage: number;
  understanding: number;
  weaponProficiencyType: string;
  weaponProficiencyXP: number;
  chosenBoldCourage: string;
  chosenInsightUnderstanding: string;

  constructor(id: number, settlementId: number, name: string, isAlive: boolean, isMale: boolean, experience: number,
              survival: number, canDodge: boolean, canEncourage: boolean, canSurge: boolean, canDash: boolean,
              movement: number, accuracy: number, strength: number, evasion: number, luck: number, speed: number,
              insanity: number, isBrainDamaged: boolean, headArmor: number, headHeavyInjury: boolean, armsArmor: number,
              armsLightInjury: boolean, armsHeavyInjury: boolean, bodyArmor: number, bodyLightInjury: boolean,
              bodyHeavyInjury: boolean, waistArmor: number, waistLightInjury: boolean, waistHeavyInjury: boolean,
              legsArmor: number, legsLightInjury: boolean, legsHeavyInjury: boolean, cannotUseFightingArts: boolean,
              cannotSpendSurvival: boolean, skipNextHunt: boolean, oncePerLifetime: string, courage: number,
              understanding: number, weaponProficiencyType: string, weaponProficiencyXP: number,
              chosenBoldCourage: string, chosenInsightUnderstanding: string) {
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
