import {Component} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {LanternEvent} from "../../models/lantern_event";
/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
  selector: 'timeline-event-modal',
  templateUrl: 'timeline_event_modal.html'
})
export class TimelineEventModal {
  lanternEvent: LanternEvent;

  constructor(public viewCtrl: ViewController, private params: NavParams)
  {
    this.lanternEvent = this.params.get('lanternEvent');
    console.log(this.lanternEvent);
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
