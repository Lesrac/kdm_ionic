import {Component, OnInit} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {Settlement} from "../../model/settlement";
import {KDMDataService} from "../../service/kdm_data.service";
import {Storage} from "../../model/storage";
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

  constructor(public viewCtrl: ViewController, private params: NavParams, private kdmData: KDMDataService) {
    this.settlement = this.params.get('settlement');
  }

  ngOnInit(): void {
    this.kdmData.getResources().then(resources => this.storageItems = resources);
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
