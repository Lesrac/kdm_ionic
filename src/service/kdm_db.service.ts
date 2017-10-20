import { Injectable } from '@angular/core';
import { Settlement } from '../model/settlement';
import { Storage } from '@ionic/storage';
import { SettlementSimplified } from '../model/db/settlement_simplified';
import { DeSimplifyObjects } from '../util/de_simplify_objects';

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

  getSettlements(): Promise<SettlementSimplified[]> {
    const settlements: SettlementSimplified[] = [];
    this.storage.forEach((value, key, index) => {
        if (key.startsWith(this.settlement)) {
          this.getSettlementByStorageKey(key).then(settlement => settlements.push(JSON.parse(settlement)));
        }
      },
    );
    return new Promise<SettlementSimplified[]>(resolve => setTimeout(resolve, 2000)).then(() => settlements);
  }

  getSettlementById(id: number): Promise<SettlementSimplified> {
    return this.storage.get(this.settlement + id);
  }

  saveSettlements(settlements: Settlement[]): void {
    settlements.forEach(settlement => this.saveSettlement(settlement));
  }

  saveSettlement(settlement: Settlement): void {
    const simplified: SettlementSimplified = DeSimplifyObjects.simplifySettlement(settlement);
    this.storage.set(this.settlement + settlement.id, JSON.stringify(simplified));
  }

  removeSettlement(settlementId: number): void {
    this.storage.remove(this.settlement + settlementId);
  }

  private getSettlementByStorageKey(key: string): Promise<string> {
    return this.storage.get(key);
  }
}
