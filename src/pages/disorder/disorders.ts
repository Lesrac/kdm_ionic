import { Component } from '@angular/core';
import { Disorder } from '../../model/disorder';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DisorderModal } from './disorder_modal';
/**
 * Created by Daniel on 12.03.2017.
 */
@Component({
  selector: 'kdmf-page-disorder',
  templateUrl: 'disorders.html',
})
export class DisordersPage {
  disorders: Disorder[];

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.disorders = params.get('disorders');
  }

  addDisorder(): void {
    let modal = this.modalCtrl.create(DisorderModal, {
      disorders: this.disorders,
    });
    modal.present();
  }

  removeDisorder(disorder: Disorder): void {
    const index = this.disorders.findIndex(x => x === disorder);
    this.disorders.splice(index, 1);
  }
}
