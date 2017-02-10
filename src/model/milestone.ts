import {LanternEvent} from "./lantern_event";
import {Comparable} from "./comparable";
import {ComparableVisitor} from "./visitor/comparable_visitor";
/**
 * Created by Daniel on 07.02.2017.
 */
export class Milestone extends LanternEvent implements Comparable {
  tag: string;
  value: number;
  identifier: string;
  visitor: ComparableVisitor;

  accept(compareValue: string|number): boolean {
    return this.visitor.visit(this, compareValue);
  }

}
