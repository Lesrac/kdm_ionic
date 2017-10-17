import { AfterViewInit, Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { LanternEvent } from '../../model/lantern_event';
import { SettlementTimeline } from '../../model/linking/settlement_timeline';
import { KDMDataService } from '../../service/kdm_data.service';
import { Settlement } from '../../model/settlement';
import { Timeline } from '../../model/timeline';

/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
  selector: 'kdmf-add-timeline-event-modal',
  templateUrl: 'add_timeline_event_modal.component.html',
})
export class AddTimelineEventModalComponent implements AfterViewInit {
  settlementTimeline: SettlementTimeline[];
  replaceableTimeline: SettlementTimeline;
  lanternEvents: LanternEvent[];
  addChangeText: string;
  eventName: string;

  constructor(public viewCtrl: ViewController, private params: NavParams, private kdmData: KDMDataService,
              private kdmService: KDMDataService) {
    this.settlementTimeline = this.params.get('settlementTimeline');
    this.replaceableTimeline = this.params.get('replaceableTimeline');
    if (this.replaceableTimeline) {
      this.addChangeText = 'Change';
    } else {
      this.addChangeText = 'Add';
    }
    console.log(this.settlementTimeline);
    console.log(this.replaceableTimeline);
  }

  ngAfterViewInit(): void {
    this.setup();
  }

  addClose(): void {
    const lanternEvent = this.lanternEvents.find((le: LanternEvent) => le.name === this.eventName);
    if (lanternEvent) {
      if (this.replaceableTimeline) {
        this.replaceableTimeline.timeline.lanternEvent = lanternEvent;
      } else {
        const maxPosition: number = this.settlementTimeline.length + 1;
        const timeline: Timeline = {
          position: maxPosition,
          lanternEvent: lanternEvent,
        };
        this.kdmService.getSettlement(this.settlementTimeline[0].settlement).then(settlement =>
          this.settlementTimeline.push(new SettlementTimeline(settlement, timeline),
          ));
      }
    }
    this.close();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  private setup(): void {
    this.kdmData.getLanternEvents().then(lanternEvents =>
      this.lanternEvents = lanternEvents.sort(this.kdmData.sortByName));
  }
}
