import { Component, OnInit } from '@angular/core';
import { KDMDataService } from '../../../service/kdm-data.service';
import { SevereInjury } from '../../../model/severe-injury';
import { ActivatedRoute } from '@angular/router';

/**
 * Created by Daniel on 15.10.2017.
 */

@Component({
  selector: 'kdmf-page-severe-injuries-detail', templateUrl: 'severe-injuries-detail.component.html',
})
export class SevereInjuriesDetailPageComponent implements OnInit {
  bodypart: string;
  severeInjuries: SevereInjury[];

  constructor(public route: ActivatedRoute, public kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.bodypart = data.bodypart);
    this.kdmService.getSevereInjuriesToHitLocation(this.bodypart).then(foundSevereInjuries => this.severeInjuries = foundSevereInjuries);
  }

}
