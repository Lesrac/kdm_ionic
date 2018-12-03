import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SurvivorsPageComponent } from './survivors.component';
import { SurvivorPageComponent } from '../survivor/survivor.component';
import { ParentModule } from '../../util/parent.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ParentModule,
    RouterModule.forChild([{path: '', component: SurvivorsPageComponent, outlet: 'survivors'}]),
  ],
  declarations: [SurvivorsPageComponent, SurvivorPageComponent],
})
export class SurvivorsPageModule {
}
