/**
 * Created by Daniel on 18.10.2017.
 */
export class SettlementTimelineDB {
  settlementId: number;
  // position, lanternEvent-name
  timeline: [number, string];
  reached: boolean = false;

  constructor(settlementId: number, timeline: [number, string], reached: boolean) {
    this.settlementId = settlementId;
    this.timeline = timeline;
    this.reached = reached;
  }
}
