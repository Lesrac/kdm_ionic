import { FightingArt } from './fighting-art';
import { Disorder } from './disorder';
import { BaseModel } from './base-model';
import { Observer } from 'rxjs/Observer';
import { Equipment } from './equipment';
import { Subject } from 'rxjs/Subject';

/**
 * Created by Daniel on 24.02.2017.
 */
export class Survivor {
  id: number;
  settlementId: number;
  nameChanged: Subject<string> = new Subject<string>();
  isAliveChanged: Subject<boolean> = new Subject<boolean>();
  isMaleChanged: Subject<boolean> = new Subject<boolean>();
  experienceChanged: Subject<number> = new Subject<number>();
  survivalChanged: Subject<number> = new Subject<number>();
  canDodgeChanged: Subject<boolean> = new Subject<boolean>();
  canEncourageChanged: Subject<boolean> = new Subject<boolean>();
  canSurgeChanged: Subject<boolean> = new Subject<boolean>();
  canDashChanged: Subject<boolean> = new Subject<boolean>();
  movementChanged: Subject<number> = new Subject<number>();
  accuracyChanged: Subject<number> = new Subject<number>();
  strengthChanged: Subject<number> = new Subject<number>();
  evasionChanged: Subject<number> = new Subject<number>();
  luckChanged: Subject<number> = new Subject<number>();
  speedChanged: Subject<number> = new Subject<number>();
  insanityChanged: Subject<number> = new Subject<number>();
  isBrainDamagedChanged: Subject<boolean> = new Subject<boolean>();
  headArmorChanged: Subject<number> = new Subject<number>();
  headHeavyInjuryChanged: Subject<boolean> = new Subject<boolean>();
  armsArmorChanged: Subject<number> = new Subject<number>();
  armsLightInjuryChanged: Subject<boolean> = new Subject<boolean>();
  armsHeavyInjuryChanged: Subject<boolean> = new Subject<boolean>();
  bodyArmorChanged: Subject<number> = new Subject<number>();
  bodyLightInjuryChanged: Subject<boolean> = new Subject<boolean>();
  bodyHeavyInjuryChanged: Subject<boolean> = new Subject<boolean>();
  waistArmorChanged: Subject<number> = new Subject<number>();
  waistLightInjuryChanged: Subject<boolean> = new Subject<boolean>();
  waistHeavyInjuryChanged: Subject<boolean> = new Subject<boolean>();
  legsArmorChanged: Subject<number> = new Subject<number>();
  legsLightInjuryChanged: Subject<boolean> = new Subject<boolean>();
  legsHeavyInjuryChanged: Subject<boolean> = new Subject<boolean>();
  cannotUseFightingArtsChanged: Subject<boolean> = new Subject<boolean>();
  cannotSpendSurvivalChanged: Subject<boolean> = new Subject<boolean>();
  skipNextHuntChanged: Subject<boolean> = new Subject<boolean>();
  fightingArtsSizeChanged: Subject<number> = new Subject<number>();
  disordersSizeChanged: Subject<number> = new Subject<number>();
  characteristicsSizeChanged: Subject<number> = new Subject<number>();
  equipmentsSizeChanged: Subject<number> = new Subject<number>();
  oncePerLifetimeChanged: Subject<string> = new Subject<string>();
  courageChanged: Subject<number> = new Subject<number>();
  understandingChanged: Subject<number> = new Subject<number>();
  weaponProficiencyTypeChanged: Subject<string> = new Subject<string>();
  weaponProficiencyXPChanged: Subject<number> = new Subject<number>();
  chosenBoldCourageChanged: Subject<string> = new Subject<string>();
  chosenInsightUnderstandingChanged: Subject<string> = new Subject<string>();
  bleedingTokensChanged: Subject<number> = new Subject<number>();
  huntXPObserver1: Observer<Object>;
  huntXPObserver2: Observer<Object>;
  courageObserver1: Observer<Object>;
  courageObserver2: Observer<Object>;
  understandingObserver1: Observer<Object>;
  understandingObserver2: Observer<Object>;
  private _name: string;
  private _isAlive: boolean = true;
  private _isMale: boolean = true;
  private _experience: number = 0;
  private _survival: number = 0;
  private _canDodge: boolean = true;
  private _canEncourage: boolean = false;
  private _canSurge: boolean = false;
  private _canDash: boolean = false;
  private _movement: number = 5;
  private _accuracy: number = 0;
  private _strength: number = 0;
  private _evasion: number = 0;
  private _luck: number = 0;
  private _speed: number = 0;
  private _insanity: number = 0;
  private _isBrainDamaged: boolean = false;
  private _headArmor: number = 0;
  private _headHeavyInjury: boolean = false;
  private _armsArmor: number = 0;
  private _armsLightInjury: boolean = false;
  private _armsHeavyInjury: boolean = false;
  private _bodyArmor: number = 0;
  private _bodyLightInjury: boolean = false;
  private _bodyHeavyInjury: boolean = false;
  private _waistArmor: number = 0;
  private _waistLightInjury: boolean = false;
  private _waistHeavyInjury: boolean = false;
  private _legsArmor: number = 0;
  private _legsLightInjury: boolean = false;
  private _legsHeavyInjury: boolean = false;
  private _cannotUseFightingArts: boolean = false;
  private _cannotSpendSurvival: boolean = false;
  private _skipNextHunt: boolean = false;
  private _fightingArts: FightingArt[] = [];
  private _disorders: Disorder[] = [];
  private _oncePerLifetime: string = '';
  private _characteristics: BaseModel[] = [];
  private _equipments: Map<number, Equipment> = new Map<number, Equipment>();
  private _courage: number = 0;
  private _understanding: number = 0;
  private _weaponProficiencyType: string = '';
  private _weaponProficiencyXP: number = 0;
  private _chosenBoldCourage: string;
  private _chosenInsightUnderstanding: string;
  private _bleedingTokens: number = 0;

