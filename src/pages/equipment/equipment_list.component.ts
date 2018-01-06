import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Equipment } from '../../model/equipment';
import { ShowListAddModalComponent } from '../template/show_list_add_modal.component';
import { ShowListTypes } from '../../model/show_list_types';
import { Survivor } from '../../model/survivor';

/**
 * Created by Daniel on 06.01.2018.
 */
@Component({
  selector: 'kdmf-page-equipment-list',
  templateUrl: 'equipment_list.component.html',
})
export class EquipmentListPageComponent {

  survivor: Survivor;
  position: number;
  equipments: Equipment[] = [];

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    if (params.get('equipments')) {
      params.get('equipments').forEach(eq => {
        this.equipments.push(Object.assign({}, eq));
      });
    }
    this.position = params.get('position');
    this.survivor = params.get('survivor');
  }

  addObject(): void {
    let modal = this.modalCtrl.create(ShowListAddModalComponent, {
      objects: this.equipments,
      type: ShowListTypes.EQUIPMENT,
    });
    modal.present();
  }

  setEquipment(eq: Equipment): void {
    console.log('set equipment: ${eq}');
    this.survivor.equipments.set(this.position, eq);
    console.log(this.survivor.equipments.get(this.position));
    this.navCtrl.pop();
  }

}
