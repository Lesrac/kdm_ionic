import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { HuntedMonster } from '../../model/linking/hunted-monster';
import { Storage } from '../../model/storage';
import { Router } from '@angular/router';

/**
 * Created by Daniel on 09.10.2017.
 */
@Component({
  selector: 'kdmf-added-resources-modal', templateUrl: 'added-resources-modal.component.html',
})
export class AddedResourcesModalComponent {

  huntedMonster: HuntedMonster;

  constructor(public router: Router, public params: NavParams) {
    this.huntedMonster = this.params.get('huntedMonster');
  }

  close(): void {
  }

  showDetail(storageItem: Storage): void {
    this.router.navigate(['/showListDetail', {object: storageItem}]).then();
  }

}