  constructor(name: string, id: number, settlementId: number) {
    this._name = name;
    this.id = id;
    this.settlementId = settlementId;
  }

  public addFightingArt(fightingArt: FightingArt): void {
    if (!fightingArt) {
      console.log('Survivor - addFightingArt: FightingArt is null');
      return;
    }
    this._fightingArts.push(fightingArt);
    this.fightingArtsSizeChanged.next(this._fightingArts.length);
  }

  public addDisorder(disorder: Disorder): void {
    if (!disorder) {
      console.log('Survivor - addDisorder: Disorder is null');
      return;
    }
    this._disorders.push(disorder);
    this.disordersSizeChanged.next(this._disorders.length);
  }

  public addCharacteristic(characteristic: BaseModel): void {
    if (!characteristic) {
      console.log('Survivor - addCharacteristic: BaseModel is null');
      return;
    }
    this._characteristics.push(characteristic);
    this.characteristicsSizeChanged.next(this._characteristics.length);
  }

  public addEquipment(key: number, value: Equipment): void {
    if (!key || !value) {
      console.log('Survivor - addEquipment: key or value is null');
      return;
    }
    this._equipments.set(key, value);
    this.equipmentsSizeChanged.next(this._equipments.size);
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this.nameChanged.next(value);
  }

  get isAlive(): boolean {
    return this._isAlive;
  }

  set isAlive(value: boolean) {
    this._isAlive = value;
    this.isAliveChanged.next(value);
  }

  get isMale(): boolean {
    return this._isMale;
  }

  set isMale(value: boolean) {
    this._isMale = value;
    this.isMaleChanged.next(value);
  }

  get experience(): number {
    return this._experience;
  }

  set experience(value: number) {
    this._experience = value;
    this.experienceChanged.next(value);
  }

