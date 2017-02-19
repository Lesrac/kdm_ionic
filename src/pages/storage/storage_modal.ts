import {Component, OnInit} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {Settlement} from "../../model/settlement";
import {KDMDataService} from "../../service/kdm_data.service";
import {Storage} from "../../model/storage";
import {Observable, Subject} from "rxjs";
/**
 * Created by Daniel on 19.02.2017.
 */
@Component({
  selector: 'storage-modal',
  templateUrl: 'storage_modal.html'
})
export class StorageModal implements OnInit {

  settlement: Settlement;
  storageItems: Storage[];
  storageItemName: string;
  searchName: string;
  foundStorageItems: Observable<Storage[]>;
  private searchNames = new Subject<string>();

  constructor(public viewCtrl: ViewController, private params: NavParams, private kdmData: KDMDataService) {
    this.settlement = this.params.get('settlement');
  }

  ngOnInit(): void {
    this.getStorageItems();
    this.getSearchedStorageItems();
  }

  private getStorageItems(): void {
    this.kdmData.getResources().then(resources =>
      this.storageItems = resources.sort((l: Storage, r: Storage) => {
        if (l.name < r.name) {
          return -1;
        }
        if (l.name > r.name) {
          return 1;
        }
        return 0;
      })
    );
  }

  private getSearchedStorageItems(): void {
    this.foundStorageItems = this.searchNames
      .debounceTime(500)
      .switchMap(term => {
        return term
          ? this.searchStorageItems(this.searchName)
          : Observable.of<Storage[]>([])
      })
      .catch(error => {
        // TODO error handling
        console.log(error);
        return Observable.of<Storage[]>([]);
      })
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

  search(): void {
    this.searchNames.next(this.searchName);
  }

  selectItem(storage: Storage): void {
    this.storageItemName = storage.name;
  }

  addClose(): void {
    const storageItem = this.storageItems.find(item => item.name == this.storageItemName);
    if (storageItem) {
      this.settlement.addStorageItem(storageItem);
    }
    this.close();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

}
