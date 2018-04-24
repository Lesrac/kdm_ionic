import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { KDMDataService } from '../../service/kdm-data.service';
import { Storage } from '../../model/storage';
import { Observable, Subject } from 'rxjs';

/**
 * Created by Daniel on 19.02.2017.
 */
@Component({
  selector: 'kdmf-storage-modal',
  templateUrl: 'storage-modal.component.html',
})
export class StorageModalComponent implements OnInit {

  settlement: Settlement;
  storageItems: Storage[] = [];
  storageItemName: string;
  searchName: string;
  foundStorageItems: Observable<Storage[]> = Observable.of<Storage[]>([]);
  private searchNames = new Subject<string>();

  constructor(public viewCtrl: ViewController, private params: NavParams, private kdmData: KDMDataService) {
    this.settlement = this.params.get('settlement');
  }

  ngOnInit(): void {
    this.getStorageItems();
    this.getSearchedStorageItems();
  }

  search(): void {
    this.searchNames.next(this.searchName);
  }

  selectItem(storage: Storage): void {
    this.storageItemName = storage.name;
  }

  add(): void {
    const storageItem: Storage = this.storageItems.find(item => item.name === this.storageItemName);
    if (storageItem) {
      this.settlement.addStorageItem(storageItem);
      this.settlement.storages.sort(this.kdmData.sortByName);
    }
  }

  addAndClose(): void {
    this.add();
    this.close();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  private getStorageItems(): void {
    this.kdmData.getAllExistingStorageItems().then(resourceArrays => {
      const resources: Storage[] = [];
      resourceArrays.forEach(differentResourceTypesArray => {
        differentResourceTypesArray.forEach(element => resources.push(element));
      });
      this.storageItems = resources.sort(this.kdmData.sortByName);
    });
  }

  private getSearchedStorageItems(): void {
    this.foundStorageItems = this.searchNames
      .debounceTime(500)
      .switchMap(term => {
        return term
          ? this.searchStorageItems(this.searchName)
          : Observable.of<Storage[]>([]);
      })
      .catch(error => {
        // TODO error handling
        console.log(error);
        return Observable.of<Storage[]>([]);
      });
  }

  private searchStorageItems(name: string): Observable<Storage[]> {
    if (name == null || name.length < 1) {
      return Observable.of<Storage[]>([]);
    }
    const searchRgx: RegExp = new RegExp(name, 'gi');
    return Observable.of<Storage[]>(this.storageItems.filter(resource => {
      return resource.name.match(searchRgx);
    }));
  }

}
