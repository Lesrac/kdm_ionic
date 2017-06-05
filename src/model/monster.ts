import { MonsterResource } from './linking/monster_resource';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
/**
 * Created by Daniel on 28.01.2017.
 */
@Entity()
export class Monster {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('int')
  level: number = 1;
  @Column()
  isNemesis: boolean;
  @OneToMany(type => MonsterResource, monsterResource => monsterResource.monster)
  resources: MonsterResource[] = [];

  constructor(name: string, isNemesis = false) {
    this.name = name;
    this.isNemesis = isNemesis;
  }
}
