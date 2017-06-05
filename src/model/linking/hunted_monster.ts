import { Settlement } from '../settlement';
import { Monster } from '../monster';
import { Storage } from '../storage';
import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
/**
 * Created by Daniel on 26.05.2017.
 */
@Entity()
export class HuntedMonster {
  @ManyToOne(type => Settlement, settlement => settlement.id)
  @JoinColumn()
  settlement: Settlement;
  @ManyToOne(type => Monster, monster => monster.id)
  @JoinColumn()
  monster: Monster;
  @ManyToMany(type => Storage, huntedResource => huntedResource.name)
  @JoinTable()
  huntedResources: Storage[] = [];

  constructor(settlement: Settlement, monster: Monster) {
    this.settlement = settlement;
    this.monster = monster;
  }
}
