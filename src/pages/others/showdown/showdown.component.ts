import { Component } from '@angular/core';
import { NavParams, NavController, ModalController } from 'ionic-angular';
import { Monster } from '../../../model/monster';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-showdown',
  templateUrl: 'showdown.component.html',
})
export class ShowdownPageComponent {

  monster: Monster;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.monster = params.get('monster');
  }

}
