import { AfterViewInit, Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { LanternEvent } from '../../model/lantern-event';
import { SettlementTimeline } from '../../model/linking/settlement-timeline';
import { KDMDataService } from '../../service/kdm-data.service';
import { Settlement } from '../../model/settlement';
import { Timeline } from '../../model/timeline';

/**
 * Created by Daniel on 04.02.2017.
 */
@Component({
  selector: 'kdmf-add-timeline-event-modal',
  templateUrl: 'add-timeline-event-modal.component.html',
})
export class AddTimelineEventModalComponent implements AfterViewInit {
  settlementTimeline: SettlementTimeline[];
  replaceableTimeline: SettlementTimeline;
  lanternEvents: LanternEvent[];
  addChangeText: string;
  eventName: string;

  constructor(private params: NavParams, private kdmData: KDMDataService) {
    this.settlementTimeline = this.params.get('settlementTimeline');
    this.replaceableTimeline = this.params.get('replaceableTimeline');
    if (this.replaceableTimeline) {
      this.addChangeText = 'Change';
    } else {
      this.addChangeText = 'Add';
    }
  }

  ngAfterViewInit(): void {
    this.setup();
  }

  addClose(): void {
    const lanternEvent = this.lanternEvents.find((le: LanternEvent) => le.name === this.eventName);
    if (lanternEvent) {
      const settlement: Settlement = this.settlementTimeline[0].settlement;
      if (this.replaceableTimeline) {
        this.replaceableTimeline.timeline.lanternEvent = lanternEvent;
      } else {
        const maxPosition: number = this.settlementTimeline.length + 1;
        const timeline: Timeline = {
          position: maxPosition,
          lanternEvent: lanternEvent,
        };
        this.settlementTimeline.push(new SettlementTimeline(settlement, timeline));
      }
    }
    this.close();
  }

  close(): void {
  }

  private setup(): void {
    this.kdmData.getLanternEvents().then(lanternEvents =>
      this.lanternEvents = lanternEvents.sort(this.kdmData.sortByName));
  }
}
