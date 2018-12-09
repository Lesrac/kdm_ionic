import { Component, DoCheck, KeyValueDiffers, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Settlement } from '../../model/settlement';
import { TimelineEventModalComponent } from '../timeline/timeline-event-modal.component';
import { SettlementLanternEvent } from '../../model/linking/settlement-lantern-event';
import { Subject } from 'rxjs';
import { KDMObserverService } from '../../service/kdm-observer.service';
import { KDMDataService } from '../../service/kdm-data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Created by Daniel on 27.01.2017.
 */
@Component({
  selector: 'kdmf-page-settlement', templateUrl: 'settlement.component.html',
})
export class SettlementPageComponent implements OnInit, DoCheck {

  population: Subject<number> = new Subject<number>();
  deathcount: Subject<number> = new Subject<number>();
  innovations: Subject<number> = new Subject<number>();
  differ;

  settlement$: Observable<Settlement>;
  settlementLocal: Settlement;

  constructor(public router: Router, public route: ActivatedRoute, public modalCtrl: ModalController,
              public differs: KeyValueDiffers, public kdmObserver: KDMObserverService, public kdmService: KDMDataService) {
    this.differ = differs.find({}).create();
  }

  ngOnInit(): void {
    this.settlement$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
        const stlmt = this.kdmService.getSettlement(+params.get('id'));
        stlmt.then(settlement => {
          this.settlementLocal = settlement;
          this.settlementLocal.milestones.forEach(milestone => this.kdmObserver.registerObserverForMilestone(this, milestone));
        });
        return stlmt;
      },
    ));
  }

  ngDoCheck(): void {
    if (this.settlementLocal) {
      let changes = this.differ.diff(this.settlementLocal.innovations);
      if (changes) {
        this.innovations.next(changes._records.size);
      }
    }
  }

  showDefeatedMonsters(): void {
    this.router.navigate(['/defeatedMonsters', {
      settlement: this.settlement$,
    }]).then();
  }

  eventReached(event: Event, settlementLanternEvent: SettlementLanternEvent): void {
    if (settlementLanternEvent.reached) {
      this.modalCtrl.create({
        component: TimelineEventModalComponent, componentProps: {
          lanternEvent: settlementLanternEvent.lanternEvent,
        },
      }).then(modal => modal.present());
    }
  }

  survivalLimitChange(event): void {
    if (typeof event === 'number') {
      this.settlementLocal.survivalLimit = event;
    }
  }

  settlementLostChange(event): void {
    if (typeof event === 'number') {
      this.settlementLocal.settlementLost = event;
    }
  }

  deathcountChange(event): void {
    if (typeof event === 'number') {
      this.deathcount.next(event);
      this.settlementLocal.deathcount = event;
    }
  }

  populationChange(event): void {
    if (typeof event === 'number') {
      const settlement = this.settlementLocal;
      this.population.next(event);
      this.settlementLocal.population = event;
      if (settlement.survivors.length < settlement.population) {
        this.addSurvivor();
      }
      this.populationChecker();
    }
  }

  addSurvivor(): void {
    this.kdmService.createAndAddSurvivor(this.settlementLocal);
  }

  populationChecker(): void {
    const survivors = this.settlementLocal.survivors.length;
    const population = this.settlementLocal.population;
    if (survivors <= population) {
      const difference = population - survivors;
      for (let i = 0; i < difference; i++) {
        this.addSurvivor();
      }
    }
  }

}
