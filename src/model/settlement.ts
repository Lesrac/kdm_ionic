import { Location } from './location';
import { Storage } from './storage';
import { Innovation } from './innovation';
import { Survivor } from './survivor';
import { SettlementTimeline } from './linking/settlement_timeline';
import { SettlementMilestone } from './linking/settlement_milestone';
import { Principle } from './principle';
import { HuntableMonster } from './linking/huntable_monster';
import { HuntedMonster } from './linking/hunted_monster';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
/**
 * Created by Daniel on 27.01.2017.
 */
@Entity()
export class Settlement {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('int')
  survivalLimit: number = 0;
  @Column('int')
  population: number = 0;
  @Column('int')
  deathcount: number = 0;
  @Column('int')
  settlementLost: number = 0;
  @OneToMany(type => SettlementTimeline, timeline => timeline.settlement.id)
  timeline: SettlementTimeline[] = [];
  @OneToMany(type => HuntableMonster, huntableMonster => huntableMonster.settlement.id)
  huntableMonsters: HuntableMonster[] = [];
  @OneToMany(type => HuntedMonster, huntedMonster => huntedMonster.settlement.id)
  huntedMonsters: HuntedMonster[] = [];
  @ManyToMany(type => Location, location => location.name)
  @JoinTable()
  locations: Location[] = [];
  storages: Storage[] = [];
  innovations: Innovation[] = [];
  survivors: Survivor[] = [];
  milestones: SettlementMilestone[] = [];
  principles: Principle[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addStorageItem(storage: Storage): void {
    if (!storage) {
      console.log('Settlement - addStorageItem: Storage is null');
      return;
    }
    const str = this.storages.find(storageL => storageL.name === storage.name);
    if (str) {
      str.amount++;
    } else {
      storage.amount = 1;
      this.storages.push(storage);
    }
  }

}
