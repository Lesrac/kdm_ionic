import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Settlement } from '../../model/settlement';
import { Storage } from '../../model/storage';
import { StorageModalComponent } from './storage-modal.component';
import { KDMDataService } from '../../service/kdm-data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-storage', templateUrl: 'storage.component.html',
})
export class StoragePageComponent implements OnInit {

  localSettlement: Settlement;
  settlement$: Observable<Settlement>;

  constructor(public router: Router, public route: ActivatedRoute, public modalCtrl: ModalController, public kdmService: KDMDataService) {
  }

  ngOnInit(): void {
    this.settlement$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const observableSettlement = this.kdmService.getSettlement(+params.get('id'));
      observableSettlement.then(settlement => {
        this.localSettlement = settlement;
        this.localSettlement.storages.sort(this.kdmService.sortByName);
      });
      return observableSettlement;
    }));
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
    const index = this.localSettlement.storages.findIndex(str => str === storage);
    this.localSettlement.storages.splice(index, 1);
    storage.amountChanged.next(0);
  }

  addStorageItem(): void {
    this.modalCtrl.create({
      component: StorageModalComponent, componentProps: {
        settlement: this.localSettlement,
      }
    }).then(modal => modal.present());
  }

  showDetail(storageItem: Storage): void {
    this.router.navigate(['/showListDetail', {
      object: storageItem,
    }]).then();
  }

}
