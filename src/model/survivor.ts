import { FightingArt } from './fighting_art';
import { Disorder } from './disorder';
import { BaseModel } from './base_model';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

/**
 * Created by Daniel on 24.02.2017.
 */
export class Survivor {
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
  fightingArts: FightingArt[] = [];
  disorders: Disorder[] = [];
  characteristics: BaseModel[] = [];
  oncePerLifetime: string = '';
  courage: number = 0;
  understanding: number = 0;
  weaponProficiencyType: string = '';
  weaponProficiencyXP: number = 0;
  chosenBoldCourage: string;
  chosenInsightUnderstanding: string;
  huntXPObserver1: Observer<Object>;
  huntXPObserver2: Observer<Object>;
  huntXPObserver3: Observer<Object>;
  huntXPObserver4: Observer<Object>;
  huntXPObserver5: Observer<Object>;
  courageObserver1: Observer<Object>;
  courageObserver2: Observer<Object>;
  understandingObserver1: Observer<Object>;
  understandingObserver2: Observer<Object>;

  constructor(name: string, id: number, settlementId: number) {
    this.name = name;
    this.id = id;
    this.settlementId = settlementId;
  }
}
