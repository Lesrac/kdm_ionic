/**
 * Created by Daniel on 18.05.2017.
 */
import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
import { Storage } from '@ionic/storage';
import { SettlementMilestone } from '../model/linking/settlement_milestone';

@Injectable()
export class KDMDBService {
  private settlements: string = 'settlements';

  constructor(private storage: Storage) {
    console.log('Enter: KDMDBService');
  }

  initDB(): void {
  }

  getSettlements(): Promise<Settlement[]> {
    return this.storage.get(this.settlements);
  }

  saveSettlements(settlements: Settlement[]): void {
    console.log('saveSettlements');
    console.log(JSON.stringify(settlements));
  }

  saveSettlement(settlement: Settlement): void {
    console.log('saveSettlement');
    console.log(settlement);
    const settlementCopy: Settlement = Object.assign({}, settlement);
    let settlementMilestonesJSONify: SettlementMilestone[] = [];
    settlementCopy.milestones.forEach(milestone => {
      settlementMilestonesJSONify.push(new SettlementMilestone(settlement, milestone.milestone));
    });
    settlementCopy.milestones = settlementMilestonesJSONify;
    console.log(JSON.stringify(settlementCopy));
  }
}
