import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
import { Http } from '@angular/http';
import { Monster } from '../model/monster';
import { LanternEvent } from '../model/lantern_event';
import { Timeline } from '../model/timeline';
import { Milestone, MilestoneType } from '../model/milestone';
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
import { Armor, ArmorSpace } from '../model/armor';
import { Affinity, Direction, Equipment } from '../model/equipment';
import { isUndefined } from 'ionic-angular/util/util';
import { SevereInjury } from '../model/severe_injury';
import { HuntEvent } from '../model/hunte_event';
import { DiceThrow } from '../model/dice_throw';
import { BaseModel } from '../model/base_model';
import { KDMDBService } from './kdm_db.service';
import { SettlementSimplified } from '../model/db/settlement_simplified';
import { SettlementTimeline } from '../model/linking/settlement_timeline';
import { HuntableMonster } from '../model/linking/huntable_monster';
import { HuntedMonster } from '../model/linking/hunted_monster';
import { SettlementMilestone } from '../model/linking/settlement_milestone';

/**
 * Created by Daniel on 28.01.2017.
 */

type JsonToObjectConverterMethod = (n: string) => any;

@Injectable()
export class KDMDataService {

  settlements: Settlement[] = [];
  monsters: Monster[] = [];
  resources: Resource[] = [];
  lanternEvents: LanternEvent[] = [];
  storyEvents: StoryEvent[] = [];
  milestones: Milestone[] = [];
  timeline: Timeline[] = [];
  locations: Location[] = [];
  innovations: Innovation[] = [];
  disorders: Disorder[] = [];
  fightingArts: FightingArt[] = [];
  principles: Principle[] = [];
  principleTypes: PrincipleType[] = [];
  weapons: Weapon[] = [];
  armors: Armor[] = [];
  equipments: Equipment[] = [];
  severeInjuries: SevereInjury[] = [];
  brainTraumas: DiceThrow[] = [];
  glossaryEntries: BaseModel[] = [];
  huntEvents: HuntEvent[] = [];

  isInnitRunning: boolean = true;
  private initPrincipleTypesOnceNotStarted: boolean = true;

  constructor(private http: Http, private kdmDBService: KDMDBService) {
    this.isInnitRunning = true;
    this.getStoryEvents();
    this.getPrincipleTypes();
    this.getAllSevereInjuries();
    this.getAllBrainTraumas();
    this.getAllGlossaryEntries();
    this.getAllHuntEvents();
    this.getSettlementLocations();
    this.getLanternEvents();
    this.getInitialMilestones();
    this.getDefaultTimeline();
    this.getInnovations();
    this.getMonsters();
    this.getResources();
    this.getDisorders();
    this.getFightingArts();
    this.getPrinciples();
    this.getWeapons();
    this.getArmors();
    this.getEquipments();
    this.getSettlements();
    this.isInnitRunning = false;
  }

  getSettlements(): Promise<Settlement[]> {
    if (this.settlements.length < 1 && this.isInnitRunning) {
      return this.kdmDBService.getSettlements().then((simplifiedSettlementsArray) => {
        console.log(simplifiedSettlementsArray);
        simplifiedSettlementsArray[0].forEach(simplifiedSettlement =>
          this.settlements.push(this.desimplifySettlement(simplifiedSettlement)));
        return this.settlements;
      });
    } else {
      return Promise.resolve(this.settlements);
    }
  }

  addSettlement(settlement: Settlement): void {
    this.getSettlements().then(settlements => {
      if (settlements.length > 0) {
        settlement.id = Math.max.apply(Math, settlements.map(s => s.id)) + 1;
      } else {
        settlement.id = 1;
      }
      this.settlements.push(settlement);
      this.kdmDBService.saveSettlement(settlement);
    });
  }

  removeSettlement(settlement: Settlement): void {
    this.settlements.splice(this.settlements.indexOf(settlement), 1);
    this.kdmDBService.removeSettlement(settlement.id);
  }

