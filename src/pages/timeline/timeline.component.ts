import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { TimelineEventModalComponent } from './timeline_event_modal.component';
import { SettlementTimeline } from '../../model/linking/settlement_timeline';

/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-timeline',
  templateUrl: 'timeline.component.html',
})
export class TimelinePageComponent {
  timeline: SettlementTimeline;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.timeline = params.get('settlementTimeline');
  }

  timelineReached(event: Event, timeline: SettlementTimeline): void {
    if (timeline.timeline.lanternEvent != null && timeline.reached) {
      let modal = this.modalCtrl.create(TimelineEventModalComponent, {
        lanternEvent: timeline.timeline.lanternEvent,
      });
      modal.present({
        ev: event,
      });
    }
  }
}
