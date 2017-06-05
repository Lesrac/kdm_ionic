import { Monster } from '../monster';
import { Resource } from '../resource';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
/**
 * Created by Daniel on 17.02.2017.
 */
@Entity()
export class MonsterResource {

  @ManyToOne(type => Monster, monster => monster.id)
  @JoinColumn()
  monster: Monster;
  @ManyToOne(type => Resource, resource => resource.name)
  @JoinColumn()
  resource: Resource;
  @Column('int')
  amount: number;

}
