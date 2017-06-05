import { LanternEvent } from './lantern_event';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
/**
 * Created by Daniel on 27.01.2017.
 */
@Entity()
export class Timeline {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('int')
  position: number;
  @OneToOne(type => LanternEvent)
  @JoinColumn()
  lanternEvent: LanternEvent;
}
