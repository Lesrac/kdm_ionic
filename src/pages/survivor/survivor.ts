import { Component, OnInit } from '@angular/core';
import { Survivor } from '../../model/survivor';
import { NavParams, ModalController, NavController } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
/**
 * Created by Daniel on 01.03.2017.
 */
@Component({
  selector: 'kdmf-page-survivor',
  templateUrl: 'survivor.html',
})
export class SurvivorPage implements OnInit {

  private static MAX_XP: number = 16;

  survivor: Survivor;

  xpGroup: FormGroup;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public params: NavParams,
              public formBuilder: FormBuilder) {
    this.survivor = params.get('survivor');
  }

  ngOnInit(): void {
    this.setupXP();
  }

  increaseSurvival(): void {
    this.survivor.survival++;
  }

  decreaseSurvival(): void {
    this.survivor.survival--;
  }

  increaseAccuracy(): void {
    this.survivor.accuracy++;
  }

  decreaseAccuracy(): void {
    this.survivor.accuracy--;
  }

  increaseStrength(): void {
    this.survivor.strength++;
  }

  decreaseStrength(): void {
    this.survivor.strength--;
  }

  increaseEvasion(): void {
    this.survivor.evasion++;
  }

  decreaseEvasion(): void {
    this.survivor.evasion--;
  }

  increaseLuck(): void {
    this.survivor.luck++;
  }

  decreaseLuck(): void {
    this.survivor.luck--;
  }

  increaseSpeed(): void {
    this.survivor.speed++;
  }

  decreaseSpeed(): void {
    this.survivor.speed--;
  }

  increaseInsanity(): void {
    this.survivor.insanity++;
  }

  decreaseInsanity(): void {
    this.survivor.insanity--;
  }

  updateXP(event: Event, control: FormControl): void {
    if (control.value) {
      this.survivor.experience++;
    } else {
      this.survivor.experience--;
    }
  }

  private setupXP(): void {
    const checkboxArray = new FormArray([]);
    for (let i: number = 0; i < SurvivorPage.MAX_XP; i++) {
      if (i < this.survivor.experience) {
        checkboxArray.push(new FormControl(true));
      } else {
        checkboxArray.push(new FormControl(false));
      }
    }
    this.xpGroup = this.formBuilder.group({xps: checkboxArray});
  }

}
