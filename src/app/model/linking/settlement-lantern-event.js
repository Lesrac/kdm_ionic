import { Subject } from 'rxjs';
/**
 * Created by Daniel on 26.03.2017.
 */
export class SettlementLanternEvent {
    constructor(settlement, lanternEvent) {
        this.reachedChanged = new Subject();
        this._reached = false;
        this.settlement = settlement;
        this.lanternEvent = lanternEvent;
    }
    get reached() {
        return this._reached;
    }
    set reached(value) {
        this._reached = value;
        this.reachedChanged.next(value);
    }
}
//# sourceMappingURL=settlement$-lantern-event.js.map