import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { BaseModel } from '../../model/base_model';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-list-detail',
  templateUrl: 'show_list_detail.component.html',
})
export class ShowListDetailComponent {

  object: BaseModel;

  constructor(public viewCtrl: ViewController, private params: NavParams) {
    this.object = this.params.get('object');
  }

}
