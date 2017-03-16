import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { TimelineEventModalComponent } from '../timeline/timeline_event_modal.component';
import { LanternEvent } from '../../model/lantern_event';
import { KDMCheckerService } from '../../service/kdm_checker.service';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { TimelinePageComponent } from '../timeline/timeline.component';
import { DefeatedMonsterPageComponent } from '../defeated_monster/defeated_monster.component';
import { LocationPageComponent } from '../location/location.component';
import { StoragePageComponent } from '../storage/storage.component';
import { InnovationPageComponent } from '../innovation/innovation.component';
import { Survivor } from '../../model/survivor';
import { ShowListComponent } from '../template/show_list.component';
import { ShowListTypes } from '../../model/show_list_types';
/**
 * Created by Daniel on 27.01.2017.
 */
@Component({
  selector: 'kdmf-page-settlement',
  templateUrl: 'settlement.component.html',
})
export class SettlementPageComponent implements OnInit {
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
    this.navCtrl.push(TimelinePageComponent, {
      timeline: this.settlement.timeline,
    }).then();
  }

  showDefeatedMonsters(): void {
    this.navCtrl.push(DefeatedMonsterPageComponent, {
      settlement: this.settlement,
    }).then();
  }

  showInnovations(): void {
    this.navCtrl.push(ShowListComponent, {
      objects: this.settlement.innovations,
      type: ShowListTypes.Innovation,
    }).then();
  }

  showSettlementLocations(): void {
    this.navCtrl.push(LocationPageComponent, {
      settlement: this.settlement,
    }).then();
  }

  showStorage(): void {
    this.navCtrl.push(StoragePageComponent, {
      settlement: this.settlement,
    }).then();
  }

  eventReached(event: Event, lanternEvent: LanternEvent): void {
    if (lanternEvent.reached) {
      let popover = this.modalCtrl.create(TimelineEventModalComponent, {
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
          let popover = this.modalCtrl.create(TimelineEventModalComponent, {
            lanternEvent: milestone,
          });
          popover.present({
            ev: event,
          });
        }
      });
    }
  }

  survivalLimitChange(event): void {
    if (typeof event === 'number') {
      this.settlement.survivalLimit = event;
    }
  }

  populationChange(event): void {
    if (typeof event === 'number') {
      const stlmt = this.settlement;
      stlmt.population = event;
      if (stlmt.survivors.length < stlmt.population) {
        this.addSurvivor();
      }
      this.populationChecker();
    }
  }

  addSurvivor(): void {
    this.settlement.survivors.push(new Survivor('Survivor ' + Survivor.counter));
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
    for (let i: number = 0; i < SettlementPageComponent.MAX_DEATHS; i++) {
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
    for (let i: number = 0; i < SettlementPageComponent.MAX_LOST_SETTLEMENTS; i++) {
      if (i < this.settlement.settlementLost) {
        checkboxArray.push(new FormControl(true));
      } else {
        checkboxArray.push(new FormControl(false));
      }
    }
    this.lostSettlementGroup = this.formBuilder.group({settlementCounts: checkboxArray});
  }

}
