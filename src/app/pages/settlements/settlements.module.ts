import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettlementsPageComponent } from './settlements.component';
import { SettlementPageComponent } from '../settlement/settlement.component';
import { TimelinePageComponent } from '../timeline/timeline.component';
import { TimelineEventModalComponent } from '../timeline/timeline-event-modal.component';
import { AddTimelineEventModalComponent } from '../timeline/add-timeline-event-modal.component';
import { ParentModule } from '../../util/parent.module';
import { PrincipleDetailComponent } from '../principle/principle_detail.component';
import { PrinciplesPageComponent } from '../principle/principles.component';
import { PrincipleChooserPageComponent } from '../principle/principle-chooser.component';
import { EquipmentListPageComponent } from '../equipment/equipment-list.component';
import { StoragePageComponent } from '../storage/storage.component';
import { DefeatedMonsterPageComponent } from '../defeated_monster/defeated-monster.component';
import { EquipmentCardComponent } from '../equipment/equipment-card.component';
import { EquipmentGridPageComponent } from '../equipment/equipment-grid.component';
import { EquipmentDetailPageComponent } from '../equipment/equipment_detail.component';
import { ShowLocationDetailComponent } from '../location/show-location-detail.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ParentModule,
    RouterModule.forChild([
      {path: '', component: SettlementsPageComponent, pathMatch: 'full'},
      {path: ':id/timeline', component: TimelinePageComponent},
      {path: ':id', component: SettlementPageComponent},
    ]),
  ],
  declarations: [SettlementsPageComponent, SettlementPageComponent, TimelinePageComponent, TimelineEventModalComponent,
    AddTimelineEventModalComponent, PrinciplesPageComponent, PrincipleChooserPageComponent, PrincipleDetailComponent,
    DefeatedMonsterPageComponent, StoragePageComponent, EquipmentGridPageComponent, EquipmentCardComponent, EquipmentListPageComponent,
    EquipmentDetailPageComponent, ShowLocationDetailComponent],
})
export class SettlementsPageModule {
}
