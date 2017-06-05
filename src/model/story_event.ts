import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LanternEvent } from './lantern_event';
/**
 * Created by Daniel on 05.02.2017.
 */
@Entity()
export class StoryEvent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @ManyToOne(type => LanternEvent, lanternEvent => lanternEvent.storyEvents)
  lanternEvents: LanternEvent;
}
