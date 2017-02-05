import {Component, Input} from "@angular/core";
import {NavController, NavParams, PopoverController, ModalController} from "ionic-angular";
import {Settlement} from "../../models/settlement";
import {Monster} from "../../models/monster";
import {TimelineEventModal} from "../modal/timeline_event_modal";
import {Timeline} from "../../models/timeline";
/**
 * Created by Daniel on 27.01.2017.
 */
@Component({
  selector: 'page-settlement',
  templateUrl: 'settlement.html'
})
export class SettlementPage {
  @Input()
  settlement: Settlement;

  deathCounts: number[] = Array(36).fill((x, i) => i);

  lostSettlements: number[] = Array(19).fill((x, i) => i);

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public params: NavParams) {
    if (params.get("settlement")) {
      this.settlement = params.get("settlement");
    }
  }

  addDefeatedMonster(): void {
    this.settlement.defeatedMonsters.push(new Monster('White Lion'));
  }

  timelineeventReached(event: Event, timeline: Timeline): void {
    if (timeline.reached && timeline.event != null) {
      let popover = this.modalCtrl.create(TimelineEventModal, {
        timeline: timeline
      });
      popover.present({
        ev: event
      });
    }
  }
}
