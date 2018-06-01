import { Component } from '@angular/core';
import { NavParams, NavController, ModalController } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { Storage } from '../../model/storage';
import { StorageModalComponent } from './storage-modal.component';
import { ShowListDetailComponent } from '../template/show-list-detail.component';
import { KDMDBService } from '../../service/kdm-db.service';
import { KDMDataService } from '../../service/kdm-data.service';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-storage',
  templateUrl: 'storage.component.html',
})
export class StoragePageComponent {

  settlement: Settlement;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController,
              private kdmdbService: KDMDBService, private kdmService: KDMDataService) {
    this.settlement = params.get('settlement');
    this.settlement.storages.sort(kdmService.sortByName);
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
    storage.amountChanged.next(0);
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
