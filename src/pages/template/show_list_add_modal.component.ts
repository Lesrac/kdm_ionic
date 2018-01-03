import { Component, AfterViewInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm_data.service';
import { BaseModel } from '../../model/base_model';
import { ShowListTypes } from '../../model/show_list_types';
import { Innovation } from '../../model/innovation';
import { FightingArt } from '../../model/fighting_art';
import { Disorder } from '../../model/disorder';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-list-add',
  templateUrl: 'show_list_add_modal.component.html',
})
export class ShowListAddModalComponent implements AfterViewInit {

  objects: Object[];
  existingObjects: Object[];
  typename: string = 'Non selected';
  objectName: string;
  type: ShowListTypes;

  constructor(public viewCtrl: ViewController, private params: NavParams, private kdmData: KDMDataService) {
    this.objects = this.params.get('objects');
    this.type = this.params.get('type');
  }

  ngAfterViewInit(): void {
    this.setup();
  }

  addClose(): void {
    const object = this.existingObjects.find((item: BaseModel) => item.name === this.objectName);
    if (object) {
      this.objects.push(object);
    }
    this.close();
  }

  getRandom(): void {
    switch (this.type) {
      case ShowListTypes.FIGHTINGART:
        this.kdmData.getFightingArts().then(fightingArts => {
          const start: number = Math.floor(Math.random() * fightingArts.length);
          const rand: FightingArt[] = fightingArts.slice(start, start + 1);
          this.objectName = rand[0].name;
        });
        break;
      case ShowListTypes.DISORDER:
        this.kdmData.getDisorders().then(disorders => {
          const start: number = Math.floor(Math.random() * disorders.length);
          const rand: Disorder[] = disorders.slice(start, start + 1);
          this.objectName = rand[0].name;
        });
        break;
      case ShowListTypes.INNOVATION:
        this.kdmData.getInnovationsThatAreNotAddedButAvailable(<Innovation[]>this.objects).then(innovations => {
          const start: number = Math.floor(Math.random() * innovations.length);
          const rand: Innovation[] = innovations.slice(start, start + 1);
          this.objectName = rand[0].name;
        });
        break;
      default:
        console.log('no random element for type: ' + this.type);
    }
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  private setup(): void {
    switch (this.type) {
      case ShowListTypes.FIGHTINGART:
        this.typename = 'Fighting Art';
        this.kdmData.getFightingArts().then(fightingArt =>
          this.existingObjects = fightingArt.filter(art =>
            this.objects.indexOf(art) === -1).sort(this.kdmData.sortByName));
        break;
      case ShowListTypes.DISORDER:
        this.typename = 'DISORDER';
        this.kdmData.getDisorders().then(disorders =>
          this.existingObjects = disorders.filter(disorder =>
            this.objects.indexOf(disorder) === -1).sort(this.kdmData.sortByName));
        break;
      case ShowListTypes.INNOVATION:
        this.typename = 'Innovation';
        this.kdmData.getInnovationsThatAreNotAddedButAvailable(<Innovation[]>this.objects).then(innovations => {
          this.existingObjects = innovations;
        });
        break;
      case ShowListTypes.LOCATION:
        this.typename = 'Location';
        this.kdmData.getSettlementLocations().then(locations =>
          this.existingObjects = locations.filter(location =>
            this.objects.indexOf(location) === -1).sort(this.kdmData.sortByName));
        break;
      default:
        console.error('unexpected type to setup add_modal: ' + this.type);
    }
  }
}