  getMonsters(): Promise<Monster[]> {
    if (this.monsters.length < 1 && this.isInnitRunning) {
      return this.http.get('assets/data/monsters.json').toPromise()
        .then(
          res => {
            res.json().forEach(monsterJson => {
              const monster: Monster = JsonToObjectConverter.convertToMonsterObject(monsterJson);
              monsterJson.levelresources.forEach(levelresourceDefinitions => {
                levelresourceDefinitions.forEach(levelresource => {
                  const map: Map<any, number> = new Map<any, number>();
                  levelresource.resources.forEach(resource => {
                    const resourceType: ResourceType = <ResourceType>ResourceType[<string>resource.name];
                    if (resourceType != null && resourceType >= 0) {
                      map.set(resourceType, resource.amount);
                    } else {
                      this.getResourceByName(resource.name).then(rs => {
                        map.set(rs, resource.amount);
                      });
                    }
                  });
                  monster.resources.set(Number(levelresource.level), map);
                });
              });
              this.monsters.push(monster);
            });
            return this.monsters;
          },
        );
    } else {
      return Promise.resolve(this.monsters);
    }
  }

  getMonster(id: number): Promise<Monster> {
    return this.getMonsters().then(monsters =>
      monsters.find(monster => monster.id === id));
  }

  getDefaultInitialHuntableNemesisMonsters(): Promise<Monster[]> {
    return this.getMonsters().then(monsters => monsters.filter(monster => monster.isNemesis));
  }

  getDefaultInitialHuntableQuarries(): Promise<Monster[]> {
    return this.getMonsters().then(monsters => monsters.filter(monster => !monster.isNemesis));
  }

