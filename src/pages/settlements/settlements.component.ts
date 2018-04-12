import { AlertController, ModalController, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Settlement } from '../../model/settlement';
import { SettlementPageComponent } from '../settlement/settlement.component';
import { KDMDataService } from '../../service/kdm_data.service';
import { CreateSettlementModalComponent } from '../settlement/create_settlement_modal.component';

/**
 * Created by Daniel on 27.01.2017.
 */

@Component({
  selector: 'kdmf-page-settlements',
  templateUrl: 'settlements.component.html',
})
export class SettlementsPageComponent implements OnInit {
  settlements: Settlement[] = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private alertCtrl: AlertController,
              private kdmService: KDMDataService) {
  }

  addSettlement(): void {
    console.log('add Settlement');
    let modal = this.modalCtrl.create(CreateSettlementModalComponent, {});
    modal.present().then();
  }

  ngOnInit(): void {
    this.kdmService.getSettlements().then(settlements => this.settlements = settlements);
  }

  goToDetail(settlement: Settlement): void {
    this.kdmService.getSettlement(settlement.id).then(settlementDesimplified => {
      this.navCtrl.push(SettlementPageComponent, {
        'settlement': settlementDesimplified,
      }).then();
    });
  }

  removeSettlement(settlement: Settlement): void {
    const alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Do you want to delete ' + settlement.name + '?',
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
            this.kdmService.removeSettlement(settlement);
          },
        },
      ],
    });
    alert.present();
  }

}
