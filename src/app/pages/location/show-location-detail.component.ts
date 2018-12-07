import { Component, OnInit } from '@angular/core';
import { Location } from '../../model/location';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KDMDataService } from '../../service/kdm-data.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Settlement } from '../../model/settlement';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-location-detail',
  templateUrl: 'show-location-detail.component.html',
})
export class ShowLocationDetailComponent implements OnInit {

  location$: Observable<Location>;
  settlement$: Observable<Settlement>;

  constructor(public route: ActivatedRoute, public kdmData: KDMDataService) {
  }

  ngOnInit(): void {
    this.location$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      console.log(params.get('name'));
      return this.kdmData.getLocation(params.get('name'));
    }));
    this.settlement$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.kdmData.getSettlement(+params.get('id'))));
  }

  containsOrElement(value): boolean {
    let isOrElement: boolean = false;
    for (let i = 0; i < value.costs.length; i++) {
      const val = value.costs[i];
      if (val.amount.length > 1) {
        isOrElement = true;
        break;
      }
    }
    return isOrElement;
  }

}
