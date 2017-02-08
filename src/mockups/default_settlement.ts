import {Monster} from "../models/monster";
import {Settlement} from "../models/settlement";
import {LanternEvent} from "../models/lantern_event";
import {Timeline} from "../models/timeline";
import {StoryEvent} from "../models/story_event";
import {Milestone} from "../models/milestone";
import {Resource} from "../models/resource";
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
    description: ''
  },
  {
    name: 'Fur',
    description: ''
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
    resources: [[RESSOURCES[0], 1], [RESSOURCES[1], 4]],
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
    resources: null,
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
    resources: null,
    huntedResources: []
  }
];

export const STORYEVENTS: StoryEvent[] = [
  {title: 'First Words', description: ''},
  {title: 'Build the Innovation Deck', description: ''},
  {title: 'Glowing Center', description: ''}
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
    identifier: 'child'
  },
  {
    name: 'Principle: Death',
    tag: 'First time death count is updated',
    reached: false,
    todo: '',
    storyEvents: [],
    value: 1,
    identifier: 'death'
  },
  {
    name: 'Principle: Society',
    tag: 'Populations reaches 15',
    reached: false,
    todo: '',
    storyEvents: [],
    value: 15,
    identifier: 'population'
  },
  {
    name: 'Principle: Hooded Knight',
    tag: 'Settlement has 5 innovations',
    reached: false,
    todo: '',
    storyEvents: [],
    value: 5,
    identifier: 'innovation'
  },
  {
    name: 'Principle: Game Over',
    tag: 'Population reaches 0',
    reached: false,
    todo: '',
    storyEvents: [],
    value: 0,
    identifier: 'population'
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
