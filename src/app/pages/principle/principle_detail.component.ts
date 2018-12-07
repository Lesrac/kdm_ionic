import { Component, OnInit } from '@angular/core';
import { Principle } from '../../model/principle';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KDMDataService } from '../../service/kdm-data.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Settlement } from '../../model/settlement';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-principle-detail',
  templateUrl: 'principle-detail.component.html',
})
export class PrincipleDetailComponent implements OnInit {

  principle$: Observable<Principle>;
  settlement$: Observable<Settlement>;

  constructor(public route: ActivatedRoute, public kdmData: KDMDataService) {
  }

  ngOnInit(): void {
    this.principle$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.kdmData.getPrinciple(params.get('name'))));
    this.settlement$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.kdmData.getSettlement(+params.get('id'))));
  }

}
