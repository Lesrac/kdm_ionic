import { Component, AfterViewInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { KDMDataService } from '../../service/kdm_data.service';
import { BaseModel } from '../../model/base_model';
import { ShowListTypes } from '../../model/show_list_types';
import { Innovation } from '../../model/innovation';
import { isUndefined } from 'ionic-angular/util/util';

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

  close(): void {
    this.viewCtrl.dismiss();
  }

  private setup(): void {
    switch (this.type) {
      case ShowListTypes.FightingArt:
        this.typename = 'Fighting Art';
        this.kdmData.getFightingArts().then(fightingArt =>
          this.existingObjects = fightingArt.filter(art =>
            this.objects.indexOf(art) === -1).sort(this.kdmData.sortByName));
        break;
      case ShowListTypes.Disorder:
        this.typename = 'Disorder';
        this.kdmData.getDisorders().then(disorders =>
          this.existingObjects = disorders.filter(disorder =>
            this.objects.indexOf(disorder) === -1).sort(this.kdmData.sortByName));
        break;
      case ShowListTypes.Innovation:
        this.typename = 'Innovation';
        this.kdmData.getInnovations().then(innovations => {
          this.existingObjects = innovations.filter(innovation =>
            isUndefined(this.objects.find((innov: Innovation) => innov.name === innovation.name)) &&
            innovation.tags.some(tag =>
              this.objects.filter((innov: Innovation) =>
                innov.consequence === tag).length > 0)).sort(this.kdmData.sortByName);
          // when null/undefined get all Base Innovations and add them to the list
          if (this.existingObjects == null || (this.existingObjects.length === 0 && this.objects.length === 0)) {
            this.existingObjects = innovations.filter(innovation => innovation.isBase);
          }
        });
        break;
      case ShowListTypes.Location:
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
