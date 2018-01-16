import { BaseModel } from './base_model';

export enum StorageTag {
  AMMUNITION = 'AMMUNITION',
  ARMOR = 'ARMOR',
  ARROW = 'ARROW',
  AXE = 'AXE',
  BALM = 'BALM',
  BONE = 'BONE',
  BOW = 'BOW',
  CLUB = 'CLUB',
  CONSUMABLE = 'CONSUMABLE',
  DAGGER = 'DAGGER',
  FEATHER = 'FEATHER',
  FINESSE = 'FINESSE',
  FLAMMABLE = 'FLAMMABLE',
  FRAGILE = 'FRAGILE',
  FUR = 'FUR',
  GRAND_WEAPON = 'GRAND WEAPON',
  HEAVY = 'HEAVY',
  HERB = 'HERB',
  HIDE = 'HIDE',
  INSTRUMENT = 'INSTRUMENT',
  IRON = 'IRON',
  ITEM = 'ITEM',
  JEWELRY = 'JEWELRY',
  KATANA = 'KATANA',
  KATAR = 'KATAR',
  LANTERN = 'LANTERN',
  LEATHER = 'LEATHER',
  MASK = 'MASK',
  MELEE = 'MELEE',
  METAL = 'METAL',
  NOISY = 'NOISY',
  ORGAN = 'ORGAN',
  OTHER = 'OTHER',
  PICKAXE = 'PICKAXE',
  RANGED = 'RANGED',
  RAWHIDE = 'RAWHIDE',
  SCRAP = 'SCRAP',
  SET = 'SET',
  SHIELD = 'SHIELD',
  SICKLE = 'SICKLE',
  SKULL = 'SKULL',
  SOLUBLE = 'SOLUBLE',
  SPEAR = 'SPEAR',
  STINKY = 'STINKY',
  STONE = 'STONE',
  SWORD = 'SWORD',
  THROWN = 'THROWN',
  TOOL = 'TOOL',
  TWO_HANDED = 'TWO-HANDED',
  WEAPON = 'WEAPON',
  WHIP = 'WHIP',
}

/**
 * Created by Daniel on 08.02.2017.
 */
export class Storage extends BaseModel {
  amount: number;
  tags: StorageTag[];

  constructor(name: string, description: string, amount: number, tags: StorageTag[]) {
    super(name, description);
    this.amount = amount;
    this.tags = tags;
  }
}
