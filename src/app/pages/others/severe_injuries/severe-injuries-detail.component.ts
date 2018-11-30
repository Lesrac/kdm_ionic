import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { KDMDataService } from '../../../service/kdm-data.service';
import { SevereInjury } from '../../../model/severe-injury';

/**
 * Created by Daniel on 15.10.2017.
 */

@Component({
  selector: 'kdmf-page-severe-injuries-detail', templateUrl: 'severe-injuries-detail.component.html',
})
export class SevereInjuriesDetailPageComponent implements OnInit {
  bodypart: string;
  severeInjuries: SevereInjury[];

  constructor(public params: NavParams, private kdmService: KDMDataService) {
    this.bodypart = params.get('bodypart');
  }

  ngOnInit(): void {
    this.kdmService.getSevereInjuriesToHitLocation(this.bodypart).then(foundSevereInjuries => this.severeInjuries = foundSevereInjuries);
  }

}
