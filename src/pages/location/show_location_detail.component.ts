import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Location } from '../../model/location';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-location-detail',
  templateUrl: 'show_location_detail.component.html',
})
export class ShowLocationDetailComponent {

  location: Location;

  constructor(public viewCtrl: ViewController, private params: NavParams) {
    this.location = this.params.get('object') as Location;
    console.log(this.location.storageCreation.values());
  }

  isString(val: any): boolean {
    console.log(typeof val);
    return typeof val === 'string';
  }

}
