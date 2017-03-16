import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm_data.service';
import { BaseModel } from '../../model/base_model';
import { ShowListTypes } from './show_list_types';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-list-modal',
  templateUrl: 'show_list_modal.component.html',
})
export class ShowListModalComponent implements OnInit {

  objects: Object[];
  existingObjects: Object[];
  typename: string = 'Hello';
  objectName: string;
  type: ShowListTypes;

  constructor(public viewCtrl: ViewController, private params: NavParams, private kdmData: KDMDataService) {
    this.objects = this.params.get('objects');
    this.type = this.params.get('type');
  }

  ngOnInit(): void {
    this.setup();
  }

  addClose(): void {
    const object = this.existingObjects.find((item: BaseModel) => item.name === this.objectName);
    if (object) {
      this.objects.push(object);
    }
    this.close();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  private setup(): void {
    switch (this.type) {
      case ShowListTypes.FightingArt:
        this.typename = 'Fighting Art';
        this.kdmData.getFightingArts().then(fightingArt =>
          this.existingObjects = fightingArt.sort(this.kdmData.sortByName));
        break;
      case ShowListTypes.Disorder:
        this.typename = 'Disorder';
        this.kdmData.getDisorders().then(disorders =>
          this.existingObjects = disorders.sort(this.kdmData.sortByName));
        break;
    }
  }
}
