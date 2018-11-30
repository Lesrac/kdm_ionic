import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { BaseModel } from '../../model/base-model';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-list-detail', templateUrl: 'show-list-detail.component.html',
})
export class ShowListDetailComponent {

  object: BaseModel;

  constructor(private params: NavParams) {
    this.object = this.params.get('object');
  }

}
