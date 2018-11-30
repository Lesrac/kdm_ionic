import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
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

  constructor(private params: NavParams) {
    this.principle = this.params.get('principle');
  }

}
