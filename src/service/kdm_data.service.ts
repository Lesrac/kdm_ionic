import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
import { Http } from '@angular/http';
import { Monster } from '../model/monster';
import { LanternEvent } from '../model/lantern_event';
import { Timeline } from '../model/timeline';
import { Milestone } from '../model/milestone';
import { Location } from '../model/location';
import { Resource, ResourceType } from '../model/resource';
import { Innovation, InnovationTag } from '../model/innovation';
import { Disorder } from '../model/disorder';
import { FightingArt } from '../model/fighting_art';
import { Principle, PrincipleType } from '../model/principle';
import { JsonToObjectConverter } from '../util/json_to_object_converter';
import { StoryEvent } from '../model/story_event';
import { Storage, StorageTag } from '../model/storage';
import { Weapon } from '../model/weapon';
import { Armor } from '../model/armor';
import { Affinity, Direction, Equipment } from '../model/equipment';
import { isUndefined } from 'ionic-angular/util/util';

/**
 * Created by Daniel on 28.01.2017.
 */

type JsonToObjectConverterMethod = (n: string) => any;

@Injectable()
export class KDMDataService {

  settlements: Settlement[] = [];

  constructor(private http: Http) {
  }

  getSettlements(): Promise<Settlement[]> {
    return Promise.resolve(this.settlements);
  }

  addSettlement(settlement: Settlement): void {
    this.getSettlements().then(settlements => {
      if (settlements.length > 0) {
        settlement.id = Math.max.apply(Math, settlements.map(s => s.id)) + 1;
      } else {
        settlement.id = 1;
      }
      this.settlements.push(settlement);
    });
  }

  removeSettlement(settlement: Settlement): void {
    this.settlements.splice(this.settlements.indexOf(settlement), 1);
  }

  getMonsters(): Promise<Monster[]> {
    return this.http.get('assets/data/monsters.json').toPromise()
      .then(
        res => {
          let data: Monster[] = [];
          res.json().forEach(monsterJson => {
            const monster: Monster = JsonToObjectConverter.convertToMonsterObject(monsterJson);
            monsterJson.resources.forEach(resourceDefinition => {
              const resourceType: ResourceType = <ResourceType>ResourceType[<string>resourceDefinition.name];
              if (resourceType != null && resourceType >= 0) {
                monster.resources.set(resourceType, resourceDefinition.amount);
              } else {
                this.getResourceByName(resourceDefinition.name).then(resource => {
                  monster.resources.set(resource, resourceDefinition.amount);
                });
              }
            });
            data.push(monster);
          });
          return data;
        },
      );
  }

  getDefaultInitialHuntableNemesisMonsters(): Promise<Monster[]> {
    return this.getMonsters().then(monsters => monsters.filter(monster => monster.isNemesis));
  }

  getDefaultInitialHuntableQuarries(): Promise<Monster[]> {
    return this.getMonsters().then(monsters => monsters.filter(monster => !monster.isNemesis));
  }

  getResources(): Promise<Resource[]> {
    return this.http.get('assets/data/resources.json').toPromise()
      .then(
        res => {
          let data: Resource[] = [];
          res.json().forEach(resourceJson => {
            const tags: StorageTag[] = [];
            resourceJson.tags.forEach((tagName: string) => {
              tags.push(<StorageTag>StorageTag[tagName]);
            });
            data.push(JsonToObjectConverter.converToResourceObject(resourceJson, tags));
          });
          return data;
        },
      );
  }

  getResourceByName(name: string): Promise<Resource> {
    return this.getResources().then(resources => resources.find(resource => {
      return resource.name === name;
    }));
  }

  getAllExistingStorageItems(): Promise<Storage[][]> {
    const promises: Promise<any>[] = [];
    promises.push(this.getResources());
    promises.push(this.getWeapons());
    promises.push(this.getArmors());
    promises.push(this.getEquipments());
    return Promise.all(promises);
  }

