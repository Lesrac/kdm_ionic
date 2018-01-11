import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Survivor } from '../../model/survivor';
import { dragula, DragulaService } from 'ng2-dragula';
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
    this.dragulaService.drop.subscribe((value: any[]) => {
      console.log('dropped');
      console.log(value);
      let drake = this.dragulaService.find('my-bag').drake;
      let models = drake.models;
      console.log(drake);
      console.log(models);
      drake.cancel(true);
      this.onDropModel(value);
    });
    this.dragulaService.setOptions('my-bag', {
      revertOnSpill: true,
    });

  }

  private onDropModel(args) {
    console.log(args);
    // Here, this.playlists contains the elements reordered
  }

}
