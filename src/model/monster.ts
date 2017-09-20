import { MonsterResource } from './linking/monster_resource';
import { Storage } from './storage';
import { Settlement } from './settlement';
import { Resource } from './resource';

/**
 * Created by Daniel on 28.01.2017.
 */
export class Monster {
  id: number;
  name: string;
  level: number = 1;
  isNemesis: boolean;
  resources: Map<any, number> = new Map<any, number>();
  locations: Location[] = [];

  constructor(name: string, isNemesis = false) {
    this.name = name;
    this.isNemesis = isNemesis;
  }
}
