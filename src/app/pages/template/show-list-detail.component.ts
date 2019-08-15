import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../model/base-model';
import { ShowListTypes } from '../../model/show-list-types';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KDMDataService } from '../../service/kdm-data.service';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-list-detail', templateUrl: 'show-list-detail.component.html',
})
export class ShowListDetailComponent implements OnInit {

  object$: Observable<BaseModel>;
  localObject: BaseModel;
  type: string;

  constructor(public route: ActivatedRoute, public kdmData: KDMDataService) {
  }

  ngOnInit(): void {
    this.setup();
  }

  private setup(): void {
    this.route.data.subscribe(data => this.type = data.type);
    switch (this.type) {
      case ShowListTypes.FIGHTINGART:
        this.object$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
          const observableObject = this.kdmData.getFightingArt(params.get('name'));
          observableObject.then(baseModel => this.localObject = baseModel);
          return observableObject;
        }));
        break;
      case ShowListTypes.DISORDER:
        this.object$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
          const observableObject = this.kdmData.getDisorder(params.get('name'));
          observableObject.then(baseModel => this.localObject = baseModel);
          return observableObject;
        }));
        break;
      case ShowListTypes.INNOVATION:
        this.object$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
          const observableObject = this.kdmData.getInnovation(params.get('name'));
          observableObject.then(baseModel => this.localObject = baseModel);
          return observableObject;
        }));
        break;
      case ShowListTypes.EQUIPMENT:
        this.object$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
          const observableObject = this.kdmData.getEquipment(params.get('name'));
          observableObject.then(baseModel => this.localObject = baseModel);
          return observableObject;
        }));
        break;
      default:
        console.error('Type doesn\'t exist in show list detail: ' + this.type);
    }
  }

}
