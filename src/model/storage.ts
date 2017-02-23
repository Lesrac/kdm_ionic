/**
 * Created by Daniel on 08.02.2017.
 */
export class Storage {
  name: string;
  description: string;
  amount: number;
  tags: StorageTag[];
}

export enum StorageTag {
  bone,
  organ,
  consumable,
  hide,
  scrap,
  weapon,
  melee,
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
