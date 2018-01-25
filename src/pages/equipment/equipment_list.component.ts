import { AfterViewInit, Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Equipment } from '../../model/equipment';
import { Survivor } from '../../model/survivor';
import { KDMDataService } from '../../service/kdm_data.service';

/**
 * Created by Daniel on 06.01.2018.
 */
@Component({
  selector: 'kdmf-page-equipment-list',
  templateUrl: 'equipment_list.component.html',
})
export class EquipmentListPageComponent implements AfterViewInit {

  survivor: Survivor;
  position: number;
  equipments: Equipment[] = [];
  allEquipments: Equipment[] = [];
  equipmentName: string;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController,
              private kdmData: KDMDataService) {
    if (params.get('equipments')) {
      params.get('equipments').forEach(eq => {
        this.equipments.push(Object.assign({}, eq));
      });
    }
    this.position = params.get('position');
    this.survivor = params.get('survivor');
  }

  ngAfterViewInit(): void {
    this.kdmData.getAllExistingEquipmentItems().then((arrayOfArrays) => {
      arrayOfArrays.forEach(arrayOfItems => {
        this.allEquipments.push.apply(this.allEquipments, arrayOfItems);
      });
      this.allEquipments.sort(this.kdmData.sortByName);
    });
  }

  pushEquipment(): void {
    const eq = this.allEquipments.find(equipment => equipment.name === this.equipmentName);
    if (eq) {
      this.survivor.equipments.set(this.position, eq);
      this.navCtrl.pop();
    }
  }

  setEquipment(eq: Equipment): void {
    this.survivor.equipments.set(this.position, eq);
    this.navCtrl.pop();
  }

}
