import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {TabsPage} from '../pages/tabs/tabs';
import {SettlementsPage} from "../pages/settlements/settlements";
import {SettlementPage} from "../pages/settlement/settlement";
import {KDMDataService} from "../service/kdm_data.service";
import {KDMCheckerService} from "../service/kdm_checker.service";
import {CreateSettlementPopover} from "../pages/popover/create_settlement_popover";
import {TimelineEventModal} from "../pages/timeline/timeline_event_modal";
import {DefeatedMonsterModal} from "../pages/defeated_monster/defeated_monster_modal";
import {AddLinebreakToPunctuationPipe} from "../pipe/add_linebreak_to_punctuation_pipe";
import {AutoresizeTextareaDirective} from "../directive/autoresize_textarea_directive";
import {TimelinePage} from "../pages/timeline/timeline";
import {DefeatedMonsterPage} from "../pages/defeated_monster/defeated_monster";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    SettlementsPage,
    SettlementPage,
    TimelinePage,
    DefeatedMonsterPage,
    TabsPage,
    CreateSettlementPopover,
    TimelineEventModal,
    DefeatedMonsterModal,
    AddLinebreakToPunctuationPipe,
    AutoresizeTextareaDirective
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
    TimelinePage,
    DefeatedMonsterPage,
    TabsPage,
    CreateSettlementPopover,
    TimelineEventModal,
    DefeatedMonsterModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, KDMDataService, KDMCheckerService]
})
export class AppModule {
}
