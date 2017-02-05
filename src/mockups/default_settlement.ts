import {Monster} from "../models/monster";
import {Settlement} from "../models/settlement";
import {LanternEvent} from "../models/lantern_event";
import {Timeline} from "../models/timeline";
import {StoryEvent} from "../models/story_event";
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
    defeatedLevelThree: false
  },
  {
    name: 'King\'s Man',
    level: 1,
    isNemesis: true,
    isHuntable: false,
    defeatedLevelOne: false,
    defeatedLevelTwo: false,
    defeatedLevelThree: false
  },
  {
    name: 'The Hand',
    level: 1,
    isNemesis: true,
    isHuntable: false,
    defeatedLevelOne: false,
    defeatedLevelTwo: false,
    defeatedLevelThree: false
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
    defeatedLevelThree: false
  },
  {
    name: 'Screaming Antelope',
    level: 1,
    isNemesis: false,
    isHuntable: false,
    defeatedLevelOne: false,
    defeatedLevelTwo: false,
    defeatedLevelThree: false
  },
  {
    name: 'Phoenix',
    level: 1,
    isNemesis: false,
    isHuntable: false,
    defeatedLevelOne: false,
    defeatedLevelTwo: false,
    defeatedLevelThree: false
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
    tag: '',
    reached: false,
    isMilestone: false,
    todo: 'Nominate a survivor to utter the First Words',
    storyEvents: STORYEVENTS.slice(0, 3)
  },
  {
    name: 'Endless Screams',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Nemesis Encounter - Butcher',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Hands of Heat',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Armored Strangers',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Phoenix Feather',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Nemesis Encounter - King\'s Man',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Regal Visit',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Principle: Conviction',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Nemesis Encounter',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Watched',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Nemesis Encounter - Level 3',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Nemesis Encounter - Watcher',
    tag: '',
    reached: false,
    isMilestone: false,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Principle: New Life',
    tag: 'First child is born',
    reached: false,
    isMilestone: true,
    todo: 'The group must decide how to raise their young. Choose one.',
    storyEvents: []
  },
  {
    name: 'Principle: Death',
    tag: 'First time death count is updated',
    reached: false,
    isMilestone: true,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Principle: Society',
    tag: 'Populations reaches 15',
    reached: false,
    isMilestone: true,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Principle: Hooded Knight',
    tag: 'Settlement has 5 innovations',
    reached: false,
    isMilestone: true,
    todo: '',
    storyEvents: []
  },
  {
    name: 'Principle: Game Over',
    tag: 'Population reaches 0',
    reached: false,
    isMilestone: true,
    todo: '',
    storyEvents: []
  }
];

export const DEFAULTTIMELINE: Timeline[] = [
  {position: 1, reached: false, event: EVENTS.find(x => x.name === 'Returning Survivors')},
  {position: 2, reached: false, event: EVENTS.find(x => x.name === 'Endless Screams')},
  {position: 3, reached: false, event: null},
  {position: 4, reached: false, event: EVENTS.find(x => x.name === 'Nemesis Encounter - Butcher')},
  {position: 5, reached: false, event: EVENTS.find(x => x.name === 'Hands of Heat')},
  {position: 6, reached: false, event: EVENTS.find(x => x.name === 'Armored Strangers')},
  {position: 7, reached: false, event: EVENTS.find(x => x.name === 'Phoenix Feather')},
  {position: 8, reached: false, event: null},
  {position: 9, reached: false, event: EVENTS.find(x => x.name === 'Nemesis Encounter - King\'s Man')},
  {position: 10, reached: false, event: null},
  {position: 11, reached: false, event: EVENTS.find(x => x.name === 'Regal Visit')},
  {position: 12, reached: false, event: EVENTS.find(x => x.name === 'Principle: Conviction')},
  {position: 13, reached: false, event: null},
  {position: 14, reached: false, event: null},
  {position: 15, reached: false, event: null},
  {position: 16, reached: false, event: EVENTS.find(x => x.name === 'Nemesis Encounter')},
  {position: 17, reached: false, event: null},
  {position: 18, reached: false, event: null},
  {position: 19, reached: false, event: EVENTS.find(x => x.name === 'Nemesis Encounter')},
  {position: 20, reached: false, event: EVENTS.find(x => x.name === 'Watched')},
  {position: 21, reached: false, event: null},
  {position: 22, reached: false, event: null},
  {position: 23, reached: false, event: EVENTS.find(x => x.name === 'Nemesis Encounter - Level 3')},
  {position: 24, reached: false, event: null},
  {position: 25, reached: false, event: EVENTS.find(x => x.name === 'Nemesis Encounter - Watcher')},
  {position: 27, reached: false, event: null},
  {position: 28, reached: false, event: null},
  {position: 26, reached: false, event: null},
  {position: 29, reached: false, event: null},
  {position: 30, reached: false, event: null},
  {position: 31, reached: false, event: null},
  {position: 32, reached: false, event: null},
  {position: 33, reached: false, event: null},
  {position: 34, reached: false, event: null},
  {position: 35, reached: false, event: null},
  {position: 36, reached: false, event: null},
  {position: 37, reached: false, event: null},
  {position: 38, reached: false, event: null},
  {position: 39, reached: false, event: null},
  {position: 40, reached: false, event: null}
];
