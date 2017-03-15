import { Component } from '@angular/core';
import { Disorder } from '../../model/disorder';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FightingArt } from '../../model/fighting_art';
import { FightingArtModalComponent } from './fighting_art_modal.component';
/**
 * Created by Daniel on 12.03.2017.
 */
@Component({
  selector: 'kdmf-page-fighting-art',
  templateUrl: 'fighting_art.component.html',
})
export class FightingArtPageComponent {
  fightingArts: FightingArt[];

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.fightingArts = params.get('fightingArts');
  }

  addFightingArt(): void {
    let modal = this.modalCtrl.create(FightingArtModalComponent, {
      fightingArts: this.fightingArts,
    });
    modal.present();
  }

  removeFightingArt(disorder: Disorder): void {
    const index = this.fightingArts.findIndex(x => x === disorder);
    this.fightingArts.splice(index, 1);
  }
}
