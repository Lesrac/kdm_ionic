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

  constructor(private storage: Storage) {
    console.log('Enter: KDMDBService');
  }

  initDB(): void {
  }

  getSettlements(): Promise<Settlement[]> {
    return this.storage.get(this.settlements);
  }

  saveSettlements(settlements: Settlement[]): void {
    settlements.forEach(settlement => this.saveSettlement(settlement));
  }

  saveSettlement(settlement: Settlement): void {
    console.log('saveSettlement');
    console.log(settlement);
    const simplified: SettlementSimplified = DeSimplifyObjects.simplifySettlement(settlement);
    console.log(JSON.stringify(simplified));
    this.storage.set('settlement' + settlement.id, JSON.stringify(simplified)).then(what => {
      console.log('set key value pair');
      console.log(what);
    });
  }

}
