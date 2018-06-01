import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Survivor } from '../../model/survivor';
import { Settlement } from '../../model/settlement';

/**
 * Created by Daniel on 06.01.2018.
 */
@Component({
  selector: 'kdmf-page-equipment-grid',
  templateUrl: 'equipment-grid.component.html',
})
export class EquipmentGridPageComponent {

  survivor: Survivor;
  settlement: Settlement;

  constructor(public params: NavParams) {
    this.survivor = params.get('survivor');
    this.settlement = params.get('settlement');
  }
}
