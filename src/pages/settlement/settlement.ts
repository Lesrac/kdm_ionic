import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { TimelineEventModal } from '../timeline/timeline_event_modal';
import { LanternEvent } from '../../model/lantern_event';
import { KDMCheckerService } from '../../service/kdm_checker.service';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { TimelinePage } from '../timeline/timeline';
import { DefeatedMonsterPage } from '../defeated_monster/defeated_monster';
import { LocationPage } from '../location/location';
import { StoragePage } from '../storage/storage';
import { InnovationPage } from '../innovation/innovation';
import { Survivor } from '../../model/survivor';
/**
 * Created by Daniel on 27.01.2017.
 */
@Component({
  selector: 'kdmf-page-settlement',
  templateUrl: 'settlement.html',
})
export class SettlementPage implements OnInit {

  private static MAX_DEATHS: number = 36;
  private static MAX_LOST_SETTLEMENTS: number = 19;
  @Input()
  settlement: Settlement;

  deathCountGroup: FormGroup;

  lostSettlementGroup: FormGroup;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public params: NavParams,
              public kdmChecker: KDMCheckerService, public formBuilder: FormBuilder) {
    if (params.get('settlement')) {
      this.settlement = params.get('settlement');
    }
  }

  ngOnInit(): void {
    this.setupDeathcounts();
    this.setupLostSettlements();
  }

  updateDeathcount(event: Event, control: FormControl): void {
    if (control.value) {
      this.settlement.deathcount++;
      this.settlement.population--;
      this.checkMilestone(event, 'death', this.settlement.deathcount);
    } else {
      this.settlement.deathcount--;
      this.settlement.population++;
    }
  }

  updateLostSettlement(event: Event, control: FormControl): void {
    if (control.value) {
      this.settlement.settlementLost++;
    } else {
      this.settlement.settlementLost--;
    }
  }

  showTimeline(): void {
    this.navCtrl.push(TimelinePage, {
      timeline: this.settlement.timeline,
    }).then();
  }

  showDefeatedMonsters(): void {
    this.navCtrl.push(DefeatedMonsterPage, {
      settlement: this.settlement,
    }).then();
  }

  showInnovations(): void {
    this.navCtrl.push(InnovationPage, {
      settlement: this.settlement,
    }).then();
  }

  showSettlementLocations(): void {
    this.navCtrl.push(LocationPage, {
      settlement: this.settlement,
    }).then();
  }

  showStorage(): void {
    this.navCtrl.push(StoragePage, {
      settlement: this.settlement,
    }).then();
  }

  eventReached(event: Event, lanternEvent: LanternEvent): void {
    if (lanternEvent.reached) {
      let popover = this.modalCtrl.create(TimelineEventModal, {
        lanternEvent: lanternEvent,
      });
      popover.present({
        ev: event,
      });
    }
  }

  checkMilestone(event: Event, identifier: string, value: number | string): void {
    if (value != null) {
      this.settlement.milestones.forEach(milestone => {
        if (this.kdmChecker.checkMilestone(milestone, identifier, value)) {
          milestone.reached = true;
          let popover = this.modalCtrl.create(TimelineEventModal, {
            lanternEvent: milestone,
          });
          popover.present({
            ev: event,
          });
        }
      });
    }
  }

  increaseSurvivalLimit(): void {
    this.settlement.survivalLimit++;
  }

  decreaseSurvivalLimit(): void {
    this.settlement.survivalLimit--;
  }

  increasePopulation(): void {
    const stlmt = this.settlement;
    stlmt.population++;
    if (stlmt.survivors.length < stlmt.population) {
      this.addSurvivor();
    }
  }

  addSurvivor(): void {
    this.settlement.survivors.push(new Survivor('Survivor ' + Survivor.counter));
  }

  decreasePopulation(): void {
    this.settlement.population--;
  }

  populationChecker(): void {
    const population = this.settlement.population;
    this.checkMilestone(null, 'population', population);
    const survivors = this.settlement.survivors.length;
    if (survivors <= population) {
      const difference = population - survivors;
      for (let i = 0; i < difference; i++) {
        this.addSurvivor();
      }
    }
  }

  private setupDeathcounts(): void {
    const checkboxArray = new FormArray([]);
    for (let i: number = 0; i < SettlementPage.MAX_DEATHS; i++) {
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
    for (let i: number = 0; i < SettlementPage.MAX_LOST_SETTLEMENTS; i++) {
      if (i < this.settlement.settlementLost) {
        checkboxArray.push(new FormControl(true));
      } else {
        checkboxArray.push(new FormControl(false));
      }
    }
    this.lostSettlementGroup = this.formBuilder.group({settlementCounts: checkboxArray});
  }

}
