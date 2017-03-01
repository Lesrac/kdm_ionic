import { Component, OnInit } from '@angular/core';
import { Survivor } from '../../model/survivor';
import { NavParams, ModalController, NavController } from 'ionic-angular';
/**
 * Created by Daniel on 01.03.2017.
 */
@Component({
  selector: 'kdmf-page-survivor',
  templateUrl: 'survivor.html',
})
export class SurvivorPage implements OnInit {

  survivor: Survivor;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public params: NavParams) {
    this.survivor = params.get('survivor');
  }

  ngOnInit(): void {
  }

}
