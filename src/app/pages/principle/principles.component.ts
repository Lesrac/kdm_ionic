import { Component, OnInit } from '@angular/core';
import { Settlement } from '../../model/settlement';
import { Principle, PrincipleType } from '../../model/principle';
import { KDMDataService } from '../../service/kdm-data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-principles', templateUrl: 'principles.component.html',
})
export class PrinciplesPageComponent implements OnInit {

  settlement: Settlement;
  settlement$: Observable<Settlement>;
  allPrincipleTypes: PrincipleType[];

  constructor(public router: Router, public route: ActivatedRoute, public kdmData: KDMDataService) {
  }

  ngOnInit(): void {
    this.settlement$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const obsSettlement = this.kdmData.getSettlement(+params.get('id'));
      obsSettlement.then(stlmnt => this.settlement = stlmnt);
      return obsSettlement;
    }));
    this.kdmData.getPrincipleTypes().then(principleTypes => this.allPrincipleTypes = principleTypes);
  }

  principleIsChosen(type: PrincipleType): boolean {
    return this.settlement.principles.find((principle: Principle) => principle.type.name == type.name) != null;
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
    this.router.navigate(['kdm', {outlets: {settlements: [this.settlement.id, 'principles', principle.name]}}]).then();
  }
}
