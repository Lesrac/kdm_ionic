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
  filteredHuntEvents: HuntEvent[];
  allHuntEvents: HuntEvent[];

  constructor(public navCtrl: NavController, private kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.kdmService.getAllHuntEvents().then(huntEvents => {
      this.allHuntEvents = huntEvents;
      this.filteredHuntEvents = huntEvents;
    });
  }

  filterEventTable(event: any) {
    let val = event.target.value;
    if (val && val.trim() !== '') {
      this.filteredHuntEvents = this.allHuntEvents.filter(huntEvent =>
        huntEvent.name.toLowerCase().includes(val.toLowerCase().trim()) ||
        huntEvent.rollResult === +val);
    } else {
      this.filteredHuntEvents = this.allHuntEvents;
    }
  }

}
