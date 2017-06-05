import { Equipment } from './equipment';
import { ArmorSpace } from './armor_space';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
/**
 * Created by Daniel on 20.02.2017.
 */
@Entity()
export class Armor extends Equipment {
  @Column()
  value: number;
  @ManyToOne(type => ArmorSpace, armorSpace => armorSpace.name)
  @JoinColumn()
  space: ArmorSpace;
}

