import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Created by Daniel on 15.10.2017.
 */

@Component({
  selector: 'kdmf-page-severe-injuries-detail',
  templateUrl: 'severe_injuries_detail.component.html',
})
export class SevereInjuriesDetailPageComponent {
  bodypart: string;

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.bodypart = params.get('bodypart');
  }

}
