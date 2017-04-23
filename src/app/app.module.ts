import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { TabsPageComponent } from '../pages/tabs/tabs.component';
import { SettlementsPageComponent } from '../pages/settlements/settlements.component';
import { SettlementPageComponent } from '../pages/settlement/settlement.component';
import { KDMDataService } from '../service/kdm_data.service';
import { KDMCheckerService } from '../service/kdm_checker.service';
import { CreateSettlementPopoverComponent } from '../pages/popover/create_settlement_popover.component';
import { TimelineEventModalComponent } from '../pages/timeline/timeline_event_modal.component';
import { DefeatedMonsterModalComponent } from '../pages/defeated_monster/defeated_monster_modal.component';
import { AddLinebreakToPunctuationPipe } from '../pipe/add_linebreak_to_punctuation.pipe';
import { AutoresizeTextareaDirective } from '../directive/autoresize_textarea.directive';
import { TimelinePageComponent } from '../pages/timeline/timeline.component';
import { DefeatedMonsterPageComponent } from '../pages/defeated_monster/defeated_monster.component';
import { LocationPageComponent } from '../pages/location/location.component';
import { StoragePageComponent } from '../pages/storage/storage.component';
import { KDMCalculationService } from '../service/kdm_calculation.service';
import { StorageModalComponent } from '../pages/storage/storage_modal.component';
import { SurvivorsPageComponent } from '../pages/survivors/survivors.component';
import { SurvivorPageComponent } from '../pages/survivor/survivor.component';
import { InputNumberComponent } from '../pages/template/input_number.component';
import { ShowListComponent } from '../pages/template/show_list.component';
import { ShowListAddModalComponent } from '../pages/template/show_list_add_modal.component';
import { ShowListDetailComponent } from '../pages/template/show_list_detail.component';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    SettlementsPageComponent,
    SettlementPageComponent,
    TimelinePageComponent,
    DefeatedMonsterPageComponent,
    LocationPageComponent,
    StoragePageComponent,
    SurvivorsPageComponent,
    SurvivorPageComponent,
    InputNumberComponent,
    ShowListComponent,
    ShowListDetailComponent,
    ShowListAddModalComponent,
    TabsPageComponent,
    CreateSettlementPopoverComponent,
    TimelineEventModalComponent,
    DefeatedMonsterModalComponent,
    StorageModalComponent,
    AddLinebreakToPunctuationPipe,
    AutoresizeTextareaDirective,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    SettlementsPageComponent,
    SettlementPageComponent,
    TimelinePageComponent,
    DefeatedMonsterPageComponent,
    LocationPageComponent,
    StoragePageComponent,
    SurvivorsPageComponent,
    SurvivorPageComponent,
    ShowListComponent,
    ShowListAddModalComponent,
    ShowListDetailComponent,
    TabsPageComponent,
    CreateSettlementPopoverComponent,
    TimelineEventModalComponent,
    DefeatedMonsterModalComponent,
    StorageModalComponent,
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler,
  },
    KDMDataService,
    KDMCheckerService,
    KDMCalculationService,
    StatusBar,
    SplashScreen,
  ],
})
export class AppModule {
}
