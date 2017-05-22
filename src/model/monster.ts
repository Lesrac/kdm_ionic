import { MonsterResource } from './linking/monster_resource';
import { Storage } from './storage';
import { Settlement } from './settlement';
/**
 * Created by Daniel on 28.01.2017.
 */
export class Monster {
  name: string;
  level: number = 1;
  isNemesis: boolean;
  huntingSettlements: Settlement[] = [];
  resources: MonsterResource[] = [];
  locations: Location[] = [];

  constructor(name: string, isNemesis = false) {
    this.name = name;
    this.isNemesis = isNemesis;
  }
}
