import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettlementsPageComponent } from './settlements.component';
import { SettlementPageComponent } from '../settlement/settlement.component';
import { TimelinePageComponent } from '../timeline/timeline.component';
import { TimelineEventModalComponent } from '../timeline/timeline-event-modal.component';
import { AddTimelineEventModalComponent } from '../timeline/add-timeline-event-modal.component';
import { ParentModule } from '../../util/parent.module';
import { PrincipleDetailComponent } from '../principle/principle_detail.component';
import { PrinciplesPageComponent } from '../principle/principles.component';
import { PrincipleChooserPageComponent } from '../principle/principle-chooser.component';
import { StoragePageComponent } from '../storage/storage.component';
import { DefeatedMonsterPageComponent } from '../defeated_monster/defeated-monster.component';
import { ShowLocationDetailComponent } from '../location/show-location-detail.component';
import { CreateSettlementModalComponent } from '../settlement/create-settlement-modal.component';
import { ShowListAddModalComponent } from '../template/show-list-add-modal.component';
import { DefeatedMonsterModalComponent } from '../defeated_monster/defeated-monster-modal.component';
import { FormattedTextModalComponent } from '../template/formatted-text-modal.component';
import { AddedResourcesModalComponent } from '../defeated_monster/added-resources-modal.component';
import { StorageModalComponent } from '../storage/storage-modal.component';
import { RouterModule, Routes } from '@angular/router';
import { ShowListComponent } from '../template/show-list.component';
import { ShowListTypes } from '../../model/show-list-types';
import { ShowListDetailComponent } from '../template/show-list-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SettlementsPageComponent,
  },
  {
    path: ':id',
    component: SettlementPageComponent,
  },
  {
    path: ':id/timeline',
    component: TimelinePageComponent,
  },
  {
    path: ':id/innovations',
    component: ShowListComponent,
    data: {type: ShowListTypes.INNOVATION},
  },
  {
    path: ':id/innovations/:name',
    component: ShowListDetailComponent,
    data: {type: ShowListTypes.INNOVATION},
  },
  {
    path: ':id/principles',
    component: PrinciplesPageComponent,
  },
  {
    path: ':id/principles/:type/chooser',
    component: PrincipleChooserPageComponent,
  },
  {
    path: ':id/principles/:name',
    component: PrincipleDetailComponent,
  },
  {
    path: ':id/locations',
    component: ShowListComponent,
    data: {type: ShowListTypes.LOCATION},
  },
  {
    path: ':id/locations/:name',
    component: ShowLocationDetailComponent,
  },
  {
    path: ':id/defeatedMonsters',
    component: DefeatedMonsterPageComponent,
  },
  {
    path: ':id/storage',
    component: StoragePageComponent,
  },
  {
    path: ':id/storage/:name',
    component: ShowListDetailComponent,
    data: {type: ShowListTypes.EQUIPMENT},
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ParentModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [DefeatedMonsterModalComponent, SettlementsPageComponent, SettlementPageComponent, TimelinePageComponent, AddTimelineEventModalComponent,
    PrincipleChooserPageComponent, PrincipleDetailComponent, DefeatedMonsterPageComponent, StoragePageComponent, ShowLocationDetailComponent, CreateSettlementModalComponent,
    PrinciplesPageComponent],
  entryComponents: [CreateSettlementModalComponent, TimelineEventModalComponent, ShowListAddModalComponent, DefeatedMonsterModalComponent,
    FormattedTextModalComponent, AddedResourcesModalComponent, StorageModalComponent],
})
export class SettlementsPageModule {
}
