import { Component, OnInit } from '@angular/core';
import { Monster } from '../../../model/monster';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { KDMDataService } from '../../../service/kdm-data.service';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Created by Daniel on 14.02.2017.
 */
@Component({
  selector: 'kdmf-page-showdown',
  templateUrl: 'showdown.component.html',
})
export class ShowdownPageComponent implements OnInit {

  monster$: Observable<Monster>;
  localMonster: Monster;

  constructor(public route: ActivatedRoute, public kdmData: KDMDataService) {
  }

  ngOnInit(): void {
    this.monster$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const observableMonster = this.kdmData.getMonster(+params.get('id'));
      observableMonster.then(monster => this.localMonster = monster);
      return observableMonster;
    }));
  }

}
