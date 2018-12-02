import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SurvivorsPageComponent } from './survivors.component';
import { SurvivorPageComponent } from '../survivor/survivor.component';
import { InputNumberComponent } from '../template/input-number.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: SurvivorsPageComponent, outlet: 'survivors'}]),
  ],
  declarations: [SurvivorsPageComponent, SurvivorPageComponent, InputNumberComponent],
})
export class SurvivorsPageModule {
}
