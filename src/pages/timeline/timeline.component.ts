import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, reorderArray } from 'ionic-angular';
import { TimelineEventModalComponent } from './timeline_event_modal.component';
import { SettlementTimeline } from '../../model/linking/settlement_timeline';
import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';

/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-timeline',
  templateUrl: 'timeline.component.html',
})
export class TimelinePageComponent {
  timeline: SettlementTimeline[];

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
    if (timeline.reached) {
      this.timeline.forEach(settlementTimeline => {
          if (settlementTimeline.timeline.position < timeline.timeline.position) {
            settlementTimeline.reached = true;
          }
        },
      );
    } else {
      this.timeline.forEach(settlementTimeline => {
          if (settlementTimeline.timeline.position > timeline.timeline.position) {
            settlementTimeline.reached = false;
          }
        },
      );
    }
  }

  reorderItems(indexes: ReorderIndexes): void {
    // change element position number
    if (indexes.from < indexes.to) {
      for (let i = 0; i <= indexes.to; i++) {
        const position = this.timeline[i].timeline.position;
        if (position > indexes.from + 1 && position <= indexes.to + 1) {
          this.timeline[i].timeline.position--;
        }
      }
    } else {
      for (let i = indexes.from; i >= indexes.to; i--) {
        const position = this.timeline[i].timeline.position;
        if (position < indexes.from + 1 && position >= indexes.to + 1) {
          this.timeline[i].timeline.position++;
        }
      }
    }
    this.timeline[indexes.from].timeline.position = indexes.to + 1;
    this.timeline = reorderArray(this.timeline, indexes);
  }
}
