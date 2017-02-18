import {Monster} from "./monster";
import {Storage} from "./storage";
import {ResourceType} from "./resource_type";
/**
 * Created by Daniel on 17.02.2017.
 */
export class MonsterResource {

  monster: Monster;
  storage: Storage;
  resourceType: ResourceType;
  amount: number;
  monsterLevel: number;

}
