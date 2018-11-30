import { Component, DoCheck, Input, KeyValueDiffers } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Settlement } from '../../model/settlement';
import { TimelineEventModalComponent } from '../timeline/timeline-event-modal.component';
import { ShowListTypes } from '../../model/show-list-types';
import { SettlementLanternEvent } from '../../model/linking/settlement-lantern-event';
import { Subject } from 'rxjs';
import { KDMObserverService } from '../../service/kdm-observer.service';
import { KDMDataService } from '../../service/kdm-data.service';
import { Router } from '@angular/router';

/**
 * Created by Daniel on 27.01.2017.
 */
@Component({
  selector: 'kdmf-page-settlement', templateUrl: 'settlement.component.html',
})
export class SettlementPageComponent implements DoCheck {

  population: Subject<number> = new Subject<number>();
  deathcount: Subject<number> = new Subject<number>();
  innovations: Subject<number> = new Subject<number>();
  differ;

  @Input() settlement: Settlement;

  constructor(public router: Router, public modalCtrl: ModalController, public params: NavParams, public differs: KeyValueDiffers, private kdmObserver: KDMObserverService, private kdmService: KDMDataService) {
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
    this.router.navigate(['/timelinePage', {
      settlementTimeline: this.settlement.timeline,
    }]).then();
  }

  showDefeatedMonsters(): void {
    this.router.navigate(['/defeatedMonsters', {
      settlement: this.settlement,
    }]).then();
  }

  showInnovations(): void {
    this.router.navigate(['/showList', {
      objects: this.settlement.innovations, type: ShowListTypes.INNOVATION, settlement: this.settlement,
    }]).then();
  }

  showPrinciples(): void {
    this.router.navigate(['/principlesPage', {
      settlement: this.settlement,
    }]).then();
  }

  showSettlementLocations(): void {
    this.router.navigate(['/showList', {
      objects: this.settlement.locations, type: ShowListTypes.LOCATION, settlement: this.settlement,
    }]).then();
  }

  showStorage(): void {
    this.router.navigate(['/storage', {
      settlement: this.settlement,
    }]).then();
  }

  eventReached(event: Event, settlementLanternEvent: SettlementLanternEvent): void {
    if (settlementLanternEvent.reached) {
      this.modalCtrl.create({
        component: TimelineEventModalComponent, componentProps: {
          lanternEvent: settlementLanternEvent.lanternEvent,
        }
      }).then(modal => modal.present());
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
