import { AfterViewInit, Component } from '@angular/core';
import { Events, ModalController, NavParams } from '@ionic/angular';
import { Survivor } from '../../model/survivor';
import { Equipment } from '../../model/equipment';
import { KDMDataService } from '../../service/kdm-data.service';
import { Weapon } from '../../model/weapon';
import { Armor } from '../../model/armor';
import { Router } from '@angular/router';

/**
 * Created by Daniel on 18.06.2018.
 */
@Component({
  selector: 'kdmf-equipment-detail-page', templateUrl: 'equipment_detail.component.html',
})
export class EquipmentDetailPageComponent implements AfterViewInit {

  survivor: Survivor;
  position: number;
  equipment: Equipment;
  equipments: Equipment[] = [];
  allEquipments: Equipment[] = [];
  equipmentName: string;

  constructor(public router: Router, public params: NavParams, public modalCtrl: ModalController, private kdmData: KDMDataService, private events: Events) {
    this.equipment = params.get('equipment');
    if (params.get('equipments')) {
      params.get('equipments').forEach(eq => {
        this.equipments.push(Object.assign({}, eq));
      });
    }
    this.position = params.get('position');
    this.survivor = params.get('survivor');
    this.events.subscribe('reloadEquipmentDetailPage', () => {
      this.equipment = this.survivor.equipments.get(this.position);
    });
  }

  ngAfterViewInit(): void {
    this.kdmData.getAllExistingEquipmentItems().then((arrayOfArrays) => {
      arrayOfArrays.forEach(arrayOfItems => {
        this.allEquipments.push.apply(this.allEquipments, arrayOfItems);
      });
      this.allEquipments.sort(this.kdmData.sortByName);
    });
  }

  swapEquipment(): void {
    this.router.navigate(['/equipments', {
      equipments: this.equipments, survivor: this.survivor, position: this.position,
    }]);
  }

  isWeapon(): boolean {
    return (this.equipment as Weapon).speed !== undefined;
  }

  isArmor(): boolean {
    return (this.equipment as Armor).space !== undefined;
  }

  getTags(): string {
    return this.equipment.tags.join(', ');
  }

}
