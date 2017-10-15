import { Component, OnInit } from '@angular/core';
import { BrainTrauma } from '../../../model/brain_trauma';
import { NavController } from 'ionic-angular';
import { KDMDataService } from '../../../service/kdm_data.service';

/**
 * Created by Daniel on 15.10.2017.
 */
@Component({
  selector: 'kdmf-page-brain-trauma',
  templateUrl: 'brain_trauma.component.html',
})
export class BrainTraumaPageComponent implements OnInit {
  brainTraumas: BrainTrauma[];

  constructor(public navCtrl: NavController, private kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.kdmService.getAllBrainTraumas().then(foundBrainTraumas => this.brainTraumas = foundBrainTraumas);
  }
}
