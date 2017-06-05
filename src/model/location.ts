import { Storage } from './storage';
import { BaseModel } from './base_model';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column, JoinTable, ManyToMany } from 'typeorm';
/**
 * Created by Daniel on 14.02.2017.
 */
@Entity()
export class Location extends BaseModel {
  @ManyToMany(type => Storage, storage => storage.name)
  @JoinTable()
  storages: Storage[] = [];
  @Column()
  isStartLocation: boolean;
}
