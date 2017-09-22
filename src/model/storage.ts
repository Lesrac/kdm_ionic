import { BaseModel } from './base_model';

export enum StorageTag {
  ammunition,
  armor,
  arrow,
  axe,
  bone,
  bow,
  organ,
  consumable,
  hide,
  flammable,
  scrap,
  heavy,
  instrument,
  noisy,
  jewelry,
  other,
  katar,
  set,
  spear,
  rawhide,
  fur,
  two_handed,
  weapon,
  melee,
  shield,
  leather,
  sword,
  fragile,
  dagger,
  tool,
  item,
  ranged,
  thrown,
  whip,
}

/**
 * Created by Daniel on 08.02.2017.
 */
export class Storage extends BaseModel {
  amount: number;
  tags: StorageTag[];
}
