import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SurvivorsPageComponent } from './survivors.component';
import { SurvivorPageComponent } from '../survivor/survivor.component';
import { ParentModule } from '../../util/parent.module';

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
  declarations: [SurvivorsPageComponent, SurvivorPageComponent],
})
export class SurvivorsPageModule {
}
