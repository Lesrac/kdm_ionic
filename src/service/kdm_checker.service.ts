import { Injectable } from '@angular/core';
import { SettlementMilestone } from '../model/linking/settlement_milestone';
/**
 * Created by Daniel on 10.02.2017.
 */
@Injectable()
export class KDMCheckerService {

  checkMilestone(milestone: SettlementMilestone, identifier: string, value: number | string): boolean {
    return (!milestone.reached && milestone.milestone.identifier === identifier && milestone.milestone.accept(value));
  }

}
