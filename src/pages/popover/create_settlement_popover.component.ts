import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Settlement } from '../../model/settlement';

/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
  selector: 'kdmf-popover-create-settlement',
  templateUrl: 'create_settlement_popover.component.html',
})
export class CreateSettlementPopoverComponent {
  settlement: Settlement;

  constructor(public viewCtrl: ViewController, private params: NavParams) {
    this.settlement = this.params.get('se');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
