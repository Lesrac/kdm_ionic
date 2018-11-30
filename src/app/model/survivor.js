import { Subject } from 'rxjs';
/**
 * Created by Daniel on 24.02.2017.
 */
export class Survivor {
    constructor(name, id, settlementId) {
        this.nameChanged = new Subject();
        this.isAliveChanged = new Subject();
        this.isMaleChanged = new Subject();
        this.experienceChanged = new Subject();
        this.survivalChanged = new Subject();
        this.canDodgeChanged = new Subject();
        this.canEncourageChanged = new Subject();
        this.canSurgeChanged = new Subject();
        this.canDashChanged = new Subject();
        this.movementChanged = new Subject();
        this.accuracyChanged = new Subject();
        this.strengthChanged = new Subject();
        this.evasionChanged = new Subject();
        this.luckChanged = new Subject();
        this.speedChanged = new Subject();
        this.insanityChanged = new Subject();
        this.isBrainDamagedChanged = new Subject();
        this.headArmorChanged = new Subject();
        this.headHeavyInjuryChanged = new Subject();
        this.armsArmorChanged = new Subject();
        this.armsLightInjuryChanged = new Subject();
        this.armsHeavyInjuryChanged = new Subject();
        this.bodyArmorChanged = new Subject();
        this.bodyLightInjuryChanged = new Subject();
        this.bodyHeavyInjuryChanged = new Subject();
        this.waistArmorChanged = new Subject();
        this.waistLightInjuryChanged = new Subject();
        this.waistHeavyInjuryChanged = new Subject();
        this.legsArmorChanged = new Subject();
        this.legsLightInjuryChanged = new Subject();
        this.legsHeavyInjuryChanged = new Subject();
        this.cannotUseFightingArtsChanged = new Subject();
        this.cannotSpendSurvivalChanged = new Subject();
        this.skipNextHuntChanged = new Subject();
        this.fightingArtsSizeChanged = new Subject();
        this.disordersSizeChanged = new Subject();
        this.characteristicsSizeChanged = new Subject();
        this.equipmentsSizeChanged = new Subject();
        this.oncePerLifetimeChanged = new Subject();
        this.courageChanged = new Subject();
        this.understandingChanged = new Subject();
        this.weaponProficiencyTypeChanged = new Subject();
        this.weaponProficiencyXPChanged = new Subject();
        this.chosenBoldCourageChanged = new Subject();
        this.chosenInsightUnderstandingChanged = new Subject();
        this.bleedingTokensChanged = new Subject();
        this._isAlive = true;
        this._isMale = true;
        this._experience = 0;
        this._survival = 0;
        this._canDodge = true;
        this._canEncourage = false;
        this._canSurge = false;
        this._canDash = false;
        this._movement = 5;
        this._accuracy = 0;
        this._strength = 0;
        this._evasion = 0;
        this._luck = 0;
        this._speed = 0;
        this._insanity = 0;
        this._isBrainDamaged = false;
        this._headArmor = 0;
        this._headHeavyInjury = false;
        this._armsArmor = 0;
        this._armsLightInjury = false;
        this._armsHeavyInjury = false;
        this._bodyArmor = 0;
        this._bodyLightInjury = false;
        this._bodyHeavyInjury = false;
        this._waistArmor = 0;
        this._waistLightInjury = false;
        this._waistHeavyInjury = false;
        this._legsArmor = 0;
        this._legsLightInjury = false;
        this._legsHeavyInjury = false;
        this._cannotUseFightingArts = false;
        this._cannotSpendSurvival = false;
        this._skipNextHunt = false;
        this._fightingArts = [];
        this._disorders = [];
        this._oncePerLifetime = '';
        this._characteristics = [];
        this._equipments = new Map();
        this._courage = 0;
        this._understanding = 0;
        this._weaponProficiencyType = '';
        this._weaponProficiencyXP = 0;
        this._bleedingTokens = 0;
        this._name = name;
        this.id = id;
        this.settlementId = settlementId;
    }
    addFightingArt(fightingArt) {
        if (!fightingArt) {
            console.log('Survivor - addFightingArt: FightingArt is null');
            return;
        }
        this._fightingArts.push(fightingArt);
        this.fightingArtsSizeChanged.next(this._fightingArts.length);
    }
    addDisorder(disorder) {
        if (!disorder) {
            console.log('Survivor - addDisorder: Disorder is null');
            return;
        }
        this._disorders.push(disorder);
        this.disordersSizeChanged.next(this._disorders.length);
    }
    addCharacteristic(characteristic) {
        if (!characteristic) {
            console.log('Survivor - addCharacteristic: BaseModel is null');
            return;
        }
        this._characteristics.push(characteristic);
        this.characteristicsSizeChanged.next(this._characteristics.length);
    }
    addEquipment(key, value) {
        if (!key || !value) {
            console.log('Survivor - addEquipment: key or value is null');
            return;
        }
        this._equipments.set(key, value);
        this.equipmentsSizeChanged.next(this._equipments.size);
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        this.nameChanged.next(value);
    }
    get isAlive() {
        return this._isAlive;
    }
    set isAlive(value) {
        this._isAlive = value;
        this.isAliveChanged.next(value);
    }
    get isMale() {
        return this._isMale;
    }
    set isMale(value) {
        this._isMale = value;
        this.isMaleChanged.next(value);
    }
    get experience() {
        return this._experience;
    }
    set experience(value) {
        this._experience = value;
        this.experienceChanged.next(value);
    }
    get survival() {
        return this._survival;
    }
    set survival(value) {
        this._survival = value;
        this.survivalChanged.next(value);
    }
    get canDodge() {
        return this._canDodge;
    }
    set canDodge(value) {
        this._canDodge = value;
        this.canDodgeChanged.next(value);
    }
    get canEncourage() {
        return this._canEncourage;
    }
    set canEncourage(value) {
        this._canEncourage = value;
        this.canEncourageChanged.next(value);
    }
    get canSurge() {
        return this._canSurge;
    }
    set canSurge(value) {
        this._canSurge = value;
        this.canSurgeChanged.next(value);
    }
    get canDash() {
        return this._canDash;
    }
    set canDash(value) {
        this._canDash = value;
        this.canDashChanged.next(value);
    }
    get movement() {
        return this._movement;
    }
    set movement(value) {
        this._movement = value;
        this.movementChanged.next(value);
    }
    get accuracy() {
        return this._accuracy;
    }
    set accuracy(value) {
        this._accuracy = value;
        this.accuracyChanged.next(value);
    }
    get strength() {
        return this._strength;
    }
    set strength(value) {
        this._strength = value;
        this.strengthChanged.next(value);
    }
    get evasion() {
        return this._evasion;
    }
    set evasion(value) {
        this._evasion = value;
        this.evasionChanged.next(value);
    }
    get luck() {
        return this._luck;
    }
    set luck(value) {
        this._luck = value;
        this.luckChanged.next(value);
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
        this.speedChanged.next(value);
    }
    get insanity() {
        return this._insanity;
    }
    set insanity(value) {
        this._insanity = value;
        this.insanityChanged.next(value);
    }
    get isBrainDamaged() {
        return this._isBrainDamaged;
    }
    set isBrainDamaged(value) {
        this._isBrainDamaged = value;
        this.isBrainDamagedChanged.next(value);
    }
    get headArmor() {
        return this._headArmor;
    }
    set headArmor(value) {
        this._headArmor = value;
        this.headArmorChanged.next(value);
    }
    get headHeavyInjury() {
        return this._headHeavyInjury;
    }
    set headHeavyInjury(value) {
        this._headHeavyInjury = value;
        this.headHeavyInjuryChanged.next(value);
    }
    get armsArmor() {
        return this._armsArmor;
    }
    set armsArmor(value) {
        this._armsArmor = value;
        this.armsArmorChanged.next(value);
    }
    get armsLightInjury() {
        return this._armsLightInjury;
    }
    set armsLightInjury(value) {
        this._armsLightInjury = value;
        this.armsLightInjuryChanged.next(value);
    }
    get armsHeavyInjury() {
        return this._armsHeavyInjury;
    }
    set armsHeavyInjury(value) {
        this._armsHeavyInjury = value;
        this.armsHeavyInjuryChanged.next(value);
    }
    get bodyArmor() {
        return this._bodyArmor;
    }
    set bodyArmor(value) {
        this._bodyArmor = value;
        this.bodyArmorChanged.next(value);
    }
    get bodyLightInjury() {
        return this._bodyLightInjury;
    }
    set bodyLightInjury(value) {
        this._bodyLightInjury = value;
        this.bodyLightInjuryChanged.next(value);
    }
    get bodyHeavyInjury() {
        return this._bodyHeavyInjury;
    }
    set bodyHeavyInjury(value) {
        this._bodyHeavyInjury = value;
        this.bodyHeavyInjuryChanged.next(value);
    }
    get waistArmor() {
        return this._waistArmor;
    }
    set waistArmor(value) {
        this._waistArmor = value;
        this.waistArmorChanged.next(value);
    }
    get waistLightInjury() {
        return this._waistLightInjury;
    }
    set waistLightInjury(value) {
        this._waistLightInjury = value;
        this.waistLightInjuryChanged.next(value);
    }
    get waistHeavyInjury() {
        return this._waistHeavyInjury;
    }
    set waistHeavyInjury(value) {
        this._waistHeavyInjury = value;
        this.waistHeavyInjuryChanged.next(value);
    }
    get legsArmor() {
        return this._legsArmor;
    }
    set legsArmor(value) {
        this._legsArmor = value;
        this.legsArmorChanged.next(value);
    }
    get legsLightInjury() {
        return this._legsLightInjury;
    }
    set legsLightInjury(value) {
        this._legsLightInjury = value;
        this.legsLightInjuryChanged.next(value);
    }
    get legsHeavyInjury() {
        return this._legsHeavyInjury;
    }
    set legsHeavyInjury(value) {
        this._legsHeavyInjury = value;
        this.legsHeavyInjuryChanged.next(value);
    }
    get cannotUseFightingArts() {
        return this._cannotUseFightingArts;
    }
    set cannotUseFightingArts(value) {
        this._cannotUseFightingArts = value;
        this.cannotUseFightingArtsChanged.next(value);
    }
    get cannotSpendSurvival() {
        return this._cannotSpendSurvival;
    }
    set cannotSpendSurvival(value) {
        this._cannotSpendSurvival = value;
        this.cannotSpendSurvivalChanged.next(value);
    }
    get skipNextHunt() {
        return this._skipNextHunt;
    }
    set skipNextHunt(value) {
        this._skipNextHunt = value;
        this.skipNextHuntChanged.next(value);
    }
    get oncePerLifetime() {
        return this._oncePerLifetime;
    }
    set oncePerLifetime(value) {
        this._oncePerLifetime = value;
        this.oncePerLifetimeChanged.next(value);
    }
    get courage() {
        return this._courage;
    }
    set courage(value) {
        this._courage = value;
        this.courageChanged.next(value);
    }
    get understanding() {
        return this._understanding;
    }
    set understanding(value) {
        this._understanding = value;
        this.understandingChanged.next(value);
    }
    get weaponProficiencyType() {
        return this._weaponProficiencyType;
    }
    set weaponProficiencyType(value) {
        this._weaponProficiencyType = value;
        this.weaponProficiencyTypeChanged.next(value);
    }
    get weaponProficiencyXP() {
        return this._weaponProficiencyXP;
    }
    set weaponProficiencyXP(value) {
        this._weaponProficiencyXP = value;
        this.weaponProficiencyXPChanged.next(value);
    }
    get chosenBoldCourage() {
        return this._chosenBoldCourage;
    }
    set chosenBoldCourage(value) {
        this._chosenBoldCourage = value;
        this.chosenBoldCourageChanged.next(value);
    }
    get chosenInsightUnderstanding() {
        return this._chosenInsightUnderstanding;
    }
    set chosenInsightUnderstanding(value) {
        this._chosenInsightUnderstanding = value;
        this.chosenInsightUnderstandingChanged.next(value);
    }
    get fightingArts() {
        return this._fightingArts;
    }
    get disorders() {
        return this._disorders;
    }
    get characteristics() {
        return this._characteristics;
    }
    get equipments() {
        return this._equipments;
    }
    get bleedingTokens() {
        return this._bleedingTokens;
    }
    set bleedingTokens(value) {
        this._bleedingTokens = value;
    }
}
//# sourceMappingURL=survivor.js.map