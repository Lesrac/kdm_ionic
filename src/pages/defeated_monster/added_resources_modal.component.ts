import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { HuntedMonster } from '../../model/linking/hunted_monster';
import { Storage } from '../../model/storage';
import { ShowListDetailComponent } from '../template/show_list_detail.component';

/**
 * Created by Daniel on 09.10.2017.
 */
@Component({
  selector: 'kdmf-added-resources-modal',
  templateUrl: 'added_resources_modal.component.html',
})
export class AddedResourcesModalComponent {

  huntedMonster: HuntedMonster;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public params: NavParams) {
    this.huntedMonster = this.params.get('huntedMonster');
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  showDetail(storageItem: Storage): void {
    this.navCtrl.push(ShowListDetailComponent, {
      object: storageItem,
    }).then();
  }

}
