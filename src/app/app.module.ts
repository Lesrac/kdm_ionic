import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import {SettlementsPage} from "../pages/settlements/settlements";
import {SettlementPage} from "../pages/settlement/settlement";
import {KDMService} from "../services/kdm.service";
import {CreateSettlementPopover} from "../pages/popover/create_settlement_popover";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    SettlementsPage,
    SettlementPage,
    TabsPage,
    CreateSettlementPopover
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    SettlementsPage,
    SettlementPage,
    TabsPage,
    CreateSettlementPopover
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, KDMService]
})
export class AppModule {}
