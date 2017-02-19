import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {Settlement} from "../../model/settlement";
import {Storage} from "../../model/storage";
/**
 * Created by Daniel on 14.02.2017.

 */
@Component({
  selector: 'page-storage',
  templateUrl: 'storage.html'
})
export class StoragePage {

  settlement: Settlement;

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.settlement = params.get('settlement');
  }

  decreaseAmount(storage: Storage) {
    storage.amount--;
    if (storage.amount === 0) {
      this.removeStorage(storage);
    }
  }

  increaseAmount(storage: Storage) {
    storage.amount++;
  }

  removeStorage(storage: Storage) {
    const index = this.settlement.storages.findIndex(str => str === storage);
    this.settlement.storages.splice(index, 1);
  }

}
