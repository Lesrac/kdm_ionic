import {Monster} from "../models/monster";
import {Settlement} from "../models/settlement";
import {LanternEvent} from "../models/lantern_event";
/**
 * Created by Daniel on 28.01.2017.
 */

export const SETTLEMENTS: Settlement[] = [];

export const NEMESISMONSTERS: Monster[] = [
  {name: 'Butcher', level: 1, isNemesis: true, isHuntable: true, defeatedLevelOne: false, defeatedLevelTwo: false, defeatedLevelThree: false},
  {name: 'King\'s Man', level: 1, isNemesis: true, isHuntable: false, defeatedLevelOne: false, defeatedLevelTwo: false, defeatedLevelThree: false}  ,
  {name: 'The Hand', level: 1, isNemesis: true, isHuntable: false, defeatedLevelOne: false, defeatedLevelTwo: false, defeatedLevelThree: false}
];


export const QUARRIES: Monster[] = [
  {name: 'White Lion', level: 1, isNemesis: false, isHuntable: true, defeatedLevelOne: false, defeatedLevelTwo: false, defeatedLevelThree: false},
  {name: 'Screaming Antelope', level: 1, isNemesis: false, isHuntable: false, defeatedLevelOne: false, defeatedLevelTwo: false, defeatedLevelThree: false}  ,
  {name: 'Phoenix', level: 1, isNemesis: false, isHuntable: false, defeatedLevelOne: false, defeatedLevelTwo: false, defeatedLevelThree: false}
];

export const EVENTS: LanternEvent[] = [
  {name:'Principle: New Life', tag: 'First child is born', reached: false, isMilestone: true, todo: 'The group must decide how to raise their young. Choose one.', storyEvents: []},
  {name:'Principle: Death', tag: 'First time death count is updated', reached: false, isMilestone: true, todo: '', storyEvents: []},
  {name:'Principle: Society', tag: 'Populations reaches 15', reached: false, isMilestone: true, todo: '', storyEvents: []},
  {name:'Principle: Hooded Knight', tag: 'Settlement has 5 innovations', reached: false, isMilestone: true, todo: '', storyEvents: []},
  {name:'Principle: Game Over', tag: 'Population reaches 0', reached: false, isMilestone: true, todo: '', storyEvents: []}
];
