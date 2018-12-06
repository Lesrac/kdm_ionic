import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Settlement } from '../../model/settlement';
import { KDMDataService } from '../../service/kdm-data.service';
import { CreateSettlementModalComponent } from '../settlement/create-settlement-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Created by Daniel on 27.01.2017.
 */

@Component({
  selector: 'kdmf-page-settlements', templateUrl: 'settlements.component.html',
})
export class SettlementsPageComponent implements OnInit {
  settlements: Settlement[] = [];

  constructor(public router: Router, public route: ActivatedRoute, public modalCtrl: ModalController, private alertCtrl: AlertController, private kdmService: KDMDataService) {
  }

  addSettlement(): void {
    console.log('add Settlement');
    this.modalCtrl.create({component: CreateSettlementModalComponent}).then(modal => modal.present());
  }

  ngOnInit(): void {
    this.kdmService.getSettlements().then(settlements => this.settlements = settlements);
  }

  goToDetail(settlement: Settlement): void {
    this.router.navigate(['kdm', {outlets: {settlements: [settlement.id]}}]).then();
  }

  removeSettlement(settlement: Settlement): void {
    this.alertCtrl.create({
      header: 'Confirm deletion', message: 'Do you want to delete ' + settlement.name + '?', buttons: [{
        text: 'Cancel', role: 'cancel', handler: () => {
        },
      }, {
        text: 'Yes', handler: () => {
          this.kdmService.removeSettlement(settlement);
        },
      }],
    }).then(alert => alert.present());
  }

}
