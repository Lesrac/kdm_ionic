import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { SettlementsPageModule } from '../pages/settlements/settlements.module';
import { SurvivorsPageModule } from '../pages/survivors/survivors.module';
import { OthersPageModule } from '../pages/others/others.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    SettlementsPageModule,
    SurvivorsPageModule,
    OthersPageModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {
}
