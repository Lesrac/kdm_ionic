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
    console.log('Enter: KDMDBService');
  }

  getSettlements(): Promise<[SettlementSimplified[], undefined]> {
    const settlements: SettlementSimplified[] = [];
    let storageForEach: Promise<null> = this.storage.forEach((value, key) => {
        if (key.startsWith(this.settlement)) {
          this.getSettlementByStorageKey(key).then(settlement => settlements.push(JSON.parse(settlement)));
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

  private getSettlementByStorageKey(key: string): Promise<string> {
    return this.storage.get(key);
  }
}
