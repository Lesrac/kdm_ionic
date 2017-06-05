import { BaseModel } from './base_model';
import { StorageTag } from './storage_tag';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinTable, ManyToMany } from 'typeorm';
/**
 * Created by Daniel on 08.02.2017.
 */
@Entity()
export class Storage extends BaseModel {
  @Column('int')
  amount: number;
  @ManyToMany(type => StorageTag, storageTag => storageTag.name)
  @JoinTable()
  tags: StorageTag[];
}
