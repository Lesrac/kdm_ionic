import { Settlement } from '../model/settlement';
import { Monster } from '../model/monster';
import { Resource, ResourceType } from '../model/resource';
import { MonsterResource } from '../model/linking/monster_resource';
import { HuntableMonster } from '../model/linking/huntable_monster';
import { HuntedMonster } from '../model/linking/hunted_monster';
import { Milestone } from '../model/milestone';
import { StoryEvent } from '../model/story_event';
import { Principle, PrincipleType } from '../model/principle';
import { FightingArt } from '../model/fighting_art';
import { Disorder } from '../model/disorder';
import { Innovation, InnovationTag } from '../model/innovation';
import { Location } from '../model/location';
import { StorageTag } from '../model/storage';
import { LanternEvent } from '../model/lantern_event';
import { Timeline } from '../model/timeline';

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
      id: monsterJSON.id,
      name: monsterJSON.name,
      level: monsterJSON.level,
      isNemesis: monsterJSON.isNemesis,
      resources: null,
      locations: null,
    };
    return monster;
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
    };
    return huntedMonster;
  }

  public static converToResourceObject(resourceJSON: any, tags: StorageTag[]): Resource {
    let resourceType: ResourceType = <ResourceType>ResourceType[<string>resourceJSON.type];
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

  public static convertToMonsterResourceObject(monsterResourceJSON: any): MonsterResource {
    const monsterResource: MonsterResource = {
      monster: null, // todo MonsterID
      resource: null, // todo ResourceName
      amount: monsterResourceJSON.Amount,
    };
    return monsterResource;
  }

  public static convertToMilestoneObject(milestoneJSON: any, storyEvents: StoryEvent[]): Milestone {
    const milestone: Milestone = new Milestone(milestoneJSON.comparator);
    milestone.id = milestoneJSON.id;
    milestone.name = milestoneJSON.name;
    milestone.value = milestoneJSON.value;
    milestone.observerTarget = milestoneJSON.observerTarget;
    milestone.tag = milestoneJSON.tag;
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

  public static convertToPrincipleObject(principleJSON: any): Principle {
    const principle: Principle = {
      name: principleJSON.name,
      description: principleJSON.description,
      type: principleJSON.type,
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
    let consequence: InnovationTag = <InnovationTag>InnovationTag[<string>innovationJSON.consequence];
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
      storages: [], //TODO storages from location
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
}
