import { Component, OnInit } from '@angular/core';
import { Settlement } from '../../model/settlement';
import { AlertController, NavController } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm_data.service';
import { Survivor } from '../../model/survivor';
import { SurvivorPageComponent } from '../survivor/survivor.component';
/**
 * Created by Daniel on 24.02.2017.
 */
@Component({
  selector: 'kdmf-page-survivors',
  templateUrl: 'survivors.component.html',
})
export class SurvivorsPageComponent implements OnInit {

  settlementId: number = -1;
  settlements: Settlement[];
  settlement: Settlement;
  tempSettlement: Settlement;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.getSettlements();
  }

  goToDetail(survivor: Survivor): void {
    this.navCtrl.push(SurvivorPageComponent, {
      survivor,
    }).then();
  }

  selectedSettlement(settlement: Settlement): void {
    if (settlement) {
      this.tempSettlement = settlement;
    }
  }

  confirmChange(): void {
    if (this.tempSettlement) {
      this.settlement = this.tempSettlement;
      this.settlementId = this.settlement.id;
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
      const alert = this.alertCtrl.create({
        title: 'Confirm deletion',
        message: 'Do you want to delete ' + survivor.name + '?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            },
          },
          {
            text: 'Yes',
            handler: () => {
              this.settlement.survivors.splice(index, 1);
            },
          },
        ],
      });
      alert.present();
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
