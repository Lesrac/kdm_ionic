import { ComparableVisitor } from './comparable-visitor';
import { Milestone } from '../milestone';

/**
 * Created by Daniel on 10.02.2017.
 */
export class LessThan implements ComparableVisitor {
  visit(milestone: Milestone, compareValue: string | number, oldValue: string | number): boolean {
    if (compareValue <= oldValue) {
      return compareValue < milestone.value;
    } else {
      return false;
    }
  }

}
