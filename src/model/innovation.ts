import { BaseModel } from './base_model';
import { InnovationTag } from './innovation_tag';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, ManyToMany, ManyToOne } from 'typeorm';
/**
 * Created by Daniel on 19.02.2017.
 */
@Entity()
export class Innovation extends BaseModel {
  @ManyToOne(type => InnovationTag, innovationTag => innovationTag.name)
  consequence: InnovationTag;
  @ManyToMany(type => InnovationTag, innovationTags => innovationTags.name)
  tags: InnovationTag[];
  @Column()
  isBase: boolean;
}
