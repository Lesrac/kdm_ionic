/**
 * Created by Daniel on 10.02.2017.
 */
export class GreaterThanEquals {
    visit(milestone, compareValue, oldValue) {
        if (compareValue > oldValue) {
            return compareValue >= milestone.value;
        }
        else {
            return false;
        }
    }
}
//# sourceMappingURL=greater-than-equals.js.map