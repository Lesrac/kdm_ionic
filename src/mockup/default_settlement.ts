import {Monster} from "../model/monster";
import {Settlement} from "../model/settlement";
import {LanternEvent} from "../model/lantern_event";
import {Timeline} from "../model/timeline";
import {StoryEvent} from "../model/story_event";
import {Location} from "../model/location";
import {Milestone} from "../model/milestone";
import {Resource} from "../model/resource";
import {Equals} from "../model/visitor/equals";
import {GreaterThanEquals} from "../model/visitor/greater_than_equals";
import {MonsterResource} from "../model/monster_resource";
import {ResourceType} from "../model/resource_type";
/**
 * Created by Daniel on 28.01.2017.
 */

export const SETTLEMENTS: Settlement[] = [];

export const NEMESISMONSTERS: Monster[] = [
  {
    name: 'Butcher',
    level: 1,
    isNemesis: true,
    isHuntable: true,
    defeatedLevelOne: false,
    defeatedLevelTwo: false,
    defeatedLevelThree: false,
    resources: null,
    huntedResources: []
  },
  {
    name: 'King\'s Man',
    level: 1,
    isNemesis: true,
    isHuntable: false,
    defeatedLevelOne: false,
    defeatedLevelTwo: false,
    defeatedLevelThree: false,
    resources: null,
    huntedResources: []
  },
  {
    name: 'The Hand',
    level: 1,
    isNemesis: true,
    isHuntable: false,
    defeatedLevelOne: false,
    defeatedLevelTwo: false,
    defeatedLevelThree: false,
    resources: null,
    huntedResources: []
  }
];

export const RESSOURCES: Resource[] = [
  {
    name: 'Bone',
    description: '',
    amount: 0,
    type: ResourceType.Basic
  },
  {
    name: 'Fur',
    description: '',
    amount: 0,
    type: ResourceType.Basic
  }
];

export const QUARRIES: Monster[] = [
  {
    name: 'White Lion',
    level: 1,
    isNemesis: false,
    isHuntable: true,
    defeatedLevelOne: false,
    defeatedLevelTwo: false,
    defeatedLevelThree: false,
    resources: [],
    huntedResources: []
  },
  {
    name: 'Screaming Antelope',
    level: 1,
    isNemesis: false,
    isHuntable: false,
    defeatedLevelOne: false,
    defeatedLevelTwo: false,
    defeatedLevelThree: false,
    resources: [],
    huntedResources: []
  },
  {
    name: 'Phoenix',
    level: 1,
    isNemesis: false,
    isHuntable: false,
    defeatedLevelOne: false,
    defeatedLevelTwo: false,
    defeatedLevelThree: false,
    resources: [],
    huntedResources: []
  }
];


export const MONSTERRESOURCES: MonsterResource[] = [
  {
    monster: QUARRIES[0],
    storage: RESSOURCES[0],
    amount: 3,
    monsterLevel: 1
  }
];

export const STORYEVENTS: StoryEvent[] = [
  {
    title: 'First Words',
    description: `The nominated survivor steps forward and gains + 1 courage. They lead the other survivors to learn to speak to one another! They discuss their situation, realizing they must hunt to live. Add the White Lion to the Quarry list on the settlement record sheet. Your settlement gains the Language innovation. Search the Innovation cards for Language and place it face up in your play area and record it on your settlement sheet. Language is your first innovation, and it will spark the creation of the innovation deck. Build the Innovation deck now .`
  },
  {
    title: 'Build the Innovation Deck',
    description: `The innovation deck represents the potential cultural and technological growth of your settlement. It will grow throughout the campaign as you gain new innovation cards. Find the 6 innovation cards with language consequence listed under their title: Ammonia, Drums, Hovel, Inner Lantern, Paint, and Symposium. Shuttle these 6 cards together to form your settlement's innovation deck. Place it face down in the designated space on the settlement board. The innovation deck is persistent. Make sure to preserve the unique combination of cards in your deck between play sessions. Finished with their work, the settlement gathers around its Glowing Center`
  },
  {
    title: 'Glowing Center',
    description: `Armed with language, the nominated survivor aptly names the glowing center of their home The Lantern Hoard. The settlement gains the Lantern Hoard Settlement Location. Search the large Settlement Location cards for the Lantern Hoard and place it face up in your play area. The Lantern Hoard is the source of all innovations and further locations the settlement will develop. The nominated survivor sits in front of the Lantern Hoard in awe and gains + 1 understanding. They must skip the next hunt phase as they ponder the meaning of existence. Check off the skip hunt box on the survivor's record sheet. They cannot be selected as a departing survivor this phase.`
  },
  {
    title: 'The First Harvest',
    description: `The settlement decides to harvest the body for resources. The settlement gains the Death Principle: Cannibalize. Find and place the card on the settlement board and note it on the settlement record sheet. After adding the card to the settlement, Roll 1d10. ldlO Result 1 -s The settlement ritualistically divides the corpse with a sharp stone and grimly consumes the dead flesh. Gain a Founding Stone starting gear. All departing survivors gain +3 insanity. 6 - 10 Nominate a survivor. The survivor fanatically tears the corpse open and deeply drinks its blood. They decide that for every new creature they eat, they will become stronger. The survivor gains +1 permanent speed.`
  },
  {
    title: 'The First Grave',
    description: `The settlement decides to build a small monument to mark their loss. The settlement gains the Death Principle: Graves. Find and place the card on the settlement board and note it on the settlement record sheet. After adding the card to the settlement, Roll 1d10. ldlO Result 1 - 5 The settlement gathers around the grave, each taking a moment to reflect the loss and their place in the darkness. All departing survivors gain +l survival and +l understanding. 6 -10 Nominate a survivor. With tears in their eyes, the survivor takes a shard of rock from the grave and marks themselves with it. They cherish this mark forever. The survivor gains +l permanent luck.`
  }
];

