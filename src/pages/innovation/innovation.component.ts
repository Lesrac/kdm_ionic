import { Component } from '@angular/core';
import { Settlement } from '../../model/settlement';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm_data.service';
import { Innovation } from '../../model/innovation';
import { InnovationModalComponent } from './innovation_modal.component';
/**
 * Created by Daniel on 19.02.2017.
 */
@Component({
  selector: 'kdmf-page-innovation',
  templateUrl: 'innovation.component.html',
})
export class InnovationPageComponent {

  settlement: Settlement;
  innovations: Innovation[];

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController,
              private kdmData: KDMDataService) {
    this.settlement = params.get('settlement');
    this.innovations = this.settlement.innovations.sort(this.kdmData.sortByName);
  }

  addInnovation(): void {
    let modal = this.modalCtrl.create(InnovationModalComponent, {
      settlement: this.settlement,
    });
    modal.present();
  }

  removeInnovation(innovation: Innovation): void {
    const index = this.settlement.innovations.findIndex(x => x === innovation);
    this.settlement.innovations.splice(index, 1);
  }
}
