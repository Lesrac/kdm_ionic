import { Component } from '@angular/core';
import { Disorder } from '../../model/disorder';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DisorderModalComponent } from './disorder_modal.component';
/**
 * Created by Daniel on 12.03.2017.
 */
@Component({
  selector: 'kdmf-page-disorder',
  templateUrl: 'disorders.component.html',
})
export class DisordersPageComponent {
  disorders: Disorder[];

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.disorders = params.get('disorders');
  }

  addDisorder(): void {
    let modal = this.modalCtrl.create(DisorderModalComponent, {
      disorders: this.disorders,
    });
    modal.present();
  }

  removeDisorder(disorder: Disorder): void {
    const index = this.disorders.findIndex(x => x === disorder);
    this.disorders.splice(index, 1);
  }
}
