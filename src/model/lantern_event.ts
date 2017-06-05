import { StoryEvent } from './story_event';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
/**
 * Created by Daniel on 27.01.2017.
 */
@Entity()
export class LanternEvent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  todo: string;
  @OneToMany(type => StoryEvent, storyEvent => storyEvent.id)
  @JoinColumn()
  storyEvents: StoryEvent[] = [];

  constructor(name = '') {
    this.name = name;
  }
}
