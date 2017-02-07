import {LanternEvent} from "./lantern_event";
/**
 * Created by Daniel on 07.02.2017.
 */
export class Milestone extends LanternEvent {
  tag: string;
  value: number;
  identifier: string;
}
