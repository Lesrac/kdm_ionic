import { Injectable } from '@angular/core';
import { Milestone } from '../model/milestone';
/**
 * Created by Daniel on 10.02.2017.
 */
@Injectable()
export class KDMCheckerService {

  checkMilestone(milestone: Milestone, identifier: string, value: number | string): boolean {
    return (!milestone.reached && milestone.identifier === identifier && milestone.accept(value));
  }

}
