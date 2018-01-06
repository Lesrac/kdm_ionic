import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Survivor } from '../../model/survivor';
import { DragulaService } from 'ng2-dragula';
import { Settlement } from '../../model/settlement';

/**
 * Created by Daniel on 06.01.2018.
 */
@Component({
  selector: 'kdmf-page-equipment-grid',
  templateUrl: 'equipment_grid.component.html',
})
export class EquipmentGridPageComponent {

  survivor: Survivor;
  settlement: Settlement;

  constructor(public params: NavParams, private dragulaService: DragulaService) {
    this.survivor = params.get('survivor');
    this.settlement = params.get('settlement');
    dragulaService.drop.subscribe((value) => {
      console.log('dropped');
      console.log(value);
    });
    dragulaService.drag.subscribe((value) => {
      console.log('dragged');
      console.log(value);
    });
    dragulaService.over.subscribe((value) => {
      console.log('over: ${value[0]}');
      console.log(value);
    });
    dragulaService.out.subscribe((value) => {
      console.log('out: ${value[0]}');
      console.log(value);
    });
  }

}
