import { Component, OnInit } from '@angular/core';
import { Principle, PrincipleType } from '../../model/principle';
import { KDMDataService } from '../../service/kdm-data.service';
import { Settlement } from '../../model/settlement';
import { KDMDBService } from '../../service/kdm-db.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-principle-chooser', templateUrl: 'principle-chooser.component.html',
})
export class PrincipleChooserPageComponent implements OnInit {

  settlement: Settlement;
  settlement$2: Subscription;
  settlement$: Observable<Settlement>;
  principleType: PrincipleType;
  allPrinciples: Principle[];
  principleOne: Principle = new Principle('Not loaded', 'Please return', new PrincipleType('Dummy Type'));
  principleTwo: Principle = new Principle('Not loaded', 'Please return', new PrincipleType('Dummy Type'));
  isLoading: boolean = true;

  constructor(public router: Router, public route: ActivatedRoute, public kdmData: KDMDataService, public kdmdbService: KDMDBService) {
  }

  ngOnInit(): void {
    console.log('ngInit');
    // this.settlement$2 = this.route.paramMap.subscribe(params => {
    //   console.log(params);
    //   this.kdmData.getPrinciplesWithTypeName(params.get('type')).then(principles => {
    //     this.allPrinciples = principles;
    //     console.log(principles);
    //     if (principles.length > 1) {
    //       this.principleOne = principles[0];
    //       this.principleTwo = principles[1];
    //     }
    //     this.isLoading = false;
    //   });
    //
    //   this.kdmData.getPrincipleTypeByName(params.get('type')).then(type => this.principleType = type);
    //
    //   const obsSettlement = this.kdmData.getSettlement(+params.get('id'));
    //   obsSettlement.then(stlmnt => this.settlement = stlmnt);
    //   return obsSettlement;
    // });

    this.settlement$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      console.log(params);
      this.kdmData.getPrinciplesWithTypeName(params.get('type')).then(principles => {
        this.allPrinciples = principles;
        if (principles.length > 1) {
          this.principleOne = principles[0];
          this.principleTwo = principles[1];
        }
        this.isLoading = false;
      });

      this.kdmData.getPrincipleTypeByName(params.get('type')).then(type => this.principleType = type);

      const obsSettlement = this.kdmData.getSettlement(+params.get('id'));
      obsSettlement.then(stlmnt => this.settlement = stlmnt);
      return obsSettlement;
    }));

  }

  selectPrinciple(principle: Principle): void {
    this.settlement.addPrinciple(principle);
    this.kdmdbService.saveSettlement(this.settlement);
    this.router.navigate(['kdm', 'settlements', this.settlement.id, 'principles']).then();
  }

}
