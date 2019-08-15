import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SurvivorsPageComponent } from './survivors.component';
import { SurvivorPageComponent } from '../survivor/survivor.component';
import { ParentModule } from '../../util/parent.module';
import { ShowListComponent } from '../template/show-list.component';
import { ShowListTypes } from '../../model/show-list-types';
import { EquipmentGridPageComponent } from '../equipment/equipment-grid.component';
import { EquipmentListPageComponent } from '../equipment/equipment-list.component';
import { EquipmentCardComponent } from '../equipment/equipment-card.component';
import { EquipmentDetailPageComponent } from '../equipment/equipment_detail.component';
import { ShowListAddModalComponent } from '../template/show-list-add-modal.component';
import { ShowListDetailComponent } from '../template/show-list-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SurvivorsPageComponent,
    pathMatch: 'full',
  },
  {
    path: ':id/survivor/:survivorId',
    component: SurvivorPageComponent,
  },
  {
    path: ':id/survivor/:survivorId/disorders',
    component: ShowListComponent,
    data: {type: ShowListTypes.DISORDER},
  },
  {
    path: ':id/survivor/:survivorId/disorders/:name',
    component: ShowListDetailComponent,
    data: {type: ShowListTypes.DISORDER},
  },
  {
    path: ':id/survivor/:survivorId/fightingArts',
    component: ShowListComponent,
    data: {type: ShowListTypes.FIGHTINGART},
  },
  {
    path: ':id/survivor/:survivorId/fightingArts/:name',
    component: ShowListDetailComponent,
    data: {type: ShowListTypes.FIGHTINGART},
  },
  {
    path: ':id/survivor/:survivorId/equipment',
    component: EquipmentGridPageComponent,
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ParentModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SurvivorsPageComponent, SurvivorPageComponent, EquipmentGridPageComponent, EquipmentCardComponent, EquipmentListPageComponent, EquipmentDetailPageComponent],
  entryComponents: [ShowListAddModalComponent],
})
export class SurvivorsPageModule {
}
