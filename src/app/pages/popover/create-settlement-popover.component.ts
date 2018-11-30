import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Settlement } from '../../model/settlement';

/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
  selector: 'kdmf-popover-create-settlement',
  templateUrl: 'create-settlement-popover.component.html',
})
export class CreateSettlementPopoverComponent {
  settlement: Settlement;

  constructor(private params: NavParams) {
    this.settlement = this.params.get('se');
  }

  close() {
  }
}
