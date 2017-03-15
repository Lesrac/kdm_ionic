"use strict";
/**
 * Created by Daniel on 24.02.2017.
 */
var Survivor = (function () {
    function Survivor(name) {
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
        this.fightingArts = [];
        this.disorders = [];
        this.name = name;
        this.id = Survivor.counter++;
    }
    Survivor.counter = 0;
    return Survivor;
}());
exports.Survivor = Survivor;
