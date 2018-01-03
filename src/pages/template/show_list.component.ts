import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ShowListAddModalComponent } from './show_list_add_modal.component';
import { ShowListTypes } from '../../model/show_list_types';
import { BaseModel } from '../../model/base_model';
import { ShowListDetailComponent } from './show_list_detail.component';
import { Settlement } from '../../model/settlement';
import { KDMDBService } from '../../service/kdm_db.service';
import { ShowLocationDetailComponent } from '../location/show_location_detail.component';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-list',
  templateUrl: 'show_list.component.html',
})
export class ShowListComponent implements OnInit {

  objects: BaseModel[];
  type: ShowListTypes;
  title: string;
  settlement: Settlement;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController,
              private kdmdbService: KDMDBService) {
    this.objects = params.get('objects');
    this.type = params.get('type');
    this.settlement = params.get('settlement');
  }

  ngOnInit(): void {
    this.setup();
  }

  ionViewDidLeave(): void {
    this.kdmdbService.saveSettlement(this.settlement);
  }

  addObject(): void {
    let modal = this.modalCtrl.create(ShowListAddModalComponent, {
      objects: this.objects,
      type: this.type,
    });
    modal.present();
  }

  removeObject(object: BaseModel): void {
    const index = this.objects.findIndex(x => x === object);
    this.objects.splice(index, 1);
  }

  showDetail(object: BaseModel): void {
    if (this.type === ShowListTypes.LOCATION) {
      this.navCtrl.push(ShowLocationDetailComponent, {
        object: object,
      }).then();
    } else {
      this.navCtrl.push(ShowListDetailComponent, {
        object: object,
      }).then();
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
      default:
        console.error('Type doesn\'t exist in show list types: ' + this.type);
    }
  }

}
