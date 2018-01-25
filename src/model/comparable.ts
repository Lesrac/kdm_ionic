/**
 * Created by Daniel on 10.02.2017.
 */
export interface Comparable {
  accept(compareValue: string | number, oldValue: string | number): boolean;
}
