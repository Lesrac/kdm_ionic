import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
import { Storage } from '@ionic/storage';
import { SettlementSimplified } from '../model/db/settlement-simplified';
import { SimplifyObjects } from '../util/simplify-objects';

/**
 * Created by Daniel on 18.05.2017.
 */
@Injectable()
export class KDMDBService {
  private settlements: string = 'settlements';
  private settlement: string = 'settlement';

  constructor(private storage: Storage) {
  }

  async getSettlements(): Promise<SettlementSimplified[]> {
    const settlements: SettlementSimplified[] = [];
    await this.storage.forEach((settlementSimplifiedJSON, key) => {
        if (key.startsWith(this.settlement)) {
          settlements.push(JSON.parse(settlementSimplifiedJSON));
        }
      },
    );
    return new Promise<SettlementSimplified[]>(resolve => resolve(settlements));
  }

  getSettlementById(id: number): Promise<SettlementSimplified> {
    return this.storage.get(this.settlement + id).then(settlementSimplified =>
      new Promise<SettlementSimplified>(resolve => resolve(JSON.parse(settlementSimplified))),
    );
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
