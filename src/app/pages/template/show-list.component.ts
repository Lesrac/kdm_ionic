import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ShowListAddModalComponent } from './show-list-add-modal.component';
import { ShowListTypes } from '../../model/show-list-types';
import { BaseModel } from '../../model/base-model';
import { Settlement } from '../../model/settlement';
import { Router } from '@angular/router';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-list', templateUrl: 'show-list.component.html',
})
export class ShowListComponent implements OnInit {

  objects: BaseModel[];
  type: ShowListTypes;
  title: string;
  settlement: Settlement;

  constructor(public router: Router, public params: NavParams, public modalCtrl: ModalController) {
    this.objects = params.get('objects');
    this.type = params.get('type');
    this.settlement = params.get('settlement');
  }

  ngOnInit(): void {
    this.setup();
  }

  addObject(): void {
    this.modalCtrl.create({
      component: ShowListAddModalComponent, componentProps: {
        objects: this.objects, type: this.type,
      }
    }).then(modal => modal.present());
  }

  removeObject(object: BaseModel): void {
    const index = this.objects.findIndex(x => x === object);
    this.objects.splice(index, 1);
  }

  showDetail(object: BaseModel): void {
    if (this.type === ShowListTypes.LOCATION) {
      this.router.navigate(['/showLocationDetail', {
        object: object,
      }]).then();
    } else {
      this.router.navigate(['/showListDetail', {
        object: object,
      }]).then();
    }
  }

  private setup(): void {
    switch (this.type) {
      case ShowListTypes.FIGHTINGART:
        this.title = 'Fighting Arts';
        break;
      case ShowListTypes.DISORDER:
        this.title = 'Disorders';
        break;
      case ShowListTypes.INNOVATION:
        this.title = 'Innovations';
        break;
      case ShowListTypes.LOCATION:
        this.title = 'Locations';
        break;
      case ShowListTypes.EQUIPMENT:
        this.title = 'Equipments';
        break;
      default:
        console.error('Type doesn\'t exist in show list types: ' + this.type);
    }
  }

}
