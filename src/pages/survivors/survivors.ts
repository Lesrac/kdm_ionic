import { Component, OnInit } from '@angular/core';
import { Settlement } from '../../model/settlement';
import { NavController } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm_data.service';
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
