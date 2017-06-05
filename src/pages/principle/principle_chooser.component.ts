import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Principle } from '../../model/principle';
import { KDMDataService } from '../../service/kdm_data.service';
import { Settlement } from '../../model/settlement';
import { PrincipleType } from '../../model/principle_type';
/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-principle-chooser',
  templateUrl: 'principle_chooser.component.html',
})
export class PrincipleChooserPageComponent implements OnInit {

  settlement: Settlement;
  principleType: PrincipleType;
  allPrinciples: Principle[];
  principleOne: Principle = new Principle('Not loaded', 'Please return');
  principleTwo: Principle = new Principle('Not loaded', 'Please return');
  isLoading: boolean = true;

  constructor(public navCtrl: NavController, public params: NavParams, private kdmData: KDMDataService) {
    this.settlement = params.get('settlement');
    this.principleType = params.get('principleType');
  }

  ngOnInit(): void {
    this.kdmData.getPrinciplesWithType(this.principleType).then(principles => {
        this.allPrinciples = principles;
        if (principles.length > 1) {
          this.principleOne = principles[0];
          this.principleTwo = principles[1];
          this.isLoading = false;
        }
      },
    );
  }

  selectPrinciple(principle: Principle): void {
    console.log(principle);
    this.settlement.principles.push(principle);
    this.navCtrl.pop();
  }

}
