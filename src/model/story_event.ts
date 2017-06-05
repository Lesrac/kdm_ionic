import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
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
}
