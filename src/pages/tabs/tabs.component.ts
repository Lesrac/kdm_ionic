import { Component } from '@angular/core';

import { OthersPage } from '../others/others.component';
import { SettlementsPageComponent } from '../settlements/settlements.component';
import { SurvivorsPageComponent } from '../survivors/survivors.component';

@Component({
  templateUrl: 'tabs.component.html',
})
export class TabsPageComponent {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SettlementsPageComponent;
  tab2Root: any = SurvivorsPageComponent;
  tab3Root: any = OthersPage;

  constructor() {
  }
}
