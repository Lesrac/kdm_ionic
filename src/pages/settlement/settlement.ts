import {Component, Input, OnInit} from "@angular/core";
import {NavController, NavParams, ModalController} from "ionic-angular";
import {Settlement} from "../../model/settlement";
import {TimelineEventModal} from "../modal/timeline_event_modal";
import {Timeline} from "../../model/timeline";
import {LanternEvent} from "../../model/lantern_event";
import {DefeatedMonsterModal} from "../modal/defeated_monster_modal";
import {KDMCheckerService} from "../../service/kdm_checker.service";
import {FormArray, FormControl, FormBuilder, FormGroup} from "@angular/forms";
/**
 * Created by Daniel on 27.01.2017.
 */
@Component({
  selector: 'page-settlement',
  templateUrl: 'settlement.html'
})
export class SettlementPage implements OnInit {

  private static max_deaths: number = 36;
  private static max_lost_settlements: number = 19;
  @Input()
  settlement: Settlement;

  deathCountGroup: FormGroup;

  lostSettlementGroup: FormGroup;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public params: NavParams, public kdmChecker: KDMCheckerService, public formBuilder: FormBuilder) {
    if (params.get("settlement")) {
      this.settlement = params.get("settlement");
    }
  }

  ngOnInit(): void {
    this.setupDeathcounts();
    this.setupLostSettlements();
  }

  private setupDeathcounts(): void {
    const checkboxArray = new FormArray([]);
    for (let i: number = 0; i < SettlementPage.max_deaths; i++) {
      if (i < this.settlement.deathcount) {
        checkboxArray.push(new FormControl(true));
      } else {
        checkboxArray.push(new FormControl(false));
      }
    }
    this.deathCountGroup = this.formBuilder.group({deathCounts: checkboxArray});
  }

  private setupLostSettlements(): void {
    const checkboxArray = new FormArray([]);
    for (let i: number = 0; i < SettlementPage.max_lost_settlements; i++) {
      if (i < this.settlement.settlementLost) {
        checkboxArray.push(new FormControl(true));
      } else {
        checkboxArray.push(new FormControl(false));
      }
    }
    this.lostSettlementGroup = this.formBuilder.group({settlementCounts: checkboxArray});
  }

  updateDeathcount(event: Event, control: FormControl): void {
    if (control.value) {
      this.settlement.deathcount++;
      this.settlement.population--;
      this.checkMilestone(event, 'death', this.settlement.deathcount);
    } else {
      this.settlement.deathcount--;
    }
  }

  updateLostSettlement(event: Event, control: FormControl): void {
    if (control.value) {
      this.settlement.settlementLost++;
    } else {
      this.settlement.settlementLost--;
    }
  }

  addDefeatedMonster(): void {
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

  checkMilestone(event: Event, identifier: string, value: number | string): void {
    this.settlement.milestones.forEach(milestone => {
      if (this.kdmChecker.checkMilestone(milestone, identifier, value)) {
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
