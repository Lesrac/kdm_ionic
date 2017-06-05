import { Settlement } from '../model/settlement';
import { Monster } from '../model/monster';
import { Resource } from '../model/resource';
import { MonsterResource } from '../model/linking/monster_resource';
import { HuntableMonster } from '../model/linking/huntable_monster';
import { HuntedMonster } from '../model/linking/hunted_monster';
import { Milestone } from '../model/milestone';
/**
 * Created by Daniel on 31.05.2017.
 */
export class JsonToObjectConverter {

  public static convertToSettlementObject(settlementJSON: any): Settlement {
    const settlement: Settlement = {
      id: settlementJSON.ID,
      name: settlementJSON.Name,
      survivalLimit: settlementJSON.SurvivalLimit,
      population: settlementJSON.Population,
      deathcount: settlementJSON.DeathCount,
      settlementLost: settlementJSON.SettlementLost,
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
    console.log(settlementJSON);
    return settlement;
  }

  public static convertToMonsterObject(monsterJSON: any): Monster {
    const monster: Monster = {
      id: monsterJSON.ID,
      name: monsterJSON.Name,
      level: monsterJSON.Level,
      isNemesis: monsterJSON.IsNemesis === 'true',
      resources: null,
      locations: null,
    };
    return monster;
  }

  public static convertToHuntableMonsterObject(huntableMonsterJSON: any): HuntableMonster {
    const huntableMonster: HuntableMonster = {
      monster: null, // MonsterID
      settlement: null, // SettlementID
      defeatedLevelOne: huntableMonsterJSON.DefeatedLevelOne === 'true',
      defeatedLevelTwo: huntableMonsterJSON.DefeatedLevelTwo === 'true',
      defeatedLevelThree: huntableMonsterJSON.DefeatedLevelThree === 'true',
      isHuntable: huntableMonsterJSON.IsHuntable === 'true',
    };
    return huntableMonster;
  }

  public static convertToHuntedMonsterObject(huntedMonsterJSON: any): HuntedMonster {
    const huntedMonster: HuntedMonster = {
      monster: null, // MonsterID
      settlement: null, // SettlementID
      huntedResources: null,
    };
    return huntedMonster;
  }

  public static converToResourceObject(resourceJSON: any): Resource {
    const resource: Resource = {
      name: resourceJSON.Name,
      type: resourceJSON.ResourceType,
      description: resourceJSON.Description,
      existingCards: resourceJSON.ExistingCards,
      tags: null,
      amount: resourceJSON.Amount,
    };
    return resource;
  }

  public static convertToMonsterResourceObject(monsterResourceJSON: any): MonsterResource {
    const monsterResource: MonsterResource = {
      monster: null, // MonsterID
      resource: null, // ResourceName
      amount: monsterResourceJSON.Amount,
    };
    return monsterResource;
  }

  public static convertToMilestoneObject(milestoneJSON: any): Milestone {
    const milestone: Milestone = new Milestone(milestoneJSON.Comparator);
    milestone.id = milestoneJSON.ID;
    milestone.value = milestoneJSON.Value;
    milestone.observerTarget = milestoneJSON.ObserverTarget;
    milestone.tag = milestoneJSON.Tag;
    return milestone;
  }
}
