import { Component, DoCheck, Input, KeyValueDiffers } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { TimelineEventModalComponent } from '../timeline/timeline_event_modal.component';
import { TimelinePageComponent } from '../timeline/timeline.component';
import { DefeatedMonsterPageComponent } from '../defeated_monster/defeated_monster.component';
import { StoragePageComponent } from '../storage/storage.component';
import { InnovationPageComponent } from '../innovation/innovation.component';
import { ShowListComponent } from '../template/show_list.component';
import { ShowListTypes } from '../../model/show_list_types';
import { SettlementLanternEvent } from '../../model/linking/settlement_lantern_event';
import { PrinciplesPageComponent } from '../principle/principles.component';
import { Subject } from 'rxjs/Subject';
import { KDMObserverService } from '../../service/kdm_observer.service';
import { KDMDataService } from '../../service/kdm_data.service';
import { KDMDBService } from '../../service/kdm_db.service';

/**
 * Created by Daniel on 27.01.2017.
 */
@Component({
  selector: 'kdmf-page-settlement',
  templateUrl: 'settlement.component.html',
})
export class SettlementPageComponent implements DoCheck {

  population: Subject<number> = new Subject<number>();
  deathcount: Subject<number> = new Subject<number>();
  innovations: Subject<number> = new Subject<number>();
  differ;

  @Input()
  settlement: Settlement;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public params: NavParams,
              public differs: KeyValueDiffers, private kdmObserver: KDMObserverService,
              private kdmService: KDMDataService, private kdmDBService: KDMDBService) {
    if (params.get('settlement')) {
      this.settlement = params.get('settlement');
      this.differ = differs.find({}).create();
      this.settlement.milestones.forEach(milestone => kdmObserver.registerObserverForMilestone(this, milestone));
    }
  }

  ngDoCheck(): void {
    let changes = this.differ.diff(this.settlement.innovations);
    if (changes) {
      this.innovations.next(changes._records.size);
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
      type: ShowListTypes.INNOVATION,
      settlement: this.settlement,
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
      type: ShowListTypes.LOCATION,
      settlement: this.settlement,
    }).then();
  }

  showStorage(): void {
    this.navCtrl.push(StoragePageComponent, {
      settlement: this.settlement,
    }).then();
  }

  eventReached(event: Event, settlementLanternEvent: SettlementLanternEvent): void {
    if (settlementLanternEvent.reached) {
      let popover = this.modalCtrl.create(TimelineEventModalComponent, {
        lanternEvent: settlementLanternEvent.lanternEvent,
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

  settlementLostChange(event): void {
    if (typeof event === 'number') {
      this.settlement.settlementLost = event;
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
    this.kdmService.createAndAddSurvivor(this.settlement);
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

}
