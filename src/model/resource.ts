import { Storage } from './storage';
import { ResourceType } from './resource_type';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
/**
 * Created by Daniel on 08.02.2017.
 */
@Entity()
export class Resource extends Storage {
  @ManyToOne(type => ResourceType, resourceType => resourceType.name)
  @JoinColumn()
  type: ResourceType;
  @Column('int')
  existingCards: number;
}
