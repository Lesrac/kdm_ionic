import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HuntEventTablePageComponent } from './pages/others/hunt_event_table/hunt-event-table.component';
import { StoryEventsPageComponent } from './pages/others/story_events/story-events.component';
import { FormattedTextModalComponent } from './pages/template/formatted-text-modal.component';
import { SevereInjuriesDetailPageComponent } from './pages/others/severe_injuries/severe-injuries-detail.component';
import { SevereInjuriesPageComponent } from './pages/others/severe_injuries/severe-injuries.component';
import { GlossaryPageComponent } from './pages/others/glossary/glossary.component';
import { BrainTraumaPageComponent } from './pages/others/brain_trauma/brain-trauma.component';
import { RemoveWhitespacePipe } from './pipe/remove-whitespace.pipe';
import { FilterElementsPipe } from './pipe/filter-elements.pipe';
import { MapValuesPipe } from './pipe/map-values.pipe';
import { DefeatedMonsterModalComponent } from './pages/defeated_monster/defeated-monster-modal.component';
import { TextFormattingPipe } from './pipe/text-formatting.pipe';
import { AddLinebreakToPunctuationPipe } from './pipe/add-linebreak-to-punctuation.pipe';
import { StorageModalComponent } from './pages/storage/storage-modal.component';
import { AddTimelineEventModalComponent } from './pages/timeline/add-timeline-event-modal.component';
import { TimelineEventModalComponent } from './pages/timeline/timeline-event-modal.component';
import { CreateSettlementPopoverComponent } from './pages/popover/create-settlement-popover.component';
import { AddedResourcesModalComponent } from './pages/defeated_monster/added-resources-modal.component';
import { CreateSettlementModalComponent } from './pages/settlement/create-settlement-modal.component';
import { ShowdownPageComponent } from './pages/others/showdown/showdown.component';
import { SettlementPageComponent } from './pages/settlement/settlement.component';
import { TimelinePageComponent } from './pages/timeline/timeline.component';
import { DefeatedMonsterPageComponent } from './pages/defeated_monster/defeated-monster.component';
import { PrinciplesPageComponent } from './pages/principle/principles.component';
import { PrincipleChooserPageComponent } from './pages/principle/principle-chooser.component';
import { PrincipleDetailComponent } from './pages/principle/principle_detail.component';
import { SurvivorPageComponent } from './pages/survivor/survivor.component';
import { StoragePageComponent } from './pages/storage/storage.component';
import { EquipmentGridPageComponent } from './pages/equipment/equipment-grid.component';
import { EquipmentCardComponent } from './pages/equipment/equipment-card.component';
import { EquipmentListPageComponent } from './pages/equipment/equipment-list.component';
import { EquipmentDetailPageComponent } from './pages/equipment/equipment_detail.component';
import { InputNumberComponent } from './pages/template/input-number.component';
import { DiceThrowComponent } from './pages/template/dice-throw.component';
import { ShowListComponent } from './pages/template/show-list.component';
import { ShowListDetailComponent } from './pages/template/show-list-detail.component';
import { ShowListAddModalComponent } from './pages/template/show-list-add-modal.component';
import { ShowLocationDetailComponent } from './pages/location/show-location-detail.component';
import { ShowdownsPageComponent } from './pages/others/showdown/showdowns.component';
import { KDMCachingInterceptor } from './service/kdm-caching.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { KDMDataService } from './service/kdm-data.service';
import { KDMCalculationService } from './service/kdm-calculation.service';
import { KDMObserverService } from './service/kdm-observer.service';
import { KDMDBService } from './service/kdm-db.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, SettlementPageComponent, TimelinePageComponent, DefeatedMonsterPageComponent, PrinciplesPageComponent,
    PrincipleChooserPageComponent, PrincipleDetailComponent, StoragePageComponent, SurvivorPageComponent, EquipmentGridPageComponent, EquipmentCardComponent,
    EquipmentListPageComponent, EquipmentDetailPageComponent, InputNumberComponent, DiceThrowComponent, ShowListComponent, ShowListDetailComponent,
    ShowListAddModalComponent, ShowLocationDetailComponent, ShowdownsPageComponent, ShowdownPageComponent, CreateSettlementModalComponent,
    AddedResourcesModalComponent, CreateSettlementPopoverComponent, TimelineEventModalComponent, AddTimelineEventModalComponent, DefeatedMonsterModalComponent,
    StorageModalComponent, AddLinebreakToPunctuationPipe, TextFormattingPipe, MapValuesPipe, FilterElementsPipe, RemoveWhitespacePipe, BrainTraumaPageComponent,
    GlossaryPageComponent, HuntEventTablePageComponent, SevereInjuriesPageComponent, SevereInjuriesDetailPageComponent, StoryEventsPageComponent,
    FormattedTextModalComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
  providers: [StatusBar, SplashScreen, {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, {
    provide: HTTP_INTERCEPTORS, useClass: KDMCachingInterceptor, multi: true,
  }, KDMDataService, KDMCalculationService, KDMObserverService, KDMDBService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
