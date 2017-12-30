import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { OthersPage } from '../pages/others/others.component';
import { TabsPageComponent } from '../pages/tabs/tabs.component';
import { SettlementsPageComponent } from '../pages/settlements/settlements.component';
import { SettlementPageComponent } from '../pages/settlement/settlement.component';
import { KDMDataService } from '../service/kdm_data.service';
import { CreateSettlementPopoverComponent } from '../pages/popover/create_settlement_popover.component';
import { TimelineEventModalComponent } from '../pages/timeline/timeline_event_modal.component';
import { DefeatedMonsterModalComponent } from '../pages/defeated_monster/defeated_monster_modal.component';
import { AddLinebreakToPunctuationPipe } from '../pipe/add_linebreak_to_punctuation.pipe';
import { AutoresizeTextareaDirective } from '../directive/autoresize_textarea.directive';
import { TimelinePageComponent } from '../pages/timeline/timeline.component';
import { DefeatedMonsterPageComponent } from '../pages/defeated_monster/defeated_monster.component';
import { StoragePageComponent } from '../pages/storage/storage.component';
import { KDMCalculationService } from '../service/kdm_calculation.service';
import { StorageModalComponent } from '../pages/storage/storage_modal.component';
import { SurvivorsPageComponent } from '../pages/survivors/survivors.component';
import { SurvivorPageComponent } from '../pages/survivor/survivor.component';
import { InputNumberComponent } from '../pages/template/input_number.component';
import { ShowListComponent } from '../pages/template/show_list.component';
import { ShowListAddModalComponent } from '../pages/template/show_list_add_modal.component';
import { ShowListDetailComponent } from '../pages/template/show_list_detail.component';
import { PrinciplesPageComponent } from '../pages/principle/principles.component';
import { PrincipleChooserPageComponent } from '../pages/principle/principle_chooser.component';
import { KDMObserverService } from '../service/kdm_observer.service';
import { KDMDBService } from '../service/kdm_db.service';
import { PrincipleDetailComponent } from '../pages/principle/principle_detail.component';
import { TextFormattingPipe } from '../pipe/text_formatting.pipe';
import { AddedResourcesModalComponent } from '../pages/defeated_monster/added_resources_modal.component';
import { AddTimelineEventModalComponent } from '../pages/timeline/add_timeline_event_modal.component';
import { BrainTraumaPageComponent } from '../pages/others/brain_trauma/brain_trauma.component';
import { GlossaryPageComponent } from '../pages/others/glossary/glossary.component';
import { HuntEventTablePageComponent } from '../pages/others/hunt_event_table/hunt_event_table.component';
import { SevereInjuriesPageComponent } from '../pages/others/severe_injuries/severe_injuries.component';
import { StoryEventsPageComponent } from '../pages/others/story_events/story_events.component';
import { SevereInjuriesDetailPageComponent } from '../pages/others/severe_injuries/severe_injuries_detail.component';
import { DiceThrowComponent } from '../pages/template/dice_throw.component';
import { FormattedTextModalComponent } from '../pages/template/formatted_text_modal.component';
import { ShowLocationDetailComponent } from '../pages/location/show_location_detail.component';
import { MapValuesPipe } from '../pipe/map_values.pipe';
import { FilterElementsPipe } from '../pipe/filter_elements.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { KDMCachingInterceptor } from '../service/kdm_caching.interceptor';

@NgModule({
  declarations: [
    MyApp,
    OthersPage,
    SettlementsPageComponent,
    SettlementPageComponent,
    TimelinePageComponent,
    DefeatedMonsterPageComponent,
    PrinciplesPageComponent,
    PrincipleChooserPageComponent,
    PrincipleDetailComponent,
    StoragePageComponent,
    SurvivorsPageComponent,
    SurvivorPageComponent,
    InputNumberComponent,
    DiceThrowComponent,
    ShowListComponent,
    ShowListDetailComponent,
    ShowListAddModalComponent,
    ShowLocationDetailComponent,
    AddedResourcesModalComponent,
    TabsPageComponent,
    CreateSettlementPopoverComponent,
    TimelineEventModalComponent,
    AddTimelineEventModalComponent,
    DefeatedMonsterModalComponent,
    StorageModalComponent,
    AddLinebreakToPunctuationPipe,
    TextFormattingPipe,
    MapValuesPipe,
    FilterElementsPipe,
    AutoresizeTextareaDirective,
    BrainTraumaPageComponent,
    GlossaryPageComponent,
    HuntEventTablePageComponent,
    SevereInjuriesPageComponent,
    SevereInjuriesDetailPageComponent,
    StoryEventsPageComponent,
    FormattedTextModalComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OthersPage,
    SettlementsPageComponent,
    SettlementPageComponent,
    TimelinePageComponent,
    DefeatedMonsterPageComponent,
    PrinciplesPageComponent,
    PrincipleChooserPageComponent,
    PrincipleDetailComponent,
    StoragePageComponent,
    SurvivorsPageComponent,
    SurvivorPageComponent,
    ShowListComponent,
    ShowLocationDetailComponent,
    ShowListAddModalComponent,
    AddedResourcesModalComponent,
    ShowListDetailComponent,
    TabsPageComponent,
    CreateSettlementPopoverComponent,
    TimelineEventModalComponent,
    AddTimelineEventModalComponent,
    DefeatedMonsterModalComponent,
    StorageModalComponent,
    BrainTraumaPageComponent,
    GlossaryPageComponent,
    HuntEventTablePageComponent,
    SevereInjuriesPageComponent,
    SevereInjuriesDetailPageComponent,
    StoryEventsPageComponent,
    FormattedTextModalComponent,
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler,
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KDMCachingInterceptor,
      multi: true,
    },
    KDMDataService,
    KDMCalculationService,
    KDMObserverService,
    StatusBar,
    SplashScreen,
    KDMDBService,
  ],
})
export class AppModule {
}
