import { LanternEvent } from './lantern-event';
import { ComparableVisitorValue } from './visitor/comparable-visitor';
import { GreaterThan } from './visitor/greater-than';
import { LessThan } from './visitor/less-than';
import { LessThanEquals } from './visitor/less-than-euqals';
import { Equals } from './visitor/equals';
import { GreaterThanEquals } from './visitor/greater-than-equals';
/**
 * Created by Daniel on 07.02.2017.
 */
export class Milestone extends LanternEvent {
    constructor(id, tag, value, comparator, observerTarget, milestoneType, name = '', todo = '') {
        super(name, todo);
        this.id = id;
        this.tag = tag;
        this.value = value;
        switch (comparator) {
            case ComparableVisitorValue.L:
                this.visitor = new LessThan();
                break;
            case ComparableVisitorValue.LE:
                this.visitor = new LessThanEquals();
                break;
            case ComparableVisitorValue.EQ:
                this.visitor = new Equals();
                break;
            case ComparableVisitorValue.GE:
                this.visitor = new GreaterThanEquals();
                break;
            case ComparableVisitorValue.G:
                this.visitor = new GreaterThan();
                break;
            default:
                console.log('No ComparableVisitorValue found for: ' + comparator);
        }
        this.observerTarget = observerTarget;
        this.milestoneType = milestoneType;
    }
    accept(compareValue, oldValue) {
        return this.visitor.visit(this, compareValue, oldValue);
    }
}
// TODO UPPERCASE
export var MilestoneType;
(function (MilestoneType) {
    MilestoneType["Basic"] = "BASIC";
    MilestoneType["DragonKing"] = "DRAGONKING";
    MilestoneType["Sunstalker"] = "SUNSTALKER";
})(MilestoneType || (MilestoneType = {}));
//# sourceMappingURL=milestone.js.map