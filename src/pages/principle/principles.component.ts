import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Settlement } from '../../model/settlement';
import { Principle, PrincipleType } from '../../model/principle';
import { KDMDataService } from '../../service/kdm_data.service';
import { PrincipleChooserPageComponent } from './principle_chooser.component';
import { PrincipleDetailComponent } from './principle_detail.component';
import { KDMDBService } from '../../service/kdm_db.service';

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

  constructor(public navCtrl: NavController, public params: NavParams, private kdmData: KDMDataService,
              private kdmdbService: KDMDBService) {
    this.settlement = params.get('settlement');
  }

  ngOnInit(): void {
    this.kdmData.getPrincipleTypes().then(principleTypes =>
      this.allPrincipleTypes = principleTypes,
    );
  }

  principleIsChosen(type: PrincipleType): boolean {
    return this.settlement.principles.find(principle => principle.type.name === type.name) != null;
  }

  selectPrinciple(type: PrincipleType): void {
    this.navCtrl.push(PrincipleChooserPageComponent, {
      principleType: type,
      settlement: this.settlement,
    }).then();
  }

  removePrinciple(type: PrincipleType): void {
    const indexOfItemToRemove: number = this.settlement.principles.findIndex(principle =>
      principle.type === type,
    );
    if (indexOfItemToRemove >= 0) {
      this.settlement.principles.splice(indexOfItemToRemove, 1);
    }
  }

  getPrincipleName(type: PrincipleType): string {
    const principle: Principle = this.settlement.principles.find(princ => princ.type.name === type.name);
    if (principle) {
      return principle.name;
    }
    return 'not chosen';
  }

  showDetail(principleType: PrincipleType): void {
    const principle: Principle = this.settlement.principles.find(princ => princ.type.name === principleType.name);
    if (principle) {
      this.navCtrl.push(PrincipleDetailComponent, {
        principle: principle,
      }).then();
    }
  }
}
