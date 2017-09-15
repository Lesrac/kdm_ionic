import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
import { Http } from '@angular/http';
import { Monster } from '../model/monster';
import { LanternEvent } from '../model/lantern_event';
import { Timeline } from '../model/timeline';
import { Milestone } from '../model/milestone';
import { Location } from '../model/location';
import { Resource } from '../model/resource';
import { Innovation, InnovationTag } from '../model/innovation';
import { Disorder } from '../model/disorder';
import { FightingArt } from '../model/fighting_art';
import { Principle, PrincipleType } from '../model/principle';
import { JsonToObjectConverter } from '../util/json_to_object_converter';
import { StoryEvent } from '../model/story_event';
import { StorageTag } from '../model/storage';

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
        settlement.id = Math.max.apply(Math, settlements.map(settlement => settlement.id)) + 1;
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
    return this.getGenericList('assets/data/monsters.json', JsonToObjectConverter.convertToMonsterObject);
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
          console.log('resources');
          console.log(data);
          return data;
        },
      );
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
          }
        )
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
