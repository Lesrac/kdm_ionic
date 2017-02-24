import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { SettlementsPage } from '../settlements/settlements';
import { SurvivorsPage } from '../survivors/survivors';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SettlementsPage;
  tab2Root: any = SurvivorsPage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
