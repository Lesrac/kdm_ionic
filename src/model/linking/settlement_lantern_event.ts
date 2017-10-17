import { LanternEvent } from '../lantern_event';
import { Settlement } from '../settlement';

/**
 * Created by Daniel on 26.03.2017.
 */
export class SettlementLanternEvent {
  reached: boolean = false;
  settlement: number;
  lanternEvent: LanternEvent;

  constructor(settlement: Settlement, lanternEvent: LanternEvent) {
    this.settlement = settlement.id;
    this.lanternEvent = lanternEvent;
  }
}
