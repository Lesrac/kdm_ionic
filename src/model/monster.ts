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
}

export class MonsterResourceAmount {
  name: string;
  amount: number;
}
