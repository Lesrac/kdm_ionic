import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Location } from '../../model/location';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-location-detail',
  templateUrl: 'show-location-detail.component.html',
})
export class ShowLocationDetailComponent {

  location: Location;

  constructor(private params: NavParams) {
    this.location = this.params.get('object') as Location;
    console.log(this.location);
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
