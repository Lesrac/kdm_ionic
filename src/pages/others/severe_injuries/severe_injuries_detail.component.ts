import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KDMDataService } from '../../../service/kdm_data.service';
import { SevereInjury } from '../../../model/severe_injury';

/**
 * Created by Daniel on 15.10.2017.
 */

@Component({
  selector: 'kdmf-page-severe-injuries-detail',
  templateUrl: 'severe_injuries_detail.component.html',
})
export class SevereInjuriesDetailPageComponent implements OnInit {
  bodypart: string;
  severeInjuries: SevereInjury[];

  constructor(public navCtrl: NavController, public params: NavParams, private kdmService: KDMDataService) {
    this.bodypart = params.get('bodypart');
  }

  ngOnInit(): void {
    this.kdmService.getSevereInjuriesToHitLocation(this.bodypart).then(
      foundSevereInjuries => this.severeInjuries = foundSevereInjuries);
  }

}
