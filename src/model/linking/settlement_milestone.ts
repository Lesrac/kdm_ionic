import { Settlement } from '../settlement';
import { Milestone } from '../milestone';
import { SettlementLanternEvent } from './settlement_lantern_event';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';

/**
 * Created by Daniel on 21.03.2017.
 */
export class SettlementMilestone {
  reached: boolean = false;
  settlement: number;
  milestone: number;
  observer: Observer<Object>;
  subscription: Subscription;

  constructor(settlement: Settlement, milestone: number) {
    this.settlement = settlement.id;
    this.milestone = milestone;
  }
}
