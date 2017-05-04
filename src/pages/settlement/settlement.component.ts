import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { TimelineEventModalComponent } from '../timeline/timeline_event_modal.component';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { TimelinePageComponent } from '../timeline/timeline.component';
import { DefeatedMonsterPageComponent } from '../defeated_monster/defeated_monster.component';
import { StoragePageComponent } from '../storage/storage.component';
import { InnovationPageComponent } from '../innovation/innovation.component';
import { Survivor } from '../../model/survivor';
import { ShowListComponent } from '../template/show_list.component';
import { ShowListTypes } from '../../model/show_list_types';
import { SettlementLanternEvent } from '../../model/linking/settlement_lantern_event';
import { PrinciplesPageComponent } from '../principle/principles.component';
import { Subject } from 'rxjs/Subject';
import { KDMObserverService } from '../../service/kdm_observer.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

  population: Subject<number> = new Subject<number>();
  deathcount: Subject<number> = new Subject<number>();

  @Input()
  settlement: Settlement;

  deathCountGroup: FormGroup;

  lostSettlementGroup: FormGroup;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public params: NavParams,
              public formBuilder: FormBuilder, private kdmObserver: KDMObserverService) {
    if (params.get('settlement')) {
      this.settlement = params.get('settlement');
      this.settlement.milestones.forEach(milestone => kdmObserver.registerObserverForMilestone(this, milestone));
    }
  }

  ngOnInit(): void {
    this.setupDeathcounts();
    this.setupLostSettlements();
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
      settlementTimeline: this.settlement.timeline,
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

  showPrinciples(): void {
    this.navCtrl.push(PrinciplesPageComponent, {
      settlement: this.settlement,
    }).then();
  }

  showSettlementLocations(): void {
    this.navCtrl.push(ShowListComponent, {
      objects: this.settlement.locations,
      type: ShowListTypes.Location,
    }).then();
  }

  showStorage(): void {
    this.navCtrl.push(StoragePageComponent, {
      settlement: this.settlement,
    }).then();
  }

  eventReached(event: Event, lanternEvent: SettlementLanternEvent): void {
    if (lanternEvent.reached) {
      let popover = this.modalCtrl.create(TimelineEventModalComponent, {
        lanternEvent: lanternEvent.lanternEvent,
      });
      popover.present({
        ev: event,
      });
    }
  }

  survivalLimitChange(event): void {
    if (typeof event === 'number') {
      this.settlement.survivalLimit = event;
    }
  }

  deathcountChange(event): void {
    if (typeof event === 'number') {
      this.deathcount.next(event);
      this.settlement.deathcount = event;
    }
  }

  populationChange(event): void {
    if (typeof event === 'number') {
      const settlement = this.settlement;
      this.population.next(event);
      this.settlement.population = event;
      if (settlement.survivors.length < this.settlement.population) {
        this.addSurvivor();
      }
      this.populationChecker();
    }
  }

  addSurvivor(): void {
    this.settlement.survivors.push(new Survivor('Survivor ' + Survivor.counter));
  }

  populationChecker(): void {
    const survivors = this.settlement.survivors.length;
    const population = this.settlement.population;
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
