import { Settlement } from '../model/settlement';
import { Monster } from '../model/monster';
import { Resource, ResourceType } from '../model/resource';
import { MonsterResource } from '../model/linking/monster_resource';
import { HuntableMonster } from '../model/linking/huntable_monster';
import { HuntedMonster } from '../model/linking/hunted_monster';
import { Milestone, MilestoneType } from '../model/milestone';
import { StoryEvent } from '../model/story_event';
import { Principle, PrincipleType } from '../model/principle';
import { FightingArt } from '../model/fighting_art';
import { Disorder } from '../model/disorder';
import { Innovation, InnovationTag } from '../model/innovation';
import { Location } from '../model/location';
import { StorageTag } from '../model/storage';
import { LanternEvent } from '../model/lantern_event';
import { Timeline } from '../model/timeline';
import { Weapon } from '../model/weapon';
import { Armor, ArmorSpace } from '../model/armor';
import { Affinity, Direction, Equipment } from '../model/equipment';
import { SevereInjury } from '../model/severe_injury';
import { BrainTrauma } from '../model/brain_trauma';
import { DiceThrow } from '../model/dice_throw';
import { HuntEvent } from '../model/hunte_event';
import { BaseModel } from '../model/base_model';

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
    return settlement;
  }

  public static convertToMonsterObject(monsterJSON: any): Monster {
    const monster: Monster = {
      id: monsterJSON.id,
      name: monsterJSON.name,
      level: monsterJSON.level,
      isNemesis: monsterJSON.isNemesis,
      resources: new Map<number, Map<any, number>>(),
      locations: [], // todo monster locations
    };
    return monster;
  }

  public static convertToMonsterResourceObject(monsterResourceJSON: any, monster: Monster,
                                               resource: Resource): MonsterResource {
    const monsterResource: MonsterResource = {
      monster: monster,
      amount: monsterResourceJSON.amount,
      resource: resource,
    };
    return monsterResource;
  }

  public static convertToHuntableMonsterObject(huntableMonsterJSON: any): HuntableMonster {
    const huntableMonster: HuntableMonster = {
      monster: null, // todo MonsterID
      settlement: null, // todo SettlementID
      defeatedLevelOne: huntableMonsterJSON.DefeatedLevelOne === 'true',
      defeatedLevelTwo: huntableMonsterJSON.DefeatedLevelTwo === 'true',
      defeatedLevelThree: huntableMonsterJSON.DefeatedLevelThree === 'true',
      isHuntable: huntableMonsterJSON.IsHuntable === 'true',
    };
    return huntableMonster;
  }

  public static convertToHuntedMonsterObject(huntedMonsterJSON: any): HuntedMonster {
    const huntedMonster: HuntedMonster = {
      monster: null, // todo MonsterID
      settlement: null, // todo SettlementID
      huntedResources: null,
      addStorageItem: null,
    };
    return huntedMonster;
  }

  public static converToResourceObject(resourceJSON: any, tags: StorageTag[]): Resource {
    const resourceType: ResourceType = <ResourceType>ResourceType[<string>resourceJSON.type];
    const resource: Resource = {
      name: resourceJSON.name,
      type: resourceType,
      description: resourceJSON.description,
      existingCards: resourceJSON.existingCards,
      tags: tags,
      amount: resourceJSON.amount,
    };
    return resource;
  }

  public static convertToMilestoneObject(milestoneJSON: any, storyEvents: StoryEvent[]): Milestone {
    const milestone: Milestone = new Milestone((milestoneJSON.comparator != null ? milestoneJSON.comparator : ''));
    milestone.id = milestoneJSON.id;
    milestone.name = milestoneJSON.name;
    milestone.value = milestoneJSON.value;
    milestone.todo = milestoneJSON.todo;
    milestone.observerTarget = milestoneJSON.observerTarget != null ? milestoneJSON.observerTarget : '';
    milestone.tag = milestoneJSON.tag;
    milestone.milestoneType = <MilestoneType>MilestoneType[<string>milestoneJSON.milestoneType];
    milestone.storyEvents = storyEvents;
    return milestone;
  }

  public static convertToLanternEventObject(lanternEventJSON: any, storyEvents: StoryEvent[]): LanternEvent {
    const lanternEvent: LanternEvent = {
      name: lanternEventJSON.name,
      todo: lanternEventJSON.todo,
      storyEvents: storyEvents,
    };
    return lanternEvent;
  }

  public static convertToStoryEventObject(storyEventJSON: any): StoryEvent {
    const storyEvent: StoryEvent = {
      id: storyEventJSON.id,
      title: storyEventJSON.title,
      description: storyEventJSON.description,
    };
    return storyEvent;
  }

  public static convertToPrincipleTypeObject(principleTypeJSON: any): PrincipleType {
    const principleType: PrincipleType = {
      name: principleTypeJSON.name,
    };
    return principleType;
  }

  public static convertToPrincipleObject(principleJSON: any, principleType: PrincipleType): Principle {
    const principle: Principle = {
      name: principleJSON.name,
      description: principleJSON.description,
      type: principleType,
    };
    return principle;
  }

  public static convertToFightingArtObject(fightingArtJSON: any): FightingArt {
    const fightingArt: FightingArt = {
      name: fightingArtJSON.name,
      description: fightingArtJSON.description,
    };
    return fightingArt;
  }

  public static convertToDisorderObject(disorderJSON: any): Disorder {
    const disorder: Disorder = {
      name: disorderJSON.name,
      description: disorderJSON.description,
    };
    return disorder;
  }

  public static convertToInnovationObject(innovationJSON: any, tags: InnovationTag[]): Innovation {
    const consequence: InnovationTag = <InnovationTag>InnovationTag[<string>innovationJSON.consequence];
    const innovation: Innovation = {
      name: innovationJSON.name,
      description: innovationJSON.description,
      consequence: consequence,
      isBase: innovationJSON.isBase,
      tags: tags,
    };
    return innovation;
  }

  public static convertToLocationObject(locationJSON: any): Location {
    const location: Location = {
      name: locationJSON.name,
      description: locationJSON.description,
      storages: [], // TODO storages from location
      isStartLocation: locationJSON.isStartLocation,
    };
    return location;
  }

  public static convertToTimelineObject(timelineJSON: any, lanternEvent: LanternEvent): Timeline {
    const timeline: Timeline = {
      position: timelineJSON.position,
      lanternEvent: lanternEvent,
    };
    return timeline;
  }

  public static convertToWeaponObject(weaponJSON: any, tags: StorageTag[],
                                      affinities: Map<Affinity, Direction[]>): Weapon {
    const weapon: Weapon = {
      amount: weaponJSON.amount,
      tags: tags,
      description: weaponJSON.description,
      name: weaponJSON.name,
      affinities: affinities,
      speed: weaponJSON.speed,
      accuracy: weaponJSON.accuracy,
      strength: weaponJSON.strength,
    };
    return weapon;
  }

  public static convertToArmorObject(armorJSON: any, tags: StorageTag[],
                                     affinities: Map<Affinity, Direction[]>): Armor {
    const space: ArmorSpace = <ArmorSpace>ArmorSpace[<string>armorJSON.space];
    const armor: Armor = {
      amount: armorJSON.amount,
      tags: tags,
      description: armorJSON.description,
      name: armorJSON.name,
      affinities: affinities,
      space: space,
      value: armorJSON.value,
    };
    return armor;
  }

  public static convertToEquipmentObject(equipmentJSON: any, tags: StorageTag[],
                                         affinities: Map<Affinity, Direction[]>): Equipment {
    const equipeequipment: Equipment = {
      amount: equipmentJSON.amount,
      tags: tags,
      description: equipmentJSON.description,
      name: equipmentJSON.name,
      affinities: affinities,
    };
    return equipeequipment;
  }

  public static convertToSevereInjuryObject(severeInjuryJSON: any): SevereInjury {
    const hitLocation: ArmorSpace = <ArmorSpace>ArmorSpace[<string>severeInjuryJSON.hitLocation];
    const severeInjury: SevereInjury = {
      name: severeInjuryJSON.name,
      description: severeInjuryJSON.description,
      minRoll: severeInjuryJSON.minRoll,
      maxRoll: severeInjuryJSON.maxRoll,
      hitLocation: hitLocation,
    };
    return severeInjury;
  }

  public static convertToDiceThrowObject(diceThrowJSON: any): DiceThrow {
    const diceThrow: DiceThrow = {
      name: diceThrowJSON.name,
      description: diceThrowJSON.description,
      minRoll: diceThrowJSON.minRoll,
      maxRoll: diceThrowJSON.maxRoll,
    };
    return diceThrow;
  }

  public static convertToHuntEventObject(huntEventJSON: any): HuntEvent {
    const huntEvent: HuntEvent = {
      name: huntEventJSON.name,
      description: huntEventJSON.description,
      rollResult: huntEventJSON.rollResult,
    };
    return huntEvent;
  }

  public static convertToBaseModelObject(baseModelJSON: any): BaseModel {
    const baseModel: BaseModel = {
      name: baseModelJSON.name,
      description: baseModelJSON.description,
    };
    return baseModel;
  }

}
