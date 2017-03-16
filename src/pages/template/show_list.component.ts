import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ShowListModalComponent } from './show_list_modal.component';
import { ShowListTypes } from '../../model/show_list_types';
/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-list',
  templateUrl: 'show_list.component.html',
})
export class ShowListComponent implements OnInit {

  objects: Object[];
  type: ShowListTypes;
  title: string;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.objects = params.get('objects');
    this.type = params.get('type');
  }

  ngOnInit(): void {
    this.setup();
  }

  addObject(): void {
    let modal = this.modalCtrl.create(ShowListModalComponent, {
      objects: this.objects,
      type: this.type,
    });
    modal.present();
  }

  removeObject(object: Object): void {
    const index = this.objects.findIndex(x => x === object);
    this.objects.splice(index, 1);
  }

  private setup(): void {
    switch (this.type) {
      case ShowListTypes.FightingArt:
        this.title = 'Fighting Arts';
        break;
      case ShowListTypes.Disorder:
        this.title = 'Disorders';
        break;
      case ShowListTypes.Innovation:
        this.title = 'Innovations';
        break;
    }
  }

}
