import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TimelineEventModalComponent } from './timeline-event-modal.component';
import { SettlementTimeline } from '../../model/linking/settlement-timeline';
import { AddTimelineEventModalComponent } from './add-timeline-event-modal.component';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { KDMDataService } from '../../service/kdm-data.service';
import { Observable } from 'rxjs';
import { Settlement } from '../../model/settlement';

/**
 * Created by Daniel on 12.02.2017.
 */
@Component({
  selector: 'kdmf-page-timeline', templateUrl: 'timeline.component.html',
})
export class TimelinePageComponent implements OnInit {
  reorderActivityName: string = 'Reorder';
  reorderFlag: boolean = false;
  settlement$: Observable<Settlement>;
  localSettlement: Settlement;

  constructor(public router: Router, public route: ActivatedRoute, public modalCtrl: ModalController, public kdmData: KDMDataService) {
  }

  ngOnInit(): void {
    console.log('sucker');
    console.log(this.route.paramMap);
    this.settlement$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
        console.log('found stlmt');
        const stlmt = this.kdmData.getSettlement(+params.get('id'));
        stlmt.then(settlement => {
          this.localSettlement = settlement;
        });
        return stlmt;
      },
    ));
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
      this.localSettlement.timeline.forEach(settlementTimelineInternal => {
        if (settlementTimelineInternal.timeline.position < settlementTimeline.timeline.position) {
          settlementTimelineInternal.reached = true;
        }
      });
    } else {
      this.localSettlement.timeline.forEach(settlementTimelineInternal => {
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
        settlementTimeline: this.localSettlement.timeline,
      },
    }).then(modal => modal.present());
  }

  changeTimelineEvent(timelineevent: SettlementTimeline): void {
    this.modalCtrl.create({
      component: AddTimelineEventModalComponent, componentProps: {
        settlementTimeline: this.localSettlement.timeline, replaceableTimeline: timelineevent,
      },
    }).then(modal => modal.present());
  }

  removeTimelineEvent(timelineevent: SettlementTimeline): void {
    const index: number = this.localSettlement.timeline.findIndex(event => event === timelineevent);
    for (let i = index; i < this.localSettlement.timeline.length; i++) {
      this.localSettlement.timeline[i].timeline.position--;
    }
    this.localSettlement.timeline.splice(this.localSettlement.timeline.findIndex(event => event === timelineevent), 1);

  }
}
