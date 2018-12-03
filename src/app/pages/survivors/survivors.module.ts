import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SurvivorsPageComponent } from './survivors.component';
import { SurvivorPageComponent } from '../survivor/survivor.component';
import { ParentModule } from '../../util/parent.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ParentModule,
    RouterModule.forChild([{path: '', component: SurvivorsPageComponent, pathMatch: 'full'}]),
  ],
  declarations: [SurvivorsPageComponent, SurvivorPageComponent],
})
export class SurvivorsPageModule {
}
