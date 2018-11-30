import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SurvivorsPageComponent } from './survivors.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: SurvivorsPageComponent}]),
    ],
    declarations: [SurvivorsPageComponent],
})
export class SurvivorsPageModule {
}
