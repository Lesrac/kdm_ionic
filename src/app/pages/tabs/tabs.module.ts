import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPageComponent } from './tabs.component';
import { SettlementsPageComponent } from '../settlements/settlements.component';
import { OthersPage } from '../others/others.component';
import { SurvivorsPageComponent } from '../survivors/survivors.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule],
  declarations: [TabsPageComponent, SettlementsPageComponent, OthersPage, SurvivorsPageComponent],
})
export class TabsPageModule {
}
