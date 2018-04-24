import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { LanternEvent } from '../../model/lantern-event';

/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
  selector: 'kdmf-timeline-event-modal',
  templateUrl: 'timeline-event-modal.component.html',
})
export class TimelineEventModalComponent {
  lanternEvent: LanternEvent;

  constructor(public viewCtrl: ViewController, private params: NavParams) {
    this.lanternEvent = this.params.get('lanternEvent');
  }

  close(): void {
    this.viewCtrl.dismiss();
  }
}
