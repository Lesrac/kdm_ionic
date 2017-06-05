import { BaseModel } from './base_model';
import { PrincipleType } from './principle_type';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { JoinColumn, ManyToOne } from 'typeorm';
/**
 * Created by Daniel on 23.04.2017.
 */
@Entity()
export class Principle extends BaseModel {
  @ManyToOne(type => PrincipleType, principleType => principleType.name)
  @JoinColumn()
  type: PrincipleType;
}

/*
 export enum PrincipleType {
 CONVICTION,
 SOCIETY,
 NEW_LIFE,
 DEATH,
 } */
