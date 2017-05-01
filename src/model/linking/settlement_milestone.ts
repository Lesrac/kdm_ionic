import { Settlement } from '../settlement';
import { Milestone } from '../milestone';
import { SettlementLanternEvent } from './settlement_lantern_event';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';
/**
 * Created by Daniel on 21.03.2017.
 */
export class SettlementMilestone extends SettlementLanternEvent {
  milestone: Milestone;
  observer: Observer<Object>;
  subscription: Subscription;

  constructor(settlement: Settlement, milestone: Milestone) {
    super(settlement, milestone);
    this.milestone = milestone;
  }
}
