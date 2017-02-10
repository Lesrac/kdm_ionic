import {Resource} from "./resource";
/**
 * Created by Daniel on 28.01.2017.
 */
export class Monster {
  name: string;
  level: number = 1;
  isNemesis: boolean;
  isHuntable: boolean;
  defeatedLevelOne: boolean = false;
  defeatedLevelTwo: boolean = false;
  defeatedLevelThree: boolean = false;
  resources: [[Resource, number]];
  huntedResources: Resource[] = [];

  constructor(name: string, isHuntable = false, isNemesis = false) {
    this.name = name;
    this.isHuntable = isHuntable;
    this.isNemesis = isNemesis;
  }
}
