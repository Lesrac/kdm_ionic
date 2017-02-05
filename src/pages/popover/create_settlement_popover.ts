import {Component} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {Settlement} from "../../models/settlement";
/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
  selector: 'create-settlement-popover',
  templateUrl: 'create_settlement_popover.html'
})
export class CreateSettlementPopover {
  settlement: Settlement;

  constructor(public viewCtrl: ViewController, private params: NavParams)
  {
    this.settlement = this.params.get('se');
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
