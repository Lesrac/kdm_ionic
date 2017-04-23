import { BaseModel } from './base_model';
/**
 * Created by Daniel on 23.04.2017.
 */
export class Principle extends BaseModel {
  type: PrincipleType;
}

export class PrincipleType {
  name: string;
}
/*
 export enum PrincipleType {
 CONVICTION,
 SOCIETY,
 NEW_LIFE,
 DEATH,
 } */
