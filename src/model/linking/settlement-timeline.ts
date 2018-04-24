import { Settlement } from '../settlement';
import { Timeline } from '../timeline';
import { Subject } from 'rxjs/Subject';

/**
 * Created by Daniel on 21.03.2017.
 */
export class SettlementTimeline {
  settlement: Settlement;
  timeline: Timeline;
  reachedChanged: Subject<boolean> = new Subject<boolean>();
  private _reached: boolean = false;

  constructor(settlement: Settlement, timeline: Timeline) {
    this.settlement = settlement;
    this.timeline = timeline;
  }

  get reached(): boolean {
    return this._reached;
  }

  set reached(value: boolean) {
    this._reached = value;
    this.reachedChanged.next(value);
  }
}
