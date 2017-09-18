import { BaseModel } from './base_model';

/**
 * Created by Daniel on 08.02.2017.
 */
export class Storage extends BaseModel {
  amount: number;
  tags: StorageTag[];
}

export enum StorageTag {
  bone,
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
  two_handed,
  weapon,
  melee,
  shield,
  leather,
  sword,
  axe,
  armor,
  fragile,
  dagger,
  tool,
  item,
  ranged,
  thrown,
}