export const EVENTS: LanternEvent[] = [
  {
    name: 'Returning Survivors',
    reached: false,
    todo: 'Nominate a survivor to utter the First Words',
    storyEvents: STORYEVENTS.slice(0, 3)
  },
  {
    name: 'Endless Screams',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Nemesis Encounter - Butcher',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Hands of Heat',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Armored Strangers',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Phoenix Feather',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Nemesis Encounter - King\'s Man',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Regal Visit',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Principle: Conviction',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Nemesis Encounter',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Watched',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Nemesis Encounter - Level 3',
    reached: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Nemesis Encounter - Watcher',
    reached: false,
    todo: '',
    storyEvents: []
  }
];

export const MILESTONES: Milestone[] = [
  {
    name: 'Principle: New Life',
    tag: 'First child is born',
    reached: false,
    todo: 'The group must decide how to raise their young. Choose one.',
    storyEvents: [],
    value: 1,
    identifier: 'child',
    visitor: new Equals(),
    accept(compareValue: string|number): boolean {
      return this.visitor.visit(this, compareValue);
    }
  },
  {
    name: 'Principle: Death',
    tag: 'First time death count is updated',
    reached: false,
    todo: 'The group must decide what to do with their first survivor corpse. Choose one.',
    storyEvents: STORYEVENTS.slice(3, 5),
    value: 1,
    identifier: 'death',
    visitor: new Equals(),
    accept(compareValue: string|number): boolean {
      return this.visitor.visit(this, compareValue);
    }
  },
  {
    name: 'Principle: Society',
    tag: 'Populations reaches 15',
    reached: false,
    todo: '',
    storyEvents: [],
    value: 15,
    identifier: 'population',
    visitor: new GreaterThanEquals(),
    accept(compareValue: string|number): boolean {
      return this.visitor.visit(this, compareValue);
    }
  },
  {
    name: 'Principle: Hooded Knight',
    tag: 'Settlement has 5 innovations',
    reached: false,
    todo: '',
    storyEvents: [],
    value: 5,
    identifier: 'innovation',
    visitor: new GreaterThanEquals(),
    accept(compareValue: string|number): boolean {
      return this.visitor.visit(this, compareValue);
    }
  },
  {
    name: 'Principle: Game Over',
    tag: 'Population reaches 0',
    reached: false,
    todo: '',
    storyEvents: [],
    value: 0,
    identifier: 'population',
    visitor: new Equals(),
    accept(compareValue: string|number): boolean {
      return this.visitor.visit(this, compareValue);
    }
  }
];

export const DEFAULTTIMELINE: Timeline[] = [
  {position: 1, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Returning Survivors')},
  {position: 2, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Endless Screams')},
  {position: 3, reached: false, lanternEvent: null},
  {position: 4, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Nemesis Encounter - Butcher')},
  {position: 5, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Hands of Heat')},
  {position: 6, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Armored Strangers')},
  {position: 7, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Phoenix Feather')},
  {position: 8, reached: false, lanternEvent: null},
  {position: 9, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Nemesis Encounter - King\'s Man')},
  {position: 10, reached: false, lanternEvent: null},
  {position: 11, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Regal Visit')},
  {position: 12, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Principle: Conviction')},
  {position: 13, reached: false, lanternEvent: null},
  {position: 14, reached: false, lanternEvent: null},
  {position: 15, reached: false, lanternEvent: null},
  {position: 16, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Nemesis Encounter')},
  {position: 17, reached: false, lanternEvent: null},
  {position: 18, reached: false, lanternEvent: null},
  {position: 19, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Nemesis Encounter')},
  {position: 20, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Watched')},
  {position: 21, reached: false, lanternEvent: null},
  {position: 22, reached: false, lanternEvent: null},
  {position: 23, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Nemesis Encounter - Level 3')},
  {position: 24, reached: false, lanternEvent: null},
  {position: 25, reached: false, lanternEvent: EVENTS.find(x => x.name === 'Nemesis Encounter - Watcher')},
  {position: 27, reached: false, lanternEvent: null},
  {position: 28, reached: false, lanternEvent: null},
  {position: 26, reached: false, lanternEvent: null},
  {position: 29, reached: false, lanternEvent: null},
  {position: 30, reached: false, lanternEvent: null},
  {position: 31, reached: false, lanternEvent: null},
  {position: 32, reached: false, lanternEvent: null},
  {position: 33, reached: false, lanternEvent: null},
  {position: 34, reached: false, lanternEvent: null},
  {position: 35, reached: false, lanternEvent: null},
  {position: 36, reached: false, lanternEvent: null},
  {position: 37, reached: false, lanternEvent: null},
  {position: 38, reached: false, lanternEvent: null},
  {position: 39, reached: false, lanternEvent: null},
  {position: 40, reached: false, lanternEvent: null}
];

export const SETTLEMENTLOCATIONS: Location[] = [
  {name: 'Lantern Hoard', built: true},
  {name: 'Bone Smith', built: false},
  {name: 'Skinnery', built: false},
  {name: 'Organ Grinder', built: false},
  {name: 'Weapon Crafter', built: false},
  {name: 'Leather Worker', built: false},
  {name: 'Stone Circle', built: false},
  {name: 'Barber Surgeon', built: false},
  {name: 'Plumery', built: false},
  {name: 'Blacksmith', built: false},
  {name: 'Mask Maker', built: false}
];
