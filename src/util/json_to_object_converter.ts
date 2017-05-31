import { Settlement } from '../model/settlement';
import { Monster } from '../model/monster';
/**
 * Created by Daniel on 31.05.2017.
 */
export class JsonToObjectConverter {

  public static convertToSettlementObject(settlementObject: any): Settlement {
    let settlement: Settlement = {
      id: settlementObject.ID,
      name: settlementObject.Name,
      survivalLimit: settlementObject.SurvivalLimit,
      population: settlementObject.Population,
      deathcount: settlementObject.DeathCount,
      settlementLost: settlementObject.SettlementLost,
      timeline: null,
      huntableMonsters: null,
      huntedMonsters: null,
      locations: null,
      storages: null,
      innovations: null,
      survivors: null,
      milestones: null,
      principles: null,
      addStorageItem: null,
    };
    return settlement;
  }

  public static convertToMonsterObject(monsterObject: any): Monster {
    let monster: Monster = {
      id: monsterObject.ID,
      name: monsterObject.Name,
      level: monsterObject.Level,
      isNemesis: monsterObject.IsNemesis === 'true',
      resources: null,
      locations: null,
    };
    console.log(monster.name);
    console.log(typeof monsterObject.IsNemesis);
    console.log(typeof monster.isNemesis);
    return monster;
  }

}
