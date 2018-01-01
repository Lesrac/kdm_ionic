import { LanternEventJSON } from './lantern_event_json';

export class MilestoneJSON extends LanternEventJSON {
  id: number;
  tag: string;
  value: number;
  comparator: string;
  observerTarget: string;
  milestoneType: string;

  constructor(name: string, todo: string, storyEvents: number[], id: number, tag: string, value: number,
              comparator: string, observerTarget: string, milestoneType: string) {
    super(name, todo, storyEvents);
    this.id = id;
    this.tag = tag;
    this.value = value;
    this.comparator = comparator;
    this.observerTarget = observerTarget;
    this.milestoneType = milestoneType;
  }
}
