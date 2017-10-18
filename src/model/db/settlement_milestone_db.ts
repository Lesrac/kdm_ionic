/**
 * Created by Daniel on 18.10.2017.
 */
export class SettlementMilestoneDB {
  milestoneId: number;
  settlementId: number;

  constructor(settlementId: number, milestoneId: number) {
    this.settlementId = settlementId;
    this.milestoneId = milestoneId;
  }
}
