import { BaseModel } from './base_model';
import { InnovationTag } from './innovation_tag';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
/**
 * Created by Daniel on 19.02.2017.
 */
@Entity()
export class Innovation extends BaseModel {
  @ManyToOne(type => InnovationTag)
  consequence: InnovationTag;
  @ManyToMany(type => InnovationTag)
  @JoinTable()
  tags: InnovationTag[];
  @Column()
  isBase: boolean;
}
