import {ComparableVisitor} from "./comparable_visitor";
import {Milestone} from "../milestone";
/**
 * Created by Daniel on 10.02.2017.
 */
export class Equals implements ComparableVisitor {
  visit(milestone: Milestone, compareValue: string|number): boolean {
    return compareValue == milestone.value;
  }
}
