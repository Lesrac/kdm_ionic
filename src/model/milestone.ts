import { LanternEvent } from './lantern_event';
import { Comparable } from './comparable';
import { ComparableVisitor, ComparableVisitorValue } from './visitor/comparable_visitor';
import { GreaterThan } from './visitor/greater_than';
import { LessThan } from './visitor/less_than';
import { LessThanEquals } from './visitor/less_than_euqals';
import { Equals } from './visitor/equals';
import { GreaterThanEquals } from './visitor/greater_than_equals';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column } from 'typeorm';
/**
 * Created by Daniel on 07.02.2017.
 */
@Entity()
export class Milestone extends LanternEvent implements Comparable {
  @Column()
  tag: string;
  @Column('int')
  value: number;
  visitor: ComparableVisitor;
  @Column()
  observerTarget: string;

  constructor(comparator: ComparableVisitorValue) {
    super();
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
    }
  }

  accept(compareValue: string | number): boolean {
    return this.visitor.visit(this, compareValue);
  }

}
