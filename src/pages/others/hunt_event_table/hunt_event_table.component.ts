import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KDMDataService } from '../../../service/kdm_data.service';
import { HuntEvent } from '../../../model/hunte_event';

/**
 * Created by Daniel on 15.10.2017.
 */

@Component({
  selector: 'kdmf-page-hunt-event-table',
  templateUrl: 'hunt_event_table.component.html',
})
export class HuntEventTablePageComponent implements OnInit {
  huntEvents: HuntEvent[];

  constructor(public navCtrl: NavController, private kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.kdmService.getAllHuntEvents().then(huntEvents => this.huntEvents = huntEvents);
  }

}
