import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Timeline } from '../../model/timeline';
import { TimelineEventModalComponent } from './timeline_event_modal.component';
/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-timeline',
  templateUrl: 'timeline.component.html',
})
export class TimelinePageComponent {
  timeline: Timeline;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.timeline = params.get('timeline');
  }

  timelineReached(event: Event, timeline: Timeline): void {
    if (timeline.lanternEvent != null && timeline.reached) {
      let modal = this.modalCtrl.create(TimelineEventModalComponent, {
        lanternEvent: timeline.lanternEvent,
      });
      modal.present({
        ev: event,
      });
    }
  }
}
