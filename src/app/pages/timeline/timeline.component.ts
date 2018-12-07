import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TimelineEventModalComponent } from './timeline-event-modal.component';
import { SettlementTimeline } from '../../model/linking/settlement-timeline';
import { AddTimelineEventModalComponent } from './add-timeline-event-modal.component';

/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-timeline', templateUrl: 'timeline.component.html',
})
export class TimelinePageComponent implements OnInit {
  timeline: SettlementTimeline[];
  reorderActivityName: string = 'Reorder';
  reorderFlag: boolean = false;

  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit(): void {

  }

  timelineReached(event: Event, settlementTimeline: SettlementTimeline): void {
    if (settlementTimeline.timeline.lanternEvent != null && settlementTimeline.reached) {
      this.modalCtrl.create({
        component: TimelineEventModalComponent, componentProps: {
          lanternEvent: settlementTimeline.timeline.lanternEvent,
        },
      }).then(modal => modal.present());
    }
    if (settlementTimeline.reached) {
      this.timeline.forEach(settlementTimelineInternal => {
        if (settlementTimelineInternal.timeline.position < settlementTimeline.timeline.position) {
          settlementTimelineInternal.reached = true;
        }
      });
    } else {
      this.timeline.forEach(settlementTimelineInternal => {
        if (settlementTimelineInternal.timeline.position > settlementTimeline.timeline.position) {
          settlementTimelineInternal.reached = false;
        }
      });
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

  reorderItems(/*indexes: ReorderIndexes */): void {
    // change element position number
    /*  if (indexes.from < indexes.to) {
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
      this.timeline[indexes.from].timeline.position = indexes.to + 1; */
    // TODO   this.timeline = reorderArray(this.timeline, indexes);
  }

  addTimelineEvent(): void {
    this.modalCtrl.create({
      component: AddTimelineEventModalComponent, componentProps: {
        settlementTimeline: this.timeline,
      },
    }).then(modal => modal.present());
  }

  changeTimelineEvent(timelineevent: SettlementTimeline): void {
    this.modalCtrl.create({
      component: AddTimelineEventModalComponent, componentProps: {
        settlementTimeline: this.timeline, replaceableTimeline: timelineevent,
      },
    }).then(modal => modal.present());
  }

  removeTimelineEvent(timelineevent: SettlementTimeline): void {
    const index: number = this.timeline.findIndex(event => event === timelineevent);
    for (let i = index; i < this.timeline.length; i++) {
      this.timeline[i].timeline.position--;
    }
    this.timeline.splice(this.timeline.findIndex(event => event === timelineevent), 1);

  }
}
