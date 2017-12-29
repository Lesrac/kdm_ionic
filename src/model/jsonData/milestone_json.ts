import { LanternEventJSON } from './lantern_event_json';

export class MilestoneJSON extends LanternEventJSON {
  id: number;
  tag: string;
  value: number;
  comparator: string;
  observerTarget: string;
  milestoneType: string;
}