  getResources(): Promise<Resource[]> {
    if (this.resources.length < 1 && this.isInnitRunning) {
      return this.http.get('assets/data/resources.json').toPromise()
        .then(
          res => {
            res.json().forEach(resourceJson => {
              const tags: StorageTag[] = [];
              resourceJson.tags.forEach((tagName: string) => {
                tags.push(<StorageTag>StorageTag[tagName]);
              });
              this.resources.push(JsonToObjectConverter.converToResourceObject(resourceJson, tags));
            });
            return this.resources;
          },
        );
    } else {
      return Promise.resolve(this.resources);
    }
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

  getStorageItem(name: string): Promise<Storage> {
    return this.getAllExistingStorageItems().then(array => {
      let element: Storage = new Storage('placeholder', 'placeholder');
      array.forEach(typearray =>
        typearray.forEach(type => {
          if (type.name === name) {
            element = type;
          }
        }),
      );
      return element;
    });
  }

  getLanternEvents(): Promise<LanternEvent[]> {
    if (this.lanternEvents.length < 1 && this.isInnitRunning) {
      return this.http.get('assets/data/lanternevents.json').toPromise()
        .then(
          res => {
            res.json().forEach(lanternEventJson => {
              const storyEvents: StoryEvent[] = [];
              lanternEventJson.storyEvents.forEach((storyEventId: number) => {
                this.getStoryEvent(storyEventId).then(storyEvent => storyEvents.push(storyEvent));
              });
              this.lanternEvents.push(JsonToObjectConverter.convertToLanternEventObject(lanternEventJson, storyEvents));
            });
            return this.lanternEvents;
          },
        );
    } else {
      return Promise.resolve(this.lanternEvents);
    }
  }

  getLanternEvent(name: string): Promise<LanternEvent> {
    return this.getLanternEvents().then(lanternEvents =>
      lanternEvents.find(lanternEvent => lanternEvent.name === name));
  }

  getStoryEvents(): Promise<StoryEvent[]> {
    if (this.storyEvents.length < 1 && this.isInnitRunning) {
      return this.getGenericList('assets/data/storyevents.json', this.storyEvents,
        JsonToObjectConverter.convertToStoryEventObject);
    } else {
      return Promise.resolve(this.storyEvents);
    }
  }

  getStoryEvent(id: number): Promise<StoryEvent> {
    return this.getStoryEvents().then(storyEvents => storyEvents.find(storyEvent => storyEvent.id === id));
  }

  getInitialMilestones(): Promise<Milestone[]> {
    if (this.milestones.length < 1 && this.isInnitRunning) {
      return this.http.get('assets/data/milestones.json').toPromise()
        .then(
          res => {
            res.json().forEach(milestoneJson => {
              const storyEvents: StoryEvent[] = [];
              milestoneJson.storyEvents.forEach((storyEventId: number) => {
                this.getStoryEvent(storyEventId).then(storyEvent =>
                  storyEvents.push(storyEvent));
              });
              const milestone: Milestone = JsonToObjectConverter.convertToMilestoneObject(milestoneJson, storyEvents);
              if (milestone.milestoneType === MilestoneType.Basic) {
                this.milestones.push(milestone);
              }
            });
            return this.milestones;
          },
        );
    } else {
      return Promise.resolve(this.milestones);
    }
  }

  getMilestone(id: number): Promise<Milestone> {
    return this.getInitialMilestones().then(milestones => milestones.find(milestone => milestone.id === id));
  }

  getDefaultTimeline(): Promise<Timeline[]> {
    if (this.timeline.length < 1 && this.isInnitRunning) {
      return this.getLanternEvents().then(lanternEvents =>
        this.http.get('assets/data/defaulttimeline.json').toPromise()
          .then(
            res => {
              res.json().forEach(timelineJson => {
                let event: LanternEvent = lanternEvents.find(x => x.name === timelineJson.lanternEvent);
                this.timeline.push(JsonToObjectConverter.convertToTimelineObject(timelineJson, event));
              });
              return this.timeline;
            }),
      );
    } else {
      return Promise.resolve(this.timeline);
    }
  }

  getSettlementLocations(): Promise<Location[]> {
    if (this.locations.length < 1 && this.isInnitRunning) {
      return this.getGenericList('assets/data/locations.json',
        this.locations, JsonToObjectConverter.convertToLocationObject);
    } else {
      return Promise.resolve(this.locations);
    }
  }

  getLocation(name: string): Promise<Location> {
    return this.getSettlementLocations().then(locations => locations.find(location => location.name === name));
  }

  getInnovations(): Promise<Innovation[]> {
    if (this.innovations.length < 1 && this.isInnitRunning) {
      return this.http.get('assets/data/innovations.json').toPromise()
        .then(
          res => {
            res.json().forEach(innovationJson => {
              const tags: InnovationTag[] = [];
              innovationJson.tags.forEach((tagName: string) => {
                tags.push(<InnovationTag>InnovationTag[tagName]);
              });
              this.innovations.push(JsonToObjectConverter.convertToInnovationObject(innovationJson, tags));
            });
            return this.innovations;
          },
        );
    } else {
      return Promise.resolve(this.innovations);
    }
  }

  getInnovation(name: string): Promise<Innovation> {
    return this.getInnovations().then(innovations => innovations.find(innovation => innovation.name === name));
  }

  getInnovationsThatAreNotAddedButAvailable(objects: Innovation[]): Promise<Innovation[]> {
    return this.getInnovations().then(innovations => {
      let existingObjects = innovations.filter(innovation =>
        isUndefined(objects.find((innov: Innovation) => innov.name === innovation.name)) &&
        innovation.tags.some(tag =>
          objects.filter((innov: Innovation) =>
            innov.consequence === tag).length > 0));
      // when null/undefined get all Base Innovations and add them to the list
      if (existingObjects == null && (existingObjects.length === 0 && objects.length === 0)) {
        existingObjects = innovations.filter(innovation => innovation.isBase);
      }
      return existingObjects;
    });
  }

  getDisorders(): Promise<Disorder[]> {
    if (this.disorders.length < 1 && this.isInnitRunning) {
      return this.getGenericList('assets/data/disorders.json',
        this.disorders, JsonToObjectConverter.convertToDisorderObject);
    } else {
      return Promise.resolve(this.disorders);
    }
  }

  getFightingArts(): Promise<FightingArt[]> {
    if (this.fightingArts.length < 1 && this.isInnitRunning) {
      return this.getGenericList('assets/data/fightingarts.json',
        this.fightingArts, JsonToObjectConverter.convertToFightingArtObject);
    } else {
      return Promise.resolve(this.fightingArts);
    }
  }

  getPrinciples(): Promise<Principle[]> {
    if (this.principles.length < 1 && this.isInnitRunning) {
      let principleTypes: PrincipleType[] = [];
      this.getPrincipleTypes().then(types =>
        principleTypes = types,
      );
      return this.http.get('assets/data/principles.json').toPromise()
        .then(
          res => {
            let principleType: PrincipleType;
            res.json().forEach(principleJSON => {
              principleType = principleTypes.find(type => {
                if (type.name === principleJSON.type) {
                  principleType = type;
                  return true;
                }
              });
              this.principles.push(JsonToObjectConverter.convertToPrincipleObject(principleJSON, principleType));
            });
            return this.principles;
          },
        );
    } else {
      return Promise.resolve(this.principles);
    }
  }

  getPrinciple(name: string): Promise<Principle> {
    return this.getPrinciples().then(principles => principles.find(principle => principle.name === name));
  }

  getPrincipleTypes(): Promise<PrincipleType[]> {
    if (this.principleTypes.length < 1 && this.isInnitRunning && this.initPrincipleTypesOnceNotStarted) {
      this.initPrincipleTypesOnceNotStarted = false;
      return this.getGenericList('assets/data/principletypes.json', this.principleTypes,
        JsonToObjectConverter.convertToPrincipleTypeObject);
    } else {
      return Promise.resolve(this.principleTypes);
    }
  }

  getPrinciplesWithType(principleType: PrincipleType): Promise<Principle[]> {
    return this.getPrinciples().then(principles => {
      return principles.filter(principle => {
        if (!principle.type) {
          return false;
        }
        return principle.type.name === principleType.name;
      });
    });
  }

  getWeapons(): Promise<Weapon[]> {
    if (this.weapons.length < 1 && this.isInnitRunning) {
      return this.http.get('assets/data/weapons.json').toPromise()
        .then(
          res => {
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
              this.weapons.push(JsonToObjectConverter.convertToWeaponObject(weaponJson, tags, affinities));
            });
            return this.weapons;
          },
        );
    } else {
      return Promise.resolve(this.weapons);
    }
  }

  getArmors(): Promise<Armor[]> {
    if (this.armors.length < 1 && this.isInnitRunning) {
      return this.http.get('assets/data/armors.json').toPromise()
        .then(
          res => {
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
              this.armors.push(JsonToObjectConverter.convertToArmorObject(armorJson, tags, affinities));
            });
            return this.armors;
          },
        );
    } else {
      return Promise.resolve(this.armors);
    }
  }

  getEquipments(): Promise<Equipment[]> {
    if (this.equipments.length < 1 && this.isInnitRunning) {
      return this.http.get('assets/data/equipments.json').toPromise()
        .then(
          res => {
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
              this.equipments.push(JsonToObjectConverter.convertToEquipmentObject(equipmentJson, tags, affinities));
            });
            return this.equipments;
          },
        );
    } else {
      return Promise.resolve(this.equipments);
    }
  }

  getGenericList(file: string, data: any[], methodCall: JsonToObjectConverterMethod): Promise<any> {
    return this.http.get(file).toPromise()
      .then(
        res => {
          res.json().forEach(json => {
            data.push(methodCall(json));
          });
          return data;
        },
      );
  }

  getAllSevereInjuries(): Promise<SevereInjury[]> {
    if (this.severeInjuries.length < 1 && this.isInnitRunning) {
      return this.getGenericList('assets/data/severeinjuries.json',
        this.severeInjuries, JsonToObjectConverter.convertToSevereInjuryObject);
    } else {
      return Promise.resolve(this.severeInjuries);
    }
  }

  getSevereInjuriesToHitLocation(hitLocation: string): Promise<SevereInjury[]> {
    const hitLocationEnum: ArmorSpace = <ArmorSpace>ArmorSpace[hitLocation];
    return this.getAllSevereInjuries().then(severeInjuries => severeInjuries.filter(severeInjury =>
      severeInjury.hitLocation === hitLocationEnum));
  }

  getAllBrainTraumas(): Promise<DiceThrow[]> {
    if (this.brainTraumas.length < 1 && this.isInnitRunning) {
      return this.getGenericList('assets/data/braintraumas.json',
        this.brainTraumas, JsonToObjectConverter.convertToDiceThrowObject);
    } else {
      return Promise.resolve(this.brainTraumas);
    }
  }

  getAllHuntEvents(): Promise<HuntEvent[]> {
    if (this.huntEvents.length < 1 && this.isInnitRunning) {
      return this.getGenericList('assets/data/huntevents.json',
        this.huntEvents, JsonToObjectConverter.convertToHuntEventObject);
    } else {
      return Promise.resolve(this.huntEvents);
    }
  }

  getAllGlossaryEntries(): Promise<BaseModel[]> {
    if (this.glossaryEntries.length < 1 && this.isInnitRunning) {
      return this.getGenericList('assets/data/glossaryentries.json',
        this.glossaryEntries, JsonToObjectConverter.convertToBaseModelObject);
    } else {
      return Promise.resolve(this.glossaryEntries);
    }
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

  private desimplifySettlement(simplifiedSettlement: SettlementSimplified): Settlement {
    const settlement = new Settlement(simplifiedSettlement.name);
    settlement.id = simplifiedSettlement.id;
    settlement.survivalLimit = simplifiedSettlement.survivalLimit;
    settlement.population = simplifiedSettlement.population;
    settlement.deathcount = simplifiedSettlement.deathcount;
    settlement.settlementLost = simplifiedSettlement.settlementLost;
    const timeline: SettlementTimeline[] = [];
    simplifiedSettlement.timeline.forEach(timelineDB => {
      this.getLanternEvent(timelineDB.timeline[1]).then(lanternEvent => {
        const tl: Timeline = {
          position: timelineDB.timeline[0],
          lanternEvent: lanternEvent,
        };
        const stl: SettlementTimeline = new SettlementTimeline(settlement, tl);
        stl.reached = timelineDB.reached;
        timeline.push(stl);
      });
    });
    settlement.timeline = timeline;

    const huntableMonsters: HuntableMonster[] = [];
    simplifiedSettlement.huntableMonsters.forEach(huntableMonsterDB => {
      this.getMonster(huntableMonsterDB.monsterId).then(monster => {
        const huntableMonster = new HuntableMonster(settlement, monster);
        huntableMonster.isHuntable = huntableMonsterDB.isHuntable;
        huntableMonster.defeatedLevelThree = huntableMonsterDB.defeatedLevelThree;
        huntableMonster.defeatedLevelTwo = huntableMonsterDB.defeatedLevelTwo;
        huntableMonster.defeatedLevelOne = huntableMonsterDB.defeatedLevelOne;
        huntableMonsters.push(huntableMonster);
      });
    });
    settlement.huntableMonsters = huntableMonsters;

    const huntedMonsters: HuntedMonster[] = [];
    simplifiedSettlement.huntedMonsters.forEach(huntedMonsterDB => {
      this.getMonster(huntedMonsterDB.monsterId).then(monster => {
        const huntedMonster = new HuntedMonster(settlement, monster);
        huntedMonster.monsterLevel = huntedMonsterDB.monsterLevel;
        huntedMonsterDB.huntedResources.forEach((value: [string, number]) => {
            this.getResourceByName(value[0]).then(resource => {
                const r: Resource = Object.assign(resource);
                r.amount = value[1];
                huntedMonster.huntedResources.push(r);
              },
            );
          },
        );
        huntedMonsters.push(huntedMonster);
      });
    });
    settlement.huntedMonsters = huntedMonsters;

    const locations: Location[] = [];
    simplifiedSettlement.locationNames.forEach(locationName => {
      this.getLocation(locationName).then(location => locations.push(location));
    });
    settlement.locations = locations;

    const storages: Storage[] = [];
    simplifiedSettlement.storagesNameAmount.forEach((value: [string, number]) => {
      this.getStorageItem(value[0]).then(storage => {
        const s: Storage = Object.assign(storage);
        s.amount = value[1];
        storages.push(s);
      });
    });
    settlement.storages = storages;

    const innovations: Innovation[] = [];
    simplifiedSettlement.innovationNames.forEach(innovationName => {
      this.getInnovation(innovationName).then(innovation => {
        innovations.push(innovation);
      });
    });
    settlement.innovations = innovations;

    const principles: Principle[] = [];
    simplifiedSettlement.principleNames.forEach(principleName => {
      this.getPrinciple(principleName).then(principle => {
        principles.push(principle);
      });
    });
    settlement.principles = principles;

    const settlementMilestones: SettlementMilestone[] = [];
    simplifiedSettlement.milestones.forEach(settlementMilestone => {
      this.getMilestone(settlementMilestone.milestoneId).then(milestone => {
        const sm: SettlementMilestone = new SettlementMilestone(settlement, milestone);
        sm.reached = settlementMilestone.reached;
        settlementMilestones.push(sm);
      });
    });
    settlement.milestones = settlementMilestones;

// ToDo survivors
    return settlement;
  }

}
