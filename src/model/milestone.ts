import { LanternEvent } from './lantern-event';
import { Comparable } from './comparable';
import { ComparableVisitor, ComparableVisitorValue } from './visitor/comparable-visitor';
import { GreaterThan } from './visitor/greater-than';
import { LessThan } from './visitor/less-than';
import { LessThanEquals } from './visitor/less-than-euqals';
import { Equals } from './visitor/equals';
import { GreaterThanEquals } from './visitor/greater-than-equals';

/**
 * Created by Daniel on 07.02.2017.
 */
export class Milestone extends LanternEvent implements Comparable {
  id: number;
  tag: string;
  value: number;
  visitor: ComparableVisitor;
  observerTarget: string;
  milestoneType: MilestoneType;

  constructor(id: number, tag: string, value: number, comparator: ComparableVisitorValue,
              observerTarget: string, milestoneType: MilestoneType, name: string = '', todo: string = '') {
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

  accept(compareValue: string | number, oldValue: string | number): boolean {
    return this.visitor.visit(this, compareValue, oldValue);
  }

}

// TODO UPPERCASE
export enum MilestoneType {
  Basic = 'BASIC',
  DragonKing = 'DRAGONKING',
  Sunstalker = 'SUNSTALKER',
}
