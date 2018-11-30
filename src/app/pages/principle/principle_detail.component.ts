import { Component } from '@angular/core';
import { ViewController, NavParams } from '@ionic/angular';
import { Principle } from '../../model/principle';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-principle-detail',
  templateUrl: 'principle-detail.component.html',
})
export class PrincipleDetailComponent {

  principle: Principle;

  constructor(public viewCtrl: ViewController, private params: NavParams) {
    this.principle = this.params.get('principle');
  }

}
