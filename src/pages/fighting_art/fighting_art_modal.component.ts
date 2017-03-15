import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm_data.service';
import { FightingArt } from '../../model/fighting_art';
/**
 * Created by Daniel on 12.03.2017.
 */
@Component({
  selector: 'kdmf-fighting-art-modal',
  templateUrl: 'fighting_art_modal.component.html',
})
export class FightingArtModalComponent implements OnInit {

  fightingArts: FightingArt[];
  existingFightingArts: FightingArt[];
  fightingArtName: string;

  constructor(public viewCtrl: ViewController, private params: NavParams, private kdmData: KDMDataService) {
    this.fightingArts = this.params.get('fightingArts');
  }

  ngOnInit(): void {
    this.setupExistingFightingArts();
  }

  addClose(): void {
    const fightingArt: FightingArt = this.existingFightingArts.find(item => item.name === this.fightingArtName);
    if (fightingArt) {
      this.fightingArts.push(fightingArt);
    }
    this.close();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  private setupExistingFightingArts(): void {
    this.kdmData.getFightingArts().then(fightingArt =>
      this.existingFightingArts = fightingArt.sort(this.kdmData.sortByName));
  }
}
