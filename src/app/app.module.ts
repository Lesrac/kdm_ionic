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
import { KDMDataService } from '../service/kdm-data.service';
import { CreateSettlementPopoverComponent } from '../pages/popover/create-settlement-popover.component';
import { TimelineEventModalComponent } from '../pages/timeline/timeline-event-modal.component';
import { DefeatedMonsterModalComponent } from '../pages/defeated_monster/defeated-monster-modal.component';
import { AddLinebreakToPunctuationPipe } from '../pipe/add-linebreak-to-punctuation.pipe';
import { TimelinePageComponent } from '../pages/timeline/timeline.component';
import { DefeatedMonsterPageComponent } from '../pages/defeated_monster/defeated-monster.component';
import { StoragePageComponent } from '../pages/storage/storage.component';
import { KDMCalculationService } from '../service/kdm-calculation.service';
import { StorageModalComponent } from '../pages/storage/storage-modal.component';
import { SurvivorsPageComponent } from '../pages/survivors/survivors.component';
import { SurvivorPageComponent } from '../pages/survivor/survivor.component';
import { InputNumberComponent } from '../pages/template/input-number.component';
import { ShowListComponent } from '../pages/template/show-list.component';
import { ShowListAddModalComponent } from '../pages/template/show-list-add-modal.component';
import { ShowListDetailComponent } from '../pages/template/show-list-detail.component';
import { PrinciplesPageComponent } from '../pages/principle/principles.component';
import { PrincipleChooserPageComponent } from '../pages/principle/principle-chooser.component';
import { KDMObserverService } from '../service/kdm-observer.service';
import { KDMDBService } from '../service/kdm-db.service';
import { PrincipleDetailComponent } from '../pages/principle/principle_detail.component';
import { TextFormattingPipe } from '../pipe/text-formatting.pipe';
import { AddedResourcesModalComponent } from '../pages/defeated_monster/added-resources-modal.component';
import { AddTimelineEventModalComponent } from '../pages/timeline/add-timeline-event-modal.component';
import { BrainTraumaPageComponent } from '../pages/others/brain_trauma/brain-trauma.component';
import { GlossaryPageComponent } from '../pages/others/glossary/glossary.component';
import { HuntEventTablePageComponent } from '../pages/others/hunt_event_table/hunt-event-table.component';
import { SevereInjuriesPageComponent } from '../pages/others/severe_injuries/severe-injuries.component';
import { StoryEventsPageComponent } from '../pages/others/story_events/story-events.component';
import { SevereInjuriesDetailPageComponent } from '../pages/others/severe_injuries/severe-injuries-detail.component';
import { DiceThrowComponent } from '../pages/template/dice-throw.component';
import { FormattedTextModalComponent } from '../pages/template/formatted-text-modal.component';
import { ShowLocationDetailComponent } from '../pages/location/show-location-detail.component';
import { MapValuesPipe } from '../pipe/map-values.pipe';
import { FilterElementsPipe } from '../pipe/filter-elements.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { KDMCachingInterceptor } from '../service/kdm-caching.interceptor';
import { EquipmentGridPageComponent } from '../pages/equipment/equipment-grid.component';
import { EquipmentCardComponent } from '../pages/equipment/equipment-card.component';
import { EquipmentListPageComponent } from '../pages/equipment/equipment-list.component';
import { CreateSettlementModalComponent } from '../pages/settlement/create-settlement-modal.component';
import { ShowdownPageComponent } from '../pages/others/showdown/showdown.component';
import { ShowdownsPageComponent } from '../pages/others/showdown/showdowns.component';
import { RemoveWhitespacePipe } from '../pipe/remove-whitespace.pipe';

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
    EquipmentGridPageComponent,
    EquipmentCardComponent,
    EquipmentListPageComponent,
    InputNumberComponent,
    DiceThrowComponent,
    ShowListComponent,
    ShowListDetailComponent,
    ShowListAddModalComponent,
    ShowLocationDetailComponent,
    ShowdownsPageComponent,
    ShowdownPageComponent,
    CreateSettlementModalComponent,
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
    RemoveWhitespacePipe,
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
    EquipmentGridPageComponent,
    EquipmentListPageComponent,
    ShowListComponent,
    ShowLocationDetailComponent,
    ShowListAddModalComponent,
    ShowdownsPageComponent,
    ShowdownPageComponent,
    CreateSettlementModalComponent,
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
