import { Settlement } from '../settlement';
import { Timeline } from '../timeline';

/**
 * Created by Daniel on 21.03.2017.
 */
export class SettlementTimeline {
  settlement: number;
  timeline: Timeline;
  reached: boolean = false;

  constructor(settlement: Settlement, timeline: Timeline) {
    this.settlement = settlement.id;
    this.timeline = timeline;
  }
}
