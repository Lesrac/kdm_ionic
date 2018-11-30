import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettlementsPageComponent } from './settlements.component';
import { SettlementPageComponent } from '../settlement/settlement.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: 'settlement/:id', component: SettlementPageComponent},
            {path: '', component: SettlementsPageComponent},
        ]),
    ],
    declarations: [SettlementsPageComponent],
})
export class SettlementsPageModule {
}
