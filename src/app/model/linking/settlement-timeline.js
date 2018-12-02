import { Subject } from 'rxjs';
/**
 * Created by Daniel on 21.03.2017.
 */
export class SettlementTimeline {
    constructor(settlement, timeline) {
        this.reachedChanged = new Subject();
        this._reached = false;
        this.settlement = settlement;
        this.timeline = timeline;
    }
    get reached() {
        return this._reached;
    }
    set reached(value) {
        this._reached = value;
        this.reachedChanged.next(value);
    }
}
//# sourceMappingURL=settlement$-timeline.js.map