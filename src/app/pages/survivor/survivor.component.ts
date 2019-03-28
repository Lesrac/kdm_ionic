import { Component, OnInit } from '@angular/core';
import { Survivor } from '../../model/survivor';
import { ModalController } from '@ionic/angular';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ShowListTypes } from '../../model/show-list-types';
import { Settlement } from '../../model/settlement';
import { KDMDBService } from '../../service/kdm-db.service';
import { KDMObserverService } from '../../service/kdm-observer.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { KDMDataService } from '../../service/kdm-data.service';

/**
 * Created by Daniel on 01.03.2017.
 */
@Component({
  selector: 'kdmf-page-survivor', templateUrl: 'survivor.component.html',
})
export class SurvivorPageComponent implements OnInit {

  private static MAX_XP: number = 16;

  courage: Subject<number> = new Subject<number>();
  understanding: Subject<number> = new Subject<number>();
  xp: Subject<number> = new Subject<number>();
  survivorLocal: Survivor;

  settlement: Settlement;
  survivor$: Observable<Survivor>;
  xpGroup: FormGroup;

  constructor(public router: Router, public route: ActivatedRoute, public modalCtrl: ModalController, public formBuilder: FormBuilder,
              private kdmdbService: KDMDBService, private kdmObserver: KDMObserverService, public kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.survivor$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
        const stlmnt = this.kdmService.getSettlement(+params.get('id'));
        stlmnt.then(settlement => {
          this.settlement = settlement;
        });
        const srv = this.kdmService.getSurvivor(+params.get('id'), +params.get('survivorId'));
        srv.then(survivor => {
          this.survivorLocal = survivor;
          this.setupXP();
          this.kdmObserver.registerObserverForSurvivorHappenings(this);
        });
        return srv;
      },
    ));
  }

  survivalChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.survival = event;
    }
  }

  movementChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.movement = event;
    }
  }

  accuracyChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.accuracy = event;
    }
  }

  strengthChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.strength = event;
    }
  }

  evasionChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.evasion = event;
    }
  }

  luckChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.luck = event;
    }
  }

  speedChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.speed = event;
    }
  }

  insanityChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.insanity = event;
    }
  }

  headArmorChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.headArmor = event;
    }
  }

  armsArmorChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.armsArmor = event;
    }
  }

  bodyArmorChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.bodyArmor = event;
    }
  }

  waistArmorChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.waistArmor = event;
    }
  }

  legsArmorChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.legsArmor = event;
    }
  }

  understandingChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.understanding = event;
      this.understanding.next(event);
    }
  }

  courageChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.courage = event;
      this.courage.next(event);
    }
  }

  bleedingTokensChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.bleedingTokens = event;
    }
  }

  weaponProficiencyXPChange(event): void {
    if (typeof event === 'number') {
      this.survivorLocal.weaponProficiencyXP = event;
    }
  }

  updateXP(event: Event, control: FormControl): void {
    if (control.value) {
      this.survivorLocal.experience++;
    } else {
      this.survivorLocal.experience--;
    }
    this.xp.next(this.survivorLocal.experience);
  }

  showDisorders(): void {
    this.router.navigate(['/showList', {
      objects: this.survivorLocal.disorders, type: ShowListTypes.DISORDER, settlement: this.settlement,
    }]).then();
  }

  showFightingArts(): void {
    this.router.navigate(['/showList', {
      objects: this.survivorLocal.fightingArts, type: ShowListTypes.FIGHTINGART, settlement: this.settlement,
    }]).then();
  }

  showEquipmentGrid(): void {
    this.router.navigate(['/equipmentGrid', {
      survivor: this.survivorLocal, settlement: this.settlement,
    }]).then();
  }

  private setupXP(): void {
    const checkboxArray = new FormArray([]);
    for (let i: number = 0; i < SurvivorPageComponent.MAX_XP; i++) {
      if (i < this.survivorLocal.experience) {
        checkboxArray.push(new FormControl(true));
      } else {
        checkboxArray.push(new FormControl(false));
      }
    }
    this.xpGroup = this.formBuilder.group({xps: checkboxArray});
  }

}
