import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
import { Http } from '@angular/http';
import {
  SETTLEMENTS, QUARRIES, EVENTS, DEFAULTTIMELINE,
  MILESTONES, SETTLEMENTLOCATIONS, MONSTERRESOURCES, RESSOURCES, INNOVATIONS, DISORDERS, FIGHTINGARTS, PRINCIPLES,
  PRINCIPLETYPES,
} from '../mockup/default_settlement';
import { Monster } from '../model/monster';
import { LanternEvent } from '../model/lantern_event';
import { Timeline } from '../model/timeline';
import { Milestone } from '../model/milestone';
import { Location } from '../model/location';
import { Resource } from '../model/resource';
import { Innovation } from '../model/innovation';
import { Disorder } from '../model/disorder';
import { FightingArt } from '../model/fighting_art';
import { Principle, PrincipleType } from '../model/principle';
import { KDMDBService } from './kdm_db.service';
import { JsonToObjectConverter } from '../util/json_to_object_converter';
import { StoryEvent } from '../model/story_event';

/**
 * Created by Daniel on 28.01.2017.
 */

type JsonToObjectConverterMethod = (n: string) => any;

@Injectable()
export class KDMDataService {

  settlements: Settlement[] = [];

  constructor(private http: Http, private kdmDB: KDMDBService) {
  }

  getSettlements(): Promise<Settlement[]> {
    return Promise.resolve(this.settlements);
  }

  addSettlement(settlement: Settlement): void {
    this.settlements.push(settlement);
  }

  removeSettlement(settlement: Settlement): void {
    this.kdmDB.removeSettlement(settlement);
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
    return Promise.resolve(RESSOURCES);
  }

  getEvents(): Promise<LanternEvent[]> {
    return Promise.resolve(EVENTS);
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
    return Promise.resolve(DEFAULTTIMELINE);
  }

  getSettlementLocations(): Promise<Location[]> {
    return Promise.resolve(SETTLEMENTLOCATIONS);
  }

  getInnovations(): Promise<Innovation[]> {
    return Promise.resolve(INNOVATIONS);
  }

  getDisorders(): Promise<Disorder[]> {
    return Promise.resolve(DISORDERS);
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
    return Promise.resolve(this.getPrinciples().then(principles =>
      principles.filter(principle => principle.type === principleType),
    ));
  }

  getGenericList(file: string, methodCall: JsonToObjectConverterMethod): Promise<any> {
    return this.http.get(file).toPromise()
      .then(
        res => {
          let data: FightingArt[] = [];
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
