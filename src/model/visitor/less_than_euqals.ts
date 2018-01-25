import { ComparableVisitor } from './comparable_visitor';
import { Milestone } from '../milestone';

/**
 * Created by Daniel on 10.02.2017.
 */
export class LessThanEquals implements ComparableVisitor {
  visit(milestone: Milestone, compareValue: string | number, oldValue: string | number): boolean {
    if (compareValue < oldValue) {
      return compareValue <= milestone.value;
    } else {
      return false;
    }
  }
}
