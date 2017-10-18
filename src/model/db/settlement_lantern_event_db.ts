/**
 * Created by Daniel on 18.10.2017.
 */
export class SettlementLanternEventDB {
  reached: boolean = false;
  settlement: number;
  lanternEventName: string;

  constructor(settlementId: number, lanternEventName: string) {
    this.settlement = settlementId;
    this.lanternEventName = lanternEventName;
  }
}