  get survival(): number {
    return this._survival;
  }

  set survival(value: number) {
    this._survival = value;
    this.survivalChanged.next(value);
  }

  get canDodge(): boolean {
    return this._canDodge;
  }

  set canDodge(value: boolean) {
    this._canDodge = value;
    this.canDodgeChanged.next(value);
  }

  get canEncourage(): boolean {
    return this._canEncourage;
  }

  set canEncourage(value: boolean) {
    this._canEncourage = value;
    this.canEncourageChanged.next(value);
  }

  get canSurge(): boolean {
    return this._canSurge;
  }

  set canSurge(value: boolean) {
    this._canSurge = value;
    this.canSurgeChanged.next(value);
  }

  get canDash(): boolean {
    return this._canDash;
  }

  set canDash(value: boolean) {
    this._canDash = value;
    this.canDashChanged.next(value);
  }

  get movement(): number {
    return this._movement;
  }

  set movement(value: number) {
    this._movement = value;
    this.movementChanged.next(value);
  }

  get accuracy(): number {
    return this._accuracy;
  }

  set accuracy(value: number) {
    this._accuracy = value;
    this.accuracyChanged.next(value);
  }

  get strength(): number {
    return this._strength;
  }

  set strength(value: number) {
    this._strength = value;
    this.strengthChanged.next(value);
  }

  get evasion(): number {
    return this._evasion;
  }

  set evasion(value: number) {
    this._evasion = value;
    this.evasionChanged.next(value);
  }

  get luck(): number {
    return this._luck;
  }