  getLanternEvents(): Promise<LanternEvent[]> {
    return this.http.get('assets/data/lanternevents.json').toPromise()
      .then(
        res => {
          let data: LanternEvent[] = [];
          res.json().forEach(lanternEventJson => {
            const storyEvents: StoryEvent[] = [];
            lanternEventJson.storyEvents.forEach((storyEventId: number) => {
              this.getStoryEvent(storyEventId).then(storyEvent => storyEvents.push(storyEvent));
            });
            data.push(JsonToObjectConverter.convertToLanternEventObject(lanternEventJson, storyEvents));
          });
          return data;
        },
      );
  }

  getStoryEvents(): Promise<StoryEvent[]> {
    return this.getGenericList('assets/data/storyevents.json', JsonToObjectConverter.convertToStoryEventObject);
  }

  getStoryEvent(id: number): Promise<StoryEvent> {
    return this.getStoryEvents().then(storyEvents => storyEvents.find(storyEvent => storyEvent.id === id));
  }

  getInitialMilestones(): Promise<Milestone[]> {
    return this.http.get('assets/data/milestones.json').toPromise()
      .then(
        res => {
          let data: Milestone[] = [];
          res.json().forEach(milestoneJson => {
            const storyEvents: StoryEvent[] = [];
            milestoneJson.storyEvents.forEach((storyEventId: number) => {
              this.getStoryEvent(storyEventId).then(storyEvent =>
                storyEvents.push(storyEvent));
            });
            data.push(JsonToObjectConverter.convertToMilestoneObject(milestoneJson, storyEvents));
          });
          return data;
        },
      );
  }

  getDefaultTimeline(): Promise<Timeline[]> {
    return this.getLanternEvents().then(lanternEvents =>
      this.http.get('assets/data/defaulttimeline.json').toPromise()
        .then(
          res => {
            let data: Timeline[] = [];
            res.json().forEach(timelineJson => {
              let event: LanternEvent = lanternEvents.find(x => x.name === timelineJson.lanternEvent);
              data.push(JsonToObjectConverter.convertToTimelineObject(timelineJson, event));
            });
            return data;
          }),
    );
  }

  getSettlementLocations(): Promise<Location[]> {
    return this.getGenericList('assets/data/locations.json', JsonToObjectConverter.convertToLocationObject);
  }

  getInnovations(): Promise<Innovation[]> {
    return this.http.get('assets/data/innovations.json').toPromise()
      .then(
        res => {
          let data: Innovation[] = [];
          res.json().forEach(innovationJson => {
            const tags: InnovationTag[] = [];
            innovationJson.tags.forEach((tagName: string) => {
              tags.push(<InnovationTag>InnovationTag[tagName]);
            });
            data.push(JsonToObjectConverter.convertToInnovationObject(innovationJson, tags));
          });
          return data;
        },
      );
  }

  getInnovationsThatAreNotAddedButAvailable(objects: Innovation[]): Promise<Innovation[]> {
    return this.getInnovations().then(innovations => {
      let existingObjects = innovations.filter(innovation =>
        isUndefined(objects.find((innov: Innovation) => innov.name === innovation.name)) &&
        innovation.tags.some(tag =>
          objects.filter((innov: Innovation) =>
            innov.consequence === tag).length > 0));
      // when null/undefined get all Base Innovations and add them to the list
      if (existingObjects == null || (existingObjects.length === 0 && objects.length === 0)) {
        existingObjects = innovations.filter(innovation => innovation.isBase);
      }
      return existingObjects;
    });
  }

  getDisorders(): Promise<Disorder[]> {
    return this.getGenericList('assets/data/disorders.json', JsonToObjectConverter.convertToDisorderObject);
  }

  getFightingArts(): Promise<FightingArt[]> {
    return this.getGenericList('assets/data/fightingarts.json', JsonToObjectConverter.convertToFightingArtObject);
  }

