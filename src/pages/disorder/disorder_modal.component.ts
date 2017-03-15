import { Component, OnInit } from '@angular/core';
import { Disorder } from '../../model/disorder';
import { ViewController, NavParams } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm_data.service';
/**
 * Created by Daniel on 12.03.2017.
 */
@Component({
  selector: 'kdmf-disorder-modal',
  templateUrl: 'disorder_modal.component.html',
})
export class DisorderModalComponent implements OnInit {

  disorders: Disorder[];
  existingDisorders: Disorder[];
  disorderName: string;

  constructor(public viewCtrl: ViewController, private params: NavParams, private kdmData: KDMDataService) {
    this.disorders = this.params.get('disorders');
  }

  ngOnInit(): void {
    this.setupExistingDisorders();
  }

  addClose(): void {
    const disorder: Disorder = this.existingDisorders.find(item => item.name === this.disorderName);
    if (disorder) {
      this.disorders.push(disorder);
    }
    this.close();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  private setupExistingDisorders(): void {
    this.kdmData.getDisorders().then(disorders =>
      this.existingDisorders = disorders.sort(this.kdmData.sortByName));
  }
}
