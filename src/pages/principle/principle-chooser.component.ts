import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Principle, PrincipleType } from '../../model/principle';
import { KDMDataService } from '../../service/kdm-data.service';
import { Settlement } from '../../model/settlement';
import { KDMDBService } from '../../service/kdm-db.service';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-principle-chooser',
  templateUrl: 'principle-chooser.component.html',
})
export class PrincipleChooserPageComponent implements OnInit {

  settlement: Settlement;
  principleType: PrincipleType;
  allPrinciples: Principle[];
  principleOne: Principle = new Principle('Not loaded', 'Please return', new PrincipleType('Dummy Type'));
  principleTwo: Principle = new Principle('Not loaded', 'Please return', new PrincipleType('Dummy Type'));
  isLoading: boolean = true;

  constructor(public navCtrl: NavController, public params: NavParams, private kdmData: KDMDataService,
              private kdmdbService: KDMDBService) {
    this.settlement = params.get('settlement');
    this.principleType = params.get('principleType');
  }

  ngOnInit(): void {
    this.kdmData.getPrinciplesWithType(this.principleType).then(principles => {
        this.allPrinciples = principles;
        if (principles.length > 1) {
          this.principleOne = principles[0];
          this.principleTwo = principles[1];
        }
        this.isLoading = false;
      },
    );
  }

  selectPrinciple(principle: Principle): void {
    this.settlement.addPrinciple(principle);
    this.kdmdbService.saveSettlement(this.settlement);
    this.navCtrl.pop();
  }

}
