import { SettlementLanternEvent } from './settlement-lantern-event';
/**
 * Created by Daniel on 21.03.2017.
 */
export class SettlementMilestone extends SettlementLanternEvent {
    constructor(settlement, milestone) {
        super(settlement, milestone);
        this.milestone = milestone;
    }
}
//# sourceMappingURL=settlement-milestone.js.map