import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { PrincipleType } from '../../model/principle';
import { KDMDataService } from '../../service/kdm_data.service';
import { PrincipleChooserPageComponent } from './principle_chooser.component';
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
    return this.settlement.principles.find(principle => {
          return principle.type === type;
        },
      ) != null;
  }

  selectPrinciple(type: PrincipleType): void {
    this.navCtrl.push(PrincipleChooserPageComponent, {
      principleType: type,
      settlement: this.settlement,
    }).then();
  }

  removePrinciple(type: PrincipleType): void {
    let itemToRemove: number = this.settlement.principles.findIndex(principle =>
      principle.type === type,
    );
    this.settlement.principles.splice(itemToRemove, 1);
  }

  getPrincipleName(type: PrincipleType): string {
    return this.settlement.principles.find(principle => principle.type === type).name;
  }
}