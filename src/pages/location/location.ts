import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {Settlement} from "../../model/settlement";
/**
 * Created by Daniel on 14.02.2017.

 */
@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {

  settlement: Settlement;

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.settlement = params.get('settlement');
    console.log(this.settlement);
  }

}
