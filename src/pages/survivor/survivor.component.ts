import { Component, OnInit } from '@angular/core';
import { Survivor } from '../../model/survivor';
import { NavParams, ModalController, NavController } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ShowListComponent } from '../template/show_list.component';
import { ShowListTypes } from '../../model/show_list_types';
import { Settlement } from '../../model/settlement';
import { KDMDBService } from '../../service/kdm_db.service';
import { KDMObserverService } from '../../service/kdm_observer.service';
import { Subject } from 'rxjs/Subject';
import { EquipmentGridPageComponent } from '../equipment/equipment_grid.component';

/**
 * Created by Daniel on 01.03.2017.
 */
@Component({
  selector: 'kdmf-page-survivor',
  templateUrl: 'survivor.component.html',
})
export class SurvivorPageComponent implements OnInit {

  private static MAX_XP: number = 16;
  courage: Subject<number> = new Subject<number>();
  understanding: Subject<number> = new Subject<number>();
  xp: Subject<number> = new Subject<number>();

  survivor: Survivor;
  settlement: Settlement;

  xpGroup: FormGroup;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public params: NavParams,
              public formBuilder: FormBuilder, private kdmdbService: KDMDBService,
              private kdmObserver: KDMObserverService) {
    this.survivor = params.get('survivor');
    this.settlement = params.get('settlement');
    this.kdmObserver.registerObserverForSurvivorHappenings(this);
  }

  ngOnInit(): void {
    this.setupXP();
  }

  ionViewDidLeave(): void {
    this.saveData();
  }

  survivalChange(event: number): void {
    if (typeof event === 'number') {
      this.survivor.survival = event;
      this.saveData();
    }
  }

  movementChange(event): void {
    if (typeof event === 'number') {
      this.survivor.movement = event;
      this.saveData();
    }
  }

  accuracyChange(event): void {
    if (typeof event === 'number') {
      this.survivor.accuracy = event;
      this.saveData();
    }
  }

  strengthChange(event): void {
    if (typeof event === 'number') {
      this.survivor.strength = event;
      this.saveData();
    }
  }

  evasionChange(event): void {
    if (typeof event === 'number') {
      this.survivor.evasion = event;
      this.saveData();
    }
  }

  luckChange(event): void {
    if (typeof event === 'number') {
      this.survivor.luck = event;
      this.saveData();
    }
  }

  speedChange(event): void {
    if (typeof event === 'number') {
      this.survivor.speed = event;
      this.saveData();
    }
  }

  insanityChange(event): void {
    if (typeof event === 'number') {
      this.survivor.insanity = event;
      this.saveData();
    }
  }

  headArmorChange(event): void {
    if (typeof event === 'number') {
      this.survivor.headArmor = event;
      this.saveData();
    }
  }

  armsArmorChange(event): void {
    if (typeof event === 'number') {
      this.survivor.armsArmor = event;
      this.saveData();
    }
  }

  bodyArmorChange(event): void {
    if (typeof event === 'number') {
      this.survivor.bodyArmor = event;
      this.saveData();
    }
  }

  waistArmorChange(event): void {
    if (typeof event === 'number') {
      this.survivor.waistArmor = event;
      this.saveData();
    }
  }

  legsArmorChange(event): void {
    if (typeof event === 'number') {
      this.survivor.legsArmor = event;
      this.saveData();
    }
  }

  understandingChange(event): void {
    if (typeof event === 'number') {
      this.survivor.understanding = event;
      this.understanding.next(event);
      this.saveData();
    }
  }

  courageChange(event): void {
    if (typeof event === 'number') {
      this.survivor.courage = event;
      this.courage.next(event);
      this.saveData();
    }
  }

  weaponProficiencyXPChange(event): void {
    if (typeof event === 'number') {
      this.survivor.weaponProficiencyXP = event;
      this.saveData();
    }
  }

  updateXP(event: Event, control: FormControl): void {
    if (control.value) {
      this.survivor.experience++;
    } else {
      this.survivor.experience--;
    }
    this.xp.next(this.survivor.experience);
    this.saveData();
  }

  showDisorders(): void {
    this.navCtrl.push(ShowListComponent, {
      objects: this.survivor.disorders,
      type: ShowListTypes.DISORDER,
      settlement: this.settlement,
    }).then();
  }

  showFightingArts(): void {
    this.navCtrl.push(ShowListComponent, {
      objects: this.survivor.fightingArts,
      type: ShowListTypes.FIGHTINGART,
      settlement: this.settlement,
    }).then();
  }

  showEquipmentGrid(): void {
    this.navCtrl.push(EquipmentGridPageComponent, {
      survivor: this.survivor,
      settlement: this.settlement,
    }).then();
  }

  private setupXP(): void {
    const checkboxArray = new FormArray([]);
    for (let i: number = 0; i < SurvivorPageComponent.MAX_XP; i++) {
      if (i < this.survivor.experience) {
        checkboxArray.push(new FormControl(true));
      } else {
        checkboxArray.push(new FormControl(false));
      }
    }
    this.xpGroup = this.formBuilder.group({xps: checkboxArray});
  }

  private saveData(): void {
    this.kdmdbService.saveSettlement(this.settlement);
  }

}
