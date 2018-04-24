import { LanternEvent } from '../lantern-event';
import { Settlement } from '../settlement';
import { Subject } from 'rxjs/Subject';

/**
 * Created by Daniel on 26.03.2017.
 */
export class SettlementLanternEvent {
  reachedChanged: Subject<boolean> = new Subject<boolean>();
  settlement: Settlement;
  lanternEvent: LanternEvent;
  private _reached: boolean = false;

  constructor(settlement: Settlement, lanternEvent: LanternEvent) {
    this.settlement = settlement;
    this.lanternEvent = lanternEvent;
  }

  get reached(): boolean {
    return this._reached;
  }

  set reached(value: boolean) {
    this._reached = value;
    this.reachedChanged.next(value);
  }
}
