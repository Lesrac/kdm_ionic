import { LanternEvent } from './lantern-event';

/**
 * Created by Daniel on 27.01.2017.
 */
export class Timeline {
  position: number;
  lanternEvent: LanternEvent;

  constructor(position: number, lanternEvent: LanternEvent) {
    this.position = position;
    this.lanternEvent = lanternEvent;
  }
}
