import {Component, Input} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Settlement} from "../../models/settlement";
/**
 * Created by Daniel on 27.01.2017.
 */
@Component({
  selector: 'page-settlement',
  templateUrl: 'settlement.html'
})
export class SettlementPage {
  @Input()
  settlement: Settlement;

  deathCounts: number[] = Array(36).fill((x, i) => i);

  lostSettlements: number[] = Array(19).fill((x, i) => i);

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.settlement = params.get("settlement");
  }
}
