import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { PrincipleType } from '../../model/principle';
import { KDMDataService } from '../../service/kdm_data.service';
/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-principles',
  templateUrl: 'principles.component.html',
})
export class PrinciplesPageComponent implements OnInit {

  settlement: Settlement;
  allPrincipleTypes: PrincipleType[];

  constructor(public navCtrl: NavController, public params: NavParams, private kdmData: KDMDataService) {
    this.settlement = params.get('settlement');
  }

  ngOnInit(): void {
    this.kdmData.getPrincipleTypes().then(principleTypes =>
      this.allPrincipleTypes = principleTypes,
    );
  }

  principleIsChosen(type: PrincipleType): boolean {
    return this.settlement.principles.find(principle =>
        principle.type === type,
      ) != null;
  }

  selectPrinciple(type: PrincipleType): void {

  }

  removePrinciple(type: PrincipleType): void {
    let itemToRemove: number = this.settlement.principles.findIndex(principle =>
      principle.type === type,
    );
    this.settlement.principles.splice(itemToRemove, 1);
  }
}
