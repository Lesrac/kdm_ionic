import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { KDMDataService } from '../../../service/kdm-data.service';
import { DiceThrow } from '../../../model/dice-throw';

/**
 * Created by Daniel on 15.10.2017.
 */
@Component({
  selector: 'kdmf-page-brain-trauma', templateUrl: 'brain-trauma.component.html',
})
export class BrainTraumaPageComponent implements OnInit {
  diceThrows: DiceThrow[];

  constructor(public navCtrl: NavController, private kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.kdmService.getAllBrainTraumas().then(foundBrainTraumas => this.diceThrows = foundBrainTraumas);
  }
}
