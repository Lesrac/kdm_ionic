import { FightingArt } from './fighting_art';
import { Disorder } from './disorder';
import { Characteristic } from './characteristic';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
/**
 * Created by Daniel on 24.02.2017.
 */
@Entity()
export class Survivor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  isAlive: boolean = true;
  @Column()
  isMale: boolean = true;
  @Column()
  experience: number = 0;
  @Column()
  survival: number = 0;
  @Column()
  canDodge: boolean = true;
  @Column()
  canEncourage: boolean = false;
  @Column()
  canSurge: boolean = false;
  @Column()
  canDash: boolean = false;
  @Column()
  movement: number = 5;
  @Column()
  accuracy: number = 0;
  @Column()
  strength: number = 0;
  @Column()
  evasion: number = 0;
  @Column()
  luck: number = 0;
  @Column()
  speed: number = 0;
  @Column()
  insanity: number = 0;
  @Column()
  isBrainDamaged: boolean = false;
  @Column()
  headArmor: number = 0;
  @Column()
  headHeavyInjury: boolean = false;
  @Column()
  armsArmor: number = 0;
  @Column()
  armsLightInjury: boolean = false;
  @Column()
  armsHeavyInjury: boolean = false;
  @Column()
  bodyArmor: number = 0;
  @Column()
  bodyLightInjury: boolean = false;
  @Column()
  bodyHeavyInjury: boolean = false;
  @Column()
  waistArmor: number = 0;
  @Column()
  waistLightInjury: boolean = false;
  @Column()
  waistHeavyInjury: boolean = false;
  @Column()
  legsArmor: number = 0;
  @Column()
  legsLightInjury: boolean = false;
  @Column()
  legsHeavyInjury: boolean = false;
  @Column()
  cannotUseFightingArts: boolean = false;
  @Column()
  cannotSpendSurvival: boolean = false;
  @Column()
  skipNextHunt: boolean = false;
  @ManyToMany(type => FightingArt, fightingArt => fightingArt.name)
  @JoinTable()
  fightingArts: FightingArt[] = [];
  @ManyToMany(type => Disorder, disorder => disorder.name)
  @JoinTable()
  disorders: Disorder[] = [];
  @ManyToMany(type => Characteristic, characteristic => characteristic.name)
  @JoinTable()
  characteristics: Characteristic[];

  constructor(name: string) {
    this.name = name;
  }
}