  set luck(value: number) {
    this._luck = value;
    this.luckChanged.next(value);
  }

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
    this.speedChanged.next(value);
  }

  get insanity(): number {
    return this._insanity;
  }

  set insanity(value: number) {
    this._insanity = value;
    this.insanityChanged.next(value);
  }

  get isBrainDamaged(): boolean {
    return this._isBrainDamaged;
  }

  set isBrainDamaged(value: boolean) {
    this._isBrainDamaged = value;
    this.isBrainDamagedChanged.next(value);
  }

  get headArmor(): number {
    return this._headArmor;
  }

  set headArmor(value: number) {
    this._headArmor = value;
    this.headArmorChanged.next(value);
  }

  get headHeavyInjury(): boolean {
    return this._headHeavyInjury;
  }

  set headHeavyInjury(value: boolean) {
    this._headHeavyInjury = value;
    this.headHeavyInjuryChanged.next(value);
  }

  get armsArmor(): number {
    return this._armsArmor;
  }

  set armsArmor(value: number) {
    this._armsArmor = value;
    this.armsArmorChanged.next(value);
  }

  get armsLightInjury(): boolean {
    return this._armsLightInjury;
  }

  set armsLightInjury(value: boolean) {
    this._armsLightInjury = value;
    this.armsLightInjuryChanged.next(value);
  }

  get armsHeavyInjury(): boolean {
    return this._armsHeavyInjury;
  }

  set armsHeavyInjury(value: boolean) {
    this._armsHeavyInjury = value;
    this.armsHeavyInjuryChanged.next(value);
  }

  get bodyArmor(): number {
    return this._bodyArmor;
  }

  set bodyArmor(value: number) {
    this._bodyArmor = value;
    this.bodyArmorChanged.next(value);
  }

  get bodyLightInjury(): boolean {
    return this._bodyLightInjury;
  }

  set bodyLightInjury(value: boolean) {
    this._bodyLightInjury = value;
    this.bodyLightInjuryChanged.next(value);
  }

  get bodyHeavyInjury(): boolean {
    return this._bodyHeavyInjury;
  }

  set bodyHeavyInjury(value: boolean) {
    this._bodyHeavyInjury = value;
    this.bodyHeavyInjuryChanged.next(value);
  }

  get waistArmor(): number {
    return this._waistArmor;
  }

  set waistArmor(value: number) {
    this._waistArmor = value;
    this.waistArmorChanged.next(value);
  }

  get waistLightInjury(): boolean {
    return this._waistLightInjury;
  }

  set waistLightInjury(value: boolean) {
    this._waistLightInjury = value;
    this.waistLightInjuryChanged.next(value);
  }

  get waistHeavyInjury(): boolean {
    return this._waistHeavyInjury;
  }

  set waistHeavyInjury(value: boolean) {
    this._waistHeavyInjury = value;
    this.waistHeavyInjuryChanged.next(value);
  }

  get legsArmor(): number {
    return this._legsArmor;
  }

  set legsArmor(value: number) {
    this._legsArmor = value;
    this.legsArmorChanged.next(value);
  }

  get legsLightInjury(): boolean {
    return this._legsLightInjury;
  }

  set legsLightInjury(value: boolean) {
    this._legsLightInjury = value;
    this.legsLightInjuryChanged.next(value);
  }

  get legsHeavyInjury(): boolean {
    return this._legsHeavyInjury;
  }

  set legsHeavyInjury(value: boolean) {
    this._legsHeavyInjury = value;
    this.legsHeavyInjuryChanged.next(value);
  }

  get cannotUseFightingArts(): boolean {
    return this._cannotUseFightingArts;
  }

  set cannotUseFightingArts(value: boolean) {
    this._cannotUseFightingArts = value;
    this.cannotUseFightingArtsChanged.next(value);
  }

  get cannotSpendSurvival(): boolean {
    return this._cannotSpendSurvival;
  }

  set cannotSpendSurvival(value: boolean) {
    this._cannotSpendSurvival = value;
    this.cannotSpendSurvivalChanged.next(value);
  }

  get skipNextHunt(): boolean {
    return this._skipNextHunt;
  }

  set skipNextHunt(value: boolean) {
    this._skipNextHunt = value;
    this.skipNextHuntChanged.next(value);
  }

  get oncePerLifetime(): string {
    return this._oncePerLifetime;
  }

  set oncePerLifetime(value: string) {
    this._oncePerLifetime = value;
    this.oncePerLifetimeChanged.next(value);
  }

  get courage(): number {
    return this._courage;
  }

  set courage(value: number) {
    this._courage = value;
    this.courageChanged.next(value);
  }

  get understanding(): number {
    return this._understanding;
  }

  set understanding(value: number) {
    this._understanding = value;
    this.understandingChanged.next(value);
  }

  get weaponProficiencyType(): string {
    return this._weaponProficiencyType;
  }

  set weaponProficiencyType(value: string) {
    this._weaponProficiencyType = value;
    this.weaponProficiencyTypeChanged.next(value);
  }

  get weaponProficiencyXP(): number {
    return this._weaponProficiencyXP;
  }

  set weaponProficiencyXP(value: number) {
    this._weaponProficiencyXP = value;
    this.weaponProficiencyXPChanged.next(value);
  }

  get chosenBoldCourage(): string {
    return this._chosenBoldCourage;
  }

  set chosenBoldCourage(value: string) {
    this._chosenBoldCourage = value;
    this.chosenBoldCourageChanged.next(value);
  }

  get chosenInsightUnderstanding(): string {
    return this._chosenInsightUnderstanding;
  }

  set chosenInsightUnderstanding(value: string) {
    this._chosenInsightUnderstanding = value;
    this.chosenInsightUnderstandingChanged.next(value);
  }

  get fightingArts(): FightingArt[] {
    return this._fightingArts;
  }

  get disorders(): Disorder[] {
    return this._disorders;
  }

  get characteristics(): BaseModel[] {
    return this._characteristics;
  }

  get equipments(): Map<number, Equipment> {
    return this._equipments;
  }

  get bleedingTokens(): number {
    return this._bleedingTokens;
  }

  set bleedingTokens(value: number) {
    this._bleedingTokens = value;
  }
}
