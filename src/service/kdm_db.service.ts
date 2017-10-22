import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
import { Storage } from '@ionic/storage';
import { SettlementSimplified } from '../model/db/settlement_simplified';
import { SimplifyObjects } from '../util/simplify_objects';

/**
 * Created by Daniel on 18.05.2017.
 */
@Injectable()
export class KDMDBService {
  private settlements: string = 'settlements';
  private settlement: string = 'settlement';

  constructor(private storage: Storage) {
  }

  getSettlements(): Promise<[SettlementSimplified[], undefined]> {
    const settlements: SettlementSimplified[] = [];
    let storageForEach: Promise<null> = this.storage.forEach((settlementSimplifiedJSON, key) => {
        if (key.startsWith(this.settlement)) {
          settlements.push(JSON.parse(settlementSimplifiedJSON));
        }
      },
    );
    return Promise.all<SettlementSimplified[], null>([settlements, storageForEach]);
  }

  getSettlementById(id: number): Promise<SettlementSimplified> {
    return this.storage.get(this.settlement + id);
  }

  saveSettlements(settlements: Settlement[]): void {
    settlements.forEach(settlement => this.saveSettlement(settlement));
  }

  saveSettlement(settlement: Settlement): void {
    const simplified: SettlementSimplified = SimplifyObjects.simplifySettlement(settlement);
    this.storage.set(this.settlement + settlement.id, JSON.stringify(simplified));
  }

  removeSettlement(settlementId: number): void {
    this.storage.remove(this.settlement + settlementId);
  }

}
