/**
 * Created by Daniel on 18.10.2017.
 */
export class SettlementMilestoneDB {
  milestoneId: number;
  settlementId: number;
  reached: boolean;

  constructor(settlementId: number, milestoneId: number, reached: boolean) {
    this.settlementId = settlementId;
    this.milestoneId = milestoneId;
    this.reached = reached;
  }
}
