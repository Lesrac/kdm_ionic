import { Milestone } from '../milestone';

/**
 * Created by Daniel on 10.02.2017.
 */
export interface ComparableVisitor {
  visit(milestone: Milestone, compareValue: string | number, oldValue: string | number): boolean;
}

export enum ComparableVisitorValue {
  L = 'L',
  LE = 'LE',
  EQ = 'EQ',
  GE = 'GE',
  G = 'G',
}