  getPrinciples(): Promise<Principle[]> {
    return this.getGenericList('assets/data/principles.json', JsonToObjectConverter.convertToPrincipleObject);
  }

  getPrincipleTypes(): Promise<PrincipleType[]> {
    return this.getGenericList('assets/data/principletypes.json', JsonToObjectConverter.convertToPrincipleTypeObject);
  }

  getPrinciplesWithType(principleType: PrincipleType): Promise<Principle[]> {
    return this.getPrinciples().then(principles =>
      principles.filter(principle => principle.type === principleType),
    );
  }

  getWeapons(): Promise<Weapon[]> {
    return this.http.get('assets/data/weapons.json').toPromise()
      .then(
        res => {
          let data: Weapon[] = [];
          res.json().forEach(weaponJson => {
            const tags: StorageTag[] = [];
            let affinities: Map<Affinity, Direction[]> = new Map<Affinity, Direction[]>();
            weaponJson.tags.forEach((tagName: string) => {
              tags.push(<StorageTag>StorageTag[tagName]);
            });
            weaponJson.affinities.forEach((mapElement) => {
              const dir: Direction[] = [];
              const affinity: Affinity = <Affinity>Affinity[<string>mapElement.affinity];
              mapElement.direction.forEach(
                (stringDirection) => dir.push(<Direction>Direction[<string>stringDirection]),
              );
              affinities.set(affinity, dir);
            });
            data.push(JsonToObjectConverter.convertToWeaponObject(weaponJson, tags, affinities));
          });
          return data;
        },
      );

  }

  getArmors(): Promise<Armor[]> {
    return this.http.get('assets/data/armors.json').toPromise()
      .then(
        res => {
          let data: Armor[] = [];
          res.json().forEach(armorJson => {
            const tags: StorageTag[] = [];
            let affinities: Map<Affinity, Direction[]> = new Map<Affinity, Direction[]>();
            armorJson.tags.forEach((tagName: string) => {
              tags.push(<StorageTag>StorageTag[tagName]);
            });
            armorJson.affinities.forEach((mapElement) => {
              const dir: Direction[] = [];
              const affinity: Affinity = <Affinity>Affinity[<string>mapElement.affinity];
              mapElement.direction.forEach(
                (stringDirection) => dir.push(<Direction>Direction[<string>stringDirection]),
              );
              affinities.set(affinity, dir);
            });
            data.push(JsonToObjectConverter.convertToArmorObject(armorJson, tags, affinities));
          });
          return data;
        },
      );
  }

  getEquipments(): Promise<Equipment[]> {
    return this.http.get('assets/data/equipments.json').toPromise()
      .then(
        res => {
          let data: Equipment[] = [];
          res.json().forEach(equipmentJson => {
            const tags: StorageTag[] = [];
            let affinities: Map<Affinity, Direction[]> = new Map<Affinity, Direction[]>();
            equipmentJson.tags.forEach((tagName: string) => {
              tags.push(<StorageTag>StorageTag[tagName]);
            });
            equipmentJson.affinities.forEach((mapElement) => {
              const dir: Direction[] = [];
              const affinity: Affinity = <Affinity>Affinity[<string>mapElement.affinity];
              mapElement.direction.forEach(
                (stringDirection) => dir.push(<Direction>Direction[<string>stringDirection]),
              );
              affinities.set(affinity, dir);
            });
            data.push(JsonToObjectConverter.convertToEquipmentObject(equipmentJson, tags, affinities));
          });
          return data;
        },
      );
  }

  getGenericList(file: string, methodCall: JsonToObjectConverterMethod): Promise<any> {
    return this.http.get(file).toPromise()
      .then(
        res => {
          let data: any[] = [];
          res.json().forEach(json => {
            data.push(methodCall(json));
          });
          return data;
        },
      );
  }

  sortByName(l, r) {
    if (l.name < r.name) {
      return -1;
    }
    if (l.name > r.name) {
      return 1;
    }
    return 0;
  }

}
