import {Component} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {Timeline} from "../../models/timeline";
/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
  selector: 'timeline-event-modal',
  templateUrl: 'timeline_event_modal.html'
})
export class TimelineEventModal {
  timeline: Timeline;

  constructor(public viewCtrl: ViewController, private params: NavParams)
  {
    this.timeline = this.params.get('timeline');
    console.log(this.timeline);
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
