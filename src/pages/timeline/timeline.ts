import {Component} from "@angular/core";
import {NavController, NavParams, ModalController} from "ionic-angular";
import {Timeline} from "../../model/timeline";
import {TimelineEventModal} from "../modal/timeline_event_modal";
/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {
  timeline: Timeline;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.timeline = params.get('timeline');
  }

  timelineReached(event: Event, timeline: Timeline): void {
    if (timeline.lanternEvent != null && timeline.reached) {
      let modal = this.modalCtrl.create(TimelineEventModal, {
        lanternEvent: timeline.lanternEvent
      });
      modal.present({
        ev: event
      });
    }
  }
}
