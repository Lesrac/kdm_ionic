import {Component, Input} from "@angular/core";
import {NavController, NavParams, ModalController} from "ionic-angular";
import {Settlement} from "../../models/settlement";
import {Monster} from "../../models/monster";
import {TimelineEventModal} from "../modal/timeline_event_modal";
import {Timeline} from "../../models/timeline";
import {LanternEvent} from "../../models/lantern_event";
import {DefeatedMonsterModal} from "../modal/defeated_monster_modal";
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
    //   this.settlement.defeatedMonsters.push(new Monster('White Lion'));
    let modal = this.modalCtrl.create(DefeatedMonsterModal, {
      settlement: this.settlement
    });
    modal.present();
  }

  timelineReached(event: Event, timeline: Timeline): void {
    if (timeline.lanternEvent != null && timeline.reached) {
      let modal = this.modalCtrl.create(TimelineEventModal, {
        lanternEvent: timeline.lanternEvent
      });
      modal.present({
        ev: event
      });
    }
  }

  eventReached(event: Event, lanternEvent: LanternEvent): void {
    if (lanternEvent.reached) {
      let popover = this.modalCtrl.create(TimelineEventModal, {
        lanternEvent: lanternEvent
      });
      popover.present({
        ev: event
      });
    }
  }

  checkMilestone(event: Event, what: string, value: number): void {
    this.settlement.milestones.forEach(milestone => {
      if (milestone.identifier == what && milestone.value == value && milestone.reached == false) {
        milestone.reached = true;
        let popover = this.modalCtrl.create(TimelineEventModal, {
          lanternEvent: milestone
        });
        popover.present({
          ev: event
        });
      }
    })
  }

}
