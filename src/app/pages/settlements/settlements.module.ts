import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettlementsPageComponent } from './settlements.component';
import { SettlementPageComponent } from '../settlement/settlement.component';
import { InputNumberComponent } from '../template/input-number.component';
import { TimelinePageComponent } from '../timeline/timeline.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: SettlementsPageComponent, pathMatch: 'full'},
      {path: ':id/timeline', component: TimelinePageComponent},
      {path: ':id', component: SettlementPageComponent},
    ]),
  ],
  declarations: [SettlementsPageComponent, SettlementPageComponent, InputNumberComponent, TimelinePageComponent],
})
export class SettlementsPageModule {
}
