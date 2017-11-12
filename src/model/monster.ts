import { Location } from './location';

/**
 * Created by Daniel on 28.01.2017.
 */
export class Monster {
  id: number;
  name: string;
  level: number = 1;
  isNemesis: boolean;
  resources: Map<number, Map<any, number>> = new Map<number, Map<any, number>>();
  rewardText: string;
  locations: Location[] = [];

}
