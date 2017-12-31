import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
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
import { Survivor } from '../model/survivor';
import { HttpClient } from '@angular/common/http';
import { TimelineJSON } from '../model/jsonData/timeline_json';
import { LanternEventJSON } from '../model/jsonData/lantern_event_json';
import { MilestoneJSON } from '../model/jsonData/milestone_json';
import { ComparableVisitorValue } from '../model/visitor/comparable_visitor';
import { PrincipleJSON } from '../model/jsonData/principle_json';
import { JSONtoObject } from '../util/json_to_object';

/**
 * Created by Daniel on 28.01.2017.
 */
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

  readonly baseURL: string = 'assets/data';
  readonly monstersURL: string = this.baseURL + '/monsters.json';
  readonly resourcesURL: string = this.baseURL + '/resources.json';
  readonly lanterneventsURL: string = this.baseURL + '/lanternevents.json';
  readonly storyeventsURL: string = this.baseURL + '/storyevents.json';
  readonly milestonesURL: string = this.baseURL + '/milestones.json';
  readonly defaulttimelineURL: string = this.baseURL + '/defaulttimeline.json';
  readonly locationsURL: string = this.baseURL + '/locations.json';
  readonly innovationsURL: string = this.baseURL + '/innovations.json';
  readonly disordersURL: string = this.baseURL + '/disorders.json';
  readonly fightingartsURL: string = this.baseURL + '/fightingarts.json';
  readonly principlesURL: string = this.baseURL + '/principles.json';
  readonly principletypesURL: string = this.baseURL + '/principletypes.json';
  readonly weaponsURL: string = this.baseURL + '/weapons.json';
  readonly armorsURL: string = this.baseURL + '/armors.json';
  readonly equipmentsURL: string = this.baseURL + '/equipments.json';
  readonly severeinjuriesURL: string = this.baseURL + '/severeinjuries.json';
  readonly braintraumasURL: string = this.baseURL + '/braintraumas.json';
  readonly hunteventsURL: string = this.baseURL + '/huntevents.json';
  readonly glossaryentriesURL: string = this.baseURL + '/glossaryentries.json';
  private initPrincipleTypesOnceNotStarted: boolean = true;

  constructor(private http: HttpClient, private kdmDBService: KDMDBService) {
  }

  getSettlements(): Promise<Settlement[]> {
    if (this.settlements.length < 1) {
      return this.kdmDBService.getSettlements().then(simplifiedSettlementsArray => {
        simplifiedSettlementsArray[0].forEach(simplifiedSettlement =>
          this.settlements.push(this.desimplifySettlements(simplifiedSettlement)));
        return this.settlements;
      });
    } else {
      return Promise.resolve(this.settlements);
    }
  }

  getSettlement(id: number): Promise<Settlement> {
    this.getStoryEvents();
    this.getLanternEvents();
    return this.kdmDBService.getSettlementById(id).then(settlementSimplified => {
      return this.desimplifySettlement(settlementSimplified);
    });
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

  createSurvivor(settlement: Settlement): Survivor {
    let maxId: number = 1;
    if (settlement.survivors.length > 0) {
      maxId = Math.max.apply(Math, settlement.survivors.map((s: Survivor) => s.id)) + 1;
    }
    return new Survivor('Survivor', maxId, settlement.id);
  }

  getMonsters(): Promise<Monster[]> {
    if (this.monsters.length < 1) {
      return new Promise(resolve => {
        this.http.get<Monster[]>(this.monstersURL).subscribe((res: any[]) => {
          this.monsters = res;
          resolve(res);
        });
      });
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
    if (this.resources.length < 1) {
      return new Promise(resolve => {
        this.http.get<Resource[]>(this.resourcesURL).subscribe(res => {
          this.resources = res;
          resolve(res);
        });
      });
    } else {
      return Promise.resolve(this.resources);
    }
  }

  getResourceByName(name: string): Promise<Resource> {
    return this.getResources().then(resources => resources.find(resource =>
      resource.name === name));
  }

  getAllExistingStorageItems(): Promise<[Storage[]]> {
    return Promise.all<Resource[], Weapon[], Armor[], Equipment[]>(
      [this.getResources(), this.getWeapons(), this.getArmors(), this.getEquipments()]);
  }

  getStorageItem(name: string): Promise<Storage> {
    return this.getAllExistingStorageItems().then(array => {
      let element: Storage = new Storage('placeholder', 'placeholder');
      array.forEach(typearray => {
        const finding = typearray.find(type => type.name === name);
        if (finding !== undefined) {
          element = finding;
        }
      });
      return element;
    });
  }

  getLanternEvents(): Promise<LanternEvent[]> {
    if (this.lanternEvents.length < 1) {
      return new Promise(resolve => {
        this.http.get<LanternEventJSON[]>(this.lanterneventsURL).subscribe(res => {
          const lanternEvents: LanternEvent[] = [];
          res.forEach(lanternEventJSON => {
            const lanternEvent = new LanternEvent(lanternEventJSON.name);
            lanternEvent.todo = lanternEventJSON.todo;
            lanternEventJSON.storyEvents.forEach(storyEventID => {
              this.getStoryEvent(storyEventID).then(storyEvent => lanternEvent.storyEvents.push(storyEvent));
            });
            lanternEvents.push(lanternEvent);
          });
          this.lanternEvents = lanternEvents;
          resolve(lanternEvents);
        });
      });
    } else {
      return Promise.resolve(this.lanternEvents);
    }
  }

  getLanternEvent(name: string): Promise<LanternEvent> {
    return this.getLanternEvents().then(lanternEvents =>
      lanternEvents.find(lanternEvent => lanternEvent.name === name));
  }

  getStoryEvents(): Promise<StoryEvent[]> {
    if (this.storyEvents.length < 1) {
      return new Promise(resolve => {
        this.http.get<StoryEvent[]>(this.storyeventsURL).subscribe(res => {
          this.storyEvents = res;
          resolve(res);
        });
      });
    } else {
      return Promise.resolve(this.storyEvents);
    }
  }

  getStoryEvent(id: number): Promise<StoryEvent> {
    return this.getStoryEvents().then(storyEvents => storyEvents.find(storyEvent =>
      storyEvent.id === id));
  }

  getInitialMilestones(): Promise<Milestone[]> {
    if (this.milestones.length < 1) {
      return new Promise(resolve => {
        this.http.get<MilestoneJSON[]>(this.milestonesURL).subscribe(res => {
          const milestones: Milestone[] = [];
          res.forEach(milestoneJSON => {
            const milestone = new Milestone(milestoneJSON.comparator != null ?
              ComparableVisitorValue[milestoneJSON.comparator] : '');
            milestone.id = milestoneJSON.id;
            milestone.tag = milestoneJSON.tag;
            milestone.value = milestoneJSON.value;
            milestone.name = milestoneJSON.name;
            milestone.todo = milestoneJSON.todo;
            milestoneJSON.storyEvents.forEach(storyEventID => {
              this.getStoryEvent(storyEventID).then(storyEvent => milestone.storyEvents.push(storyEvent));
            });
            milestone.milestoneType = MilestoneType[milestoneJSON.milestoneType];
            milestone.observerTarget = milestoneJSON.observerTarget;
            milestones.push(milestone);
          });
          this.milestones = milestones;
          resolve(milestones);
        });
      });
    } else {
      return Promise.resolve(this.milestones);
    }
  }

  getMilestone(id: number): Promise<Milestone> {
    return this.getInitialMilestones().then(milestones => milestones.find(milestone => milestone.id === id));
  }

  getDefaultTimeline(): Promise<Timeline[]> {
    if (this.timeline.length < 1) {
      return this.getLanternEvents().then(lanternEvents =>
        new Promise<Timeline[]>(resolve => {
          this.http.get<TimelineJSON[]>(this.defaulttimelineURL).subscribe(res => {
            const timelines: Timeline[] = [];
            res.forEach(timelineJson => {
              const timeline = new Timeline();
              timeline.lanternEvent = lanternEvents.find(lanternEvent =>
                lanternEvent.name === timelineJson.lanternEvent);
              timeline.position = timelineJson.position;
              timelines.push(timeline);
            });
            this.timeline = timelines;
            resolve(timelines);
          });
        }));
    } else {
      return Promise.resolve(this.timeline);
    }
  }

  getSettlementLocations(): Promise<Location[]> {
    if (this.locations.length < 1) {
      return new Promise(resolve => {
        this.http.get(this.locationsURL).subscribe(res => {
          this.locations = <Location[]>res;
          resolve(<Location[]>res);
        });
      });
    } else {
      return Promise.resolve(this.locations);
    }
  }

  getLocation(name: string): Promise<Location> {
    return this.getSettlementLocations().then(locations => locations.find(location => location.name === name));
  }

  getInnovations(): Promise<Innovation[]> {
    if (this.innovations.length < 1) {
      return new Promise(resolve => {
        this.http.get<Innovation[]>(this.innovationsURL).subscribe(res => {
          this.innovations = res;
          resolve(res);
        });
      });
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
    if (this.disorders.length < 1) {
      return new Promise<Disorder[]>(resolve => {
        this.http.get<Disorder[]>(this.disordersURL).subscribe(res => {
          this.disorders = res;
          resolve(res);
        });
      });
    } else {
      return Promise.resolve(this.disorders);
    }
  }

  getDisorder(name: string): Promise<Disorder> {
    return this.getDisorders().then(disorders => disorders.find(disorder => disorder.name === name));
  }

  getFightingArts(): Promise<FightingArt[]> {
    if (this.fightingArts.length < 1) {
      return new Promise<FightingArt[]>(resolve => {
        this.http.get<FightingArt[]>(this.fightingartsURL).subscribe(res => {
          this.fightingArts = res;
          resolve(res);
        });
      });
    } else {
      return Promise.resolve(this.fightingArts);
    }
  }

  getFightingArt(name: string): Promise<FightingArt> {
    return this.getFightingArts().then(fightingArts => fightingArts.find(fightingArt => fightingArt.name === name));
  }

  getPrinciples(): Promise<Principle[]> {
    if (this.principles.length < 1) {
      let principleTypes: PrincipleType[] = [];
      this.getPrincipleTypes().then(pts => principleTypes = pts);
      return new Promise(resolve => {
        this.http.get<PrincipleJSON[]>(this.principlesURL).subscribe(res => {
          const principles: Principle[] = [];
          res.forEach(principleJSON => {
            const principle = new Principle(principleJSON.name, principleJSON.description);
            principle.type = principleTypes.find(principleType => principleJSON.type === principleType.name);
            principles.push(principle);
          });
          this.principles = principles;
          resolve(principles);
        });
      });
    } else {
      return Promise.resolve(this.principles);
    }
  }

  getPrinciple(name: string): Promise<Principle> {
    return this.getPrinciples().then(principles => principles.find(principle => principle.name === name));
  }

  getPrincipleTypes(): Promise<PrincipleType[]> {
    if (this.principleTypes.length < 1 && this.initPrincipleTypesOnceNotStarted) {
      this.initPrincipleTypesOnceNotStarted = false;
      return new Promise<PrincipleType[]>(resolve => {
        this.http.get<PrincipleType[]>(this.principletypesURL).subscribe(res => {
          this.principleTypes = res;
          resolve(res);
        });
      });
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
    if (this.weapons.length < 1) {
      return new Promise(resolve => {
        this.http.get<Weapon[]>(this.weaponsURL).subscribe(res => {
          this.weapons = res;
          resolve(res);
        });
      });
    } else {
      return Promise.resolve(this.weapons);
    }
  }

  getArmors(): Promise<Armor[]> {
    if (this.armors.length < 1) {
      return new Promise(resolve => {
        this.http.get<Armor[]>(this.armorsURL).subscribe(res => {
          this.armors = res;
          resolve(res);
        });
      });
    } else {
      return Promise.resolve(this.armors);
    }
  }

  getEquipments(): Promise<Equipment[]> {
    if (this.equipments.length < 1) {
      return new Promise(resolve => {
        this.http.get<Equipment[]>(this.equipmentsURL).subscribe(res => {
          this.equipments = res;
          resolve(res);
        });
      });
    } else {
      return Promise.resolve(this.equipments);
    }
  }

  getAllExistingEquipmentItems(): Promise<[Weapon[], Armor[], Equipment[]]> {
    return Promise.all<Weapon[], Armor[], Equipment[]>([this.getWeapons(), this.getArmors(), this.getEquipments()]);
  }

  getEquipment(name: string): Promise<Equipment> {
    return this.getAllExistingEquipmentItems().then(arrayOfArrays => {
      let equipment: Equipment = null;
      arrayOfArrays.forEach((array: Equipment[]) => {
        const finding = array.find(e => e.name === name);
        if (finding !== undefined) {
          equipment = finding;
        }
      });
      return equipment;
    });
  }

  getAllSevereInjuries(): Promise<SevereInjury[]> {
    if (this.severeInjuries.length < 1) {
      return new Promise<SevereInjury[]>(resolve => {
        this.http.get<SevereInjury[]>(this.severeinjuriesURL).subscribe(res => {
          this.severeInjuries = res;
          resolve(res);
        });
      });
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
    if (this.brainTraumas.length < 1) {
      return new Promise<DiceThrow[]>(resolve => {
        this.http.get<DiceThrow[]>(this.braintraumasURL).subscribe(res => {
          this.brainTraumas = res;
          resolve(res);
        });
      });
    } else {
      return Promise.resolve(this.brainTraumas);
    }
  }

  getAllHuntEvents(): Promise<HuntEvent[]> {
    if (this.huntEvents.length < 1) {
      return new Promise<HuntEvent[]>(resolve => {
        this.http.get<HuntEvent[]>(this.hunteventsURL).subscribe(res => {
          this.huntEvents = res;
          resolve(res);
        });
      });
    } else {
      return Promise.resolve(this.huntEvents);
    }
  }

  getAllGlossaryEntries(): Promise<BaseModel[]> {
    if (this.glossaryEntries.length < 1) {
      return new Promise<BaseModel[]>(resolve => {
        this.http.get<BaseModel[]>(this.glossaryentriesURL).subscribe(res => {
          this.glossaryEntries = res;
          resolve(res);
        });
      });
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

  private desimplifySettlements(simplifiedSettlement: SettlementSimplified): Settlement {
    const settlement = new Settlement(simplifiedSettlement.name);
    settlement.id = simplifiedSettlement.id;
    settlement.survivalLimit = simplifiedSettlement.survivalLimit;
    settlement.population = simplifiedSettlement.population;
    settlement.deathcount = simplifiedSettlement.deathcount;
    settlement.settlementLost = simplifiedSettlement.settlementLost;
    return settlement;
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

    simplifiedSettlement.survivors.forEach(simplifiedSurvivor => {
      const survivor: Survivor = new Survivor(simplifiedSurvivor.name, simplifiedSurvivor.id,
        simplifiedSurvivor.settlementId);
      survivor.isAlive = simplifiedSurvivor.isAlive;
      survivor.isMale = simplifiedSurvivor.isMale;
      survivor.experience = simplifiedSurvivor.experience;
      survivor.survival = simplifiedSurvivor.survival;
      survivor.canDodge = simplifiedSurvivor.canDodge;
      survivor.canEncourage = simplifiedSurvivor.canEncourage;
      survivor.canSurge = simplifiedSurvivor.canSurge;
      survivor.canDash = simplifiedSurvivor.canDash;
      survivor.movement = simplifiedSurvivor.movement;
      survivor.accuracy = simplifiedSurvivor.accuracy;
      survivor.strength = simplifiedSurvivor.strength;
      survivor.evasion = simplifiedSurvivor.evasion;
      survivor.luck = simplifiedSurvivor.luck;
      survivor.speed = simplifiedSurvivor.speed;
      survivor.insanity = simplifiedSurvivor.insanity;
      survivor.isBrainDamaged = simplifiedSurvivor.isBrainDamaged;
      survivor.headArmor = simplifiedSurvivor.headArmor;
      survivor.headHeavyInjury = simplifiedSurvivor.headHeavyInjury;
      survivor.armsArmor = simplifiedSurvivor.armsArmor;
      survivor.armsLightInjury = simplifiedSurvivor.armsLightInjury;
      survivor.armsHeavyInjury = simplifiedSurvivor.armsHeavyInjury;
      survivor.bodyArmor = simplifiedSurvivor.bodyArmor;
      survivor.bodyLightInjury = simplifiedSurvivor.bodyLightInjury;
      survivor.bodyHeavyInjury = simplifiedSurvivor.bodyHeavyInjury;
      survivor.waistArmor = simplifiedSurvivor.waistArmor;
      survivor.waistLightInjury = simplifiedSurvivor.waistLightInjury;
      survivor.waistHeavyInjury = simplifiedSurvivor.waistHeavyInjury;
      survivor.legsArmor = simplifiedSurvivor.legsArmor;
      survivor.legsLightInjury = simplifiedSurvivor.legsLightInjury;
      survivor.legsHeavyInjury = simplifiedSurvivor.legsHeavyInjury;
      survivor.cannotUseFightingArts = simplifiedSurvivor.cannotUseFightingArts;
      survivor.cannotSpendSurvival = simplifiedSurvivor.cannotSpendSurvival;
      survivor.skipNextHunt = simplifiedSurvivor.skipNextHunt;
      survivor.oncePerLifetime = simplifiedSurvivor.oncePerLifetime;
      survivor.understanding = simplifiedSurvivor.understanding;
      survivor.courage = simplifiedSurvivor.courage;
      survivor.weaponProficiencyType = simplifiedSurvivor.weaponProficiencyType;
      survivor.weaponProficiencyXP = simplifiedSurvivor.weaponProficiencyXP;
      simplifiedSurvivor.fightingArtNames.forEach(fightingArtName =>
        this.getFightingArt(fightingArtName).then(fightingArt => survivor.fightingArts.push(fightingArt)));
      simplifiedSurvivor.disorderNames.forEach(disorderName =>
        this.getDisorder(disorderName).then(disorder => survivor.disorders.push(disorder)));
      settlement.survivors.push(survivor);
    });
    return settlement;
  }

}
