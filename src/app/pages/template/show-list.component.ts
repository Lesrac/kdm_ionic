import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShowListAddModalComponent } from './show-list-add-modal.component';
import { ShowListTypes } from '../../model/show-list-types';
import { BaseModel } from '../../model/base-model';
import { Settlement } from '../../model/settlement';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { KDMDataService } from '../../service/kdm-data.service';

/**
 * Created by Daniel on 16.03.2017.
 */
@Component({
  selector: 'kdmf-show-list', templateUrl: 'show-list.component.html',
})
export class ShowListComponent implements OnInit {

  objects: BaseModel[];
  type: ShowListTypes;
  title: string;
  settlement$: Observable<Settlement>;
  localSettlement: Settlement;

  constructor(public router: Router, public route: ActivatedRoute, public modalCtrl: ModalController, public kdmData: KDMDataService) {
  }

  ngOnInit(): void {
    this.setup();
  }

  addObject(): void {
    this.modalCtrl.create({
      component: ShowListAddModalComponent, componentProps: {
        objects: this.objects, type: this.type,
      },
    }).then(modal => modal.present());
  }

  removeObject(object: BaseModel): void {
    const index = this.objects.findIndex(x => x === object);
    this.objects.splice(index, 1);
  }

  showDetail(object: BaseModel): void {
    switch (this.type) {
      case ShowListTypes.FIGHTINGART:
        break;
      case ShowListTypes.DISORDER:
        break;
      case ShowListTypes.INNOVATION:
        this.router.navigate(['kdm', {outlets: {settlements: [this.localSettlement.id, 'innovations', object.name]}}]).then();
        break;
      case ShowListTypes.LOCATION:
        this.router.navigate(['kdm', {outlets: {settlements: [this.localSettlement.id, 'locations', object.name]}}]).then();
        break;
      case ShowListTypes.EQUIPMENT:
        break;
      default:
        console.error('nowhere to navigate with type: ' + this.type);
    }
  }

  private setup(): void {
    this.route.data.subscribe(data => this.type = data.type);
    switch (this.type) {
      case ShowListTypes.FIGHTINGART:
        this.title = 'Fighting Arts';
        break;
      case ShowListTypes.DISORDER:
        this.title = 'Disorders';
        break;
      case ShowListTypes.INNOVATION:
        this.title = 'Innovations';
        break;
      case ShowListTypes.LOCATION:
        this.title = 'Locations';
        break;
      case ShowListTypes.EQUIPMENT:
        this.title = 'Equipments';
        break;
      default:
        console.error('Type doesn\'t exist in show list types: ' + this.type);
    }
    this.settlement$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const stlmt = this.kdmData.getSettlement(+params.get('id'));
      stlmt.then(settlement => {
        this.localSettlement = settlement;
        switch (this.type) {
          case ShowListTypes.FIGHTINGART:
            //          t = localSettlement.fightingArts;
            break;
          case ShowListTypes.DISORDER:
            //      t = localSettlement.disorders;
            break;
          case ShowListTypes.INNOVATION:
            this.objects = settlement.innovations;
            break;
          case ShowListTypes.LOCATION:
            this.objects = settlement.locations;
            break;
          case ShowListTypes.EQUIPMENT:
            this.objects = settlement.storages;
            break;
          default:
            console.error('Type doesn\'t exist in show list types: ' + this.type);
        }
      });
      return stlmt;
    }));
  }

}
