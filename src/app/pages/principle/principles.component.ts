import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Settlement } from '../../model/settlement';
import { Principle, PrincipleType } from '../../model/principle';
import { KDMDataService } from '../../service/kdm-data.service';
import { Router } from '@angular/router';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-principles', templateUrl: 'principles.component.html',
})
export class PrinciplesPageComponent implements OnInit {

  settlement: Settlement;
  allPrincipleTypes: PrincipleType[];

  constructor(public router: Router, public params: NavParams, private kdmData: KDMDataService) {
    this.settlement = params.get('settlement');
    console.log(this.settlement);
  }

  ngOnInit(): void {
    this.kdmData.getPrincipleTypes().then(principleTypes => this.allPrincipleTypes = principleTypes);
  }

  principleIsChosen(type: PrincipleType): boolean {
    return this.settlement.principles.find((principle: Principle) => principle.type.name == type.name) != null;
  }

  selectPrinciple(type: PrincipleType): void {
    this.router.navigate(['/principleChooser', {
      principleType: type, settlement: this.settlement,
    }]).then();
  }

  removePrinciple(type: PrincipleType): void {
    const indexOfItemToRemove: number = this.settlement.principles.findIndex(principle => principle.type === type);
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
    }
    this.router.navigate(['/principleDetail', {
      principle: principle,
    }]).then();
  }
}
