import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, reorderArray } from 'ionic-angular';
import { TimelineEventModalComponent } from './timeline_event_modal.component';
import { SettlementTimeline } from '../../model/linking/settlement_timeline';
import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';
import { AddTimelineEventModalComponent } from './add_timeline_event_modal.component';
import { KDMDBService } from '../../service/kdm_db.service';

/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-timeline',
  templateUrl: 'timeline.component.html',
})
export class TimelinePageComponent {
  timeline: SettlementTimeline[];
  reorderActivityName: string = 'Reorder';
  reorderFlag: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController,
              private kdmdbService: KDMDBService) {
    this.timeline = params.get('settlementTimeline');
  }

  ionViewDidLeave(): void {
    this.kdmdbService.saveSettlement(this.timeline[0].settlement);
  }

  timelineReached(event: Event, settlementTimeline: SettlementTimeline): void {
    if (settlementTimeline.timeline.lanternEvent != null && settlementTimeline.reached) {
      let modal = this.modalCtrl.create(TimelineEventModalComponent, {
        lanternEvent: settlementTimeline.timeline.lanternEvent,
      });
      modal.present({
        ev: event,
      });
    }
    if (settlementTimeline.reached) {
      this.timeline.forEach(settlementTimelineInternal => {
          if (settlementTimelineInternal.timeline.position < settlementTimeline.timeline.position) {
            settlementTimelineInternal.reached = true;
          }
        },
      );
    } else {
      this.timeline.forEach(settlementTimelineInternal => {
          if (settlementTimelineInternal.timeline.position > settlementTimeline.timeline.position) {
            settlementTimelineInternal.reached = false;
          }
        },
      );
    }
  }

  changeReorder(): void {
    this.reorderFlag = !this.reorderFlag;
    if (this.reorderFlag) {
      this.reorderActivityName = 'Disable';
    } else {
      this.reorderActivityName = 'Reorder';
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

  addTimelineEvent(): void {
    let modal = this.modalCtrl.create(AddTimelineEventModalComponent, {
      settlementTimeline: this.timeline,
    });
    modal.present();
  }

  changeTimelineEvent(timelineevent: SettlementTimeline): void {
    let modal = this.modalCtrl.create(AddTimelineEventModalComponent, {
      settlementTimeline: this.timeline,
      replaceableTimeline: timelineevent,
    });
    modal.present();
  }

  removeTimelineEvent(timelineevent: SettlementTimeline): void {
    const index: number = this.timeline.findIndex(event => event === timelineevent);
    for (let i = index; i < this.timeline.length; i++) {
      this.timeline[i].timeline.position--;
    }
    this.timeline.splice(this.timeline.findIndex(event => event === timelineevent), 1);

  }
}
