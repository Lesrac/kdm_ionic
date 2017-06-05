import { Equipment } from './equipment';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column } from 'typeorm';
/**
 * Created by Daniel on 20.02.2017.
 */
@Entity()
export class Weapon extends Equipment {
  @Column('int')
  speed: number;
  @Column('int')
  accuracy: number;
  @Column('int')
  strength: number;
}
