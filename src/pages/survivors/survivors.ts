import { Component, OnInit } from '@angular/core';
import { Settlement } from '../../model/settlement';
import { NavController } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm_data.service';
import { Survivor } from '../../model/survivor';
/**
 * Created by Daniel on 24.02.2017.
 */
@Component({
  selector: 'kdmf-page-survivors',
  templateUrl: 'survivors.html',
})
export class SurvivorsPage implements OnInit {

  settlementId: number = 0;
  settlements: Settlement[];
  settlement: Settlement;
  tempSettlement: Settlement;

  constructor(public navCtrl: NavController, private kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.getSettlements();
  }

  selectedSettlement(settlement: Settlement): void {
    if (settlement) {
      this.tempSettlement = settlement;
    }
  }

  confirmChange(): void {
    if (this.tempSettlement) {
      this.settlement = this.tempSettlement;
    }
  }

  addSurvivor(): void {
    this.settlement.survivors.push(new Survivor('Survivor ' + Survivor.counter));
  }

  survivorsCheck(): boolean {
    return (this.settlement &&
    this.settlement.survivors.filter(survivor => survivor.isAlive).length > this.settlement.population);
  }

  removeSurvivor(survivor: Survivor): void {
    const index: number = this.settlement.survivors.findIndex(s => survivor === s);
    if (index >= 0) {
      this.settlement.survivors.splice(index, 1);
    }
  }

  private getSettlements(): void {
    this.kdmService.getSettlements().then(settlements => {
      if (settlements) {
        this.settlements = settlements;
      } else {
        this.settlements = [];
      }
    });
  }

}
