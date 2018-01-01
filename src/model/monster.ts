import { Location } from './location';

/**
 * Created by Daniel on 28.01.2017.
 */
export class Monster {
  id: number;
  name: string;
  isNemesis: boolean;
  resources: MonsterLevelResources[];
  rewardText: string;
  locations: Location[] = [];

}

export class MonsterLevelResources {
  level: number;
  resources: MonsterResourceAmount[];

  constructor(level: number, resources: MonsterResourceAmount[]) {
    this.level = level;
    this.resources = resources;
  }
}

export class MonsterResourceAmount {
  name: string;
  amount: number;

  constructor(name: string, amount: number) {
    console.log(name);
    this.name = name;
    this.amount = amount;
  }
}
