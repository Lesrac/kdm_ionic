import { Component } from '@angular/core';
import { NavParams, NavController, ModalController } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { Storage } from '../../model/storage';
import { StorageModalComponent } from './storage_modal.component';
import { BaseModel } from '../../model/base_model';
import { ShowListDetailComponent } from '../template/show_list_detail.component';
/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-storage',
  templateUrl: 'storage.component.html',
})
export class StoragePageComponent {

  settlement: Settlement;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
    this.settlement = params.get('settlement');
  }

  decreaseAmount(storage: Storage): void {
    storage.amount--;
    if (storage.amount === 0) {
      this.removeStorage(storage);
    }
  }

  increaseAmount(storage: Storage): void {
    storage.amount++;
  }

  changedAmount(storage: Storage): void {
    if (storage.amount === 0) {
      this.removeStorage(storage);
    }
  }

  removeStorage(storage: Storage): void {
    const index = this.settlement.storages.findIndex(str => str === storage);
    this.settlement.storages.splice(index, 1);
  }

  addStorageItem(): void {
    let modal = this.modalCtrl.create(StorageModalComponent, {
      settlement: this.settlement,
    });
    modal.present();
  }

  showDetail(storageItem: Storage): void {
    this.navCtrl.push(ShowListDetailComponent, {
      object: storageItem,
    }).then();
  }

}
