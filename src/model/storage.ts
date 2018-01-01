import { BaseModel } from './base_model';

export enum StorageTag {
  AMMUNITION = 'AMMUNITION',
  ARMOR = 'ARMOR',
  ARROW = 'ARROW',
  AXE = 'AXE',
  BONE = 'BONE',
  BOW = 'BOW',
  CONSUMABLE = 'CONSUMABLE',
  DAGGER = 'DAGGER',
  FLAMMABLE = 'FLAMMABLE',
  FRAGILE = 'FRAGILE',
  FUR = 'FUR',
  HEAVY = 'HEAVY',
  HIDE = 'HIDE',
  INSTRUMENT = 'INSTRUMENT',
  IRON = 'IRON',
  ITEM = 'ITEM',
  JEWELRY = 'JEWELRY',
  KATAR = 'KATAR',
  LEATHER = 'LEATHER',
  MELEE = 'MELEE',
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
  SPEAR = 'SPEAR',
  SWORD = 'SWORD',
  THROWN = 'THROWN',
  TOOL = 'TOOL',
  TWO_HANDED = 'TWO_HANDED',
  WEAPON = 'WEAPON',
  WHIP = 'WHIP',
}

/**
 * Created by Daniel on 08.02.2017.
 */
export class Storage extends BaseModel {
  amount: number;
  tags: StorageTag[];
}
