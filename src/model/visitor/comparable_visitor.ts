import {Milestone} from "../milestone";
/**
 * Created by Daniel on 10.02.2017.
 */
export interface ComparableVisitor {
  visit(milestone: Milestone, compareValue: string | number): boolean;
}
