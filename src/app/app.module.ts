import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { KDMCachingInterceptor } from './service/kdm-caching.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { KDMDataService } from './service/kdm-data.service';
import { KDMCalculationService } from './service/kdm-calculation.service';
import { KDMObserverService } from './service/kdm-observer.service';
import { KDMDBService } from './service/kdm-db.service';
import { BrainTraumaPageComponent } from './pages/others/brain_trauma/brain-trauma.component';
import { FilterElementsPipe } from './pipe/filter-elements.pipe';
import { MapValuesPipe } from './pipe/map-values.pipe';
import { CreateSettlementModalComponent } from './pages/settlement/create-settlement-modal.component';
import { ShowLocationDetailComponent } from './pages/location/show-location-detail.component';
import { StoragePageComponent } from './pages/storage/storage.component';
import { AddTimelineEventModalComponent } from './pages/timeline/add-timeline-event-modal.component';
import { TextFormattingPipe } from './pipe/text-formatting.pipe';
import { SevereInjuriesDetailPageComponent } from './pages/others/severe_injuries/severe-injuries-detail.component';
import { OthersPage } from './pages/others/others.component';
import { EquipmentDetailPageComponent } from './pages/equipment/equipment_detail.component';
import { EquipmentListPageComponent } from './pages/equipment/equipment-list.component';
import { DiceThrowComponent } from './pages/template/dice-throw.component';
import { DefeatedMonsterPageComponent } from './pages/defeated_monster/defeated-monster.component';
import { TimelineEventModalComponent } from './pages/timeline/timeline-event-modal.component';
import { RemoveWhitespacePipe } from './pipe/remove-whitespace.pipe';
import { ShowListDetailComponent } from './pages/template/show-list-detail.component';
import { ShowdownPageComponent } from './pages/others/showdown/showdown.component';
import { SevereInjuriesPageComponent } from './pages/others/severe_injuries/severe-injuries.component';
import { PrinciplesPageComponent } from './pages/principle/principles.component';
import { AddLinebreakToPunctuationPipe } from './pipe/add-linebreak-to-punctuation.pipe';
import { ShowListComponent } from './pages/template/show-list.component';
import { PrincipleDetailComponent } from './pages/principle/principle_detail.component';
import { DefeatedMonsterModalComponent } from './pages/defeated_monster/defeated-monster-modal.component';
import { AddedResourcesModalComponent } from './pages/defeated_monster/added-resources-modal.component';
import { ShowListAddModalComponent } from './pages/template/show-list-add-modal.component';
import { StorageModalComponent } from './pages/storage/storage-modal.component';
import { HuntEventTablePageComponent } from './pages/others/hunt_event_table/hunt-event-table.component';
import { EquipmentCardComponent } from './pages/equipment/equipment-card.component';
import { PrincipleChooserPageComponent } from './pages/principle/principle-chooser.component';
import { StoryEventsPageComponent } from './pages/others/story_events/story-events.component';
import { ShowdownsPageComponent } from './pages/others/showdown/showdowns.component';
import { GlossaryPageComponent } from './pages/others/glossary/glossary.component';
import { EquipmentGridPageComponent } from './pages/equipment/equipment-grid.component';
import { FormattedTextModalComponent } from './pages/template/formatted-text-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, DefeatedMonsterPageComponent, PrinciplesPageComponent, PrincipleChooserPageComponent, PrincipleDetailComponent,
    StoragePageComponent,
    EquipmentGridPageComponent, EquipmentCardComponent, EquipmentListPageComponent, EquipmentDetailPageComponent,
    DiceThrowComponent, ShowListComponent, ShowListDetailComponent, ShowListAddModalComponent, ShowLocationDetailComponent, ShowdownsPageComponent,
    ShowdownPageComponent, CreateSettlementModalComponent, AddedResourcesModalComponent, TimelineEventModalComponent,
    AddTimelineEventModalComponent, DefeatedMonsterModalComponent, StorageModalComponent, AddLinebreakToPunctuationPipe, TextFormattingPipe,
    MapValuesPipe, FilterElementsPipe, RemoveWhitespacePipe, BrainTraumaPageComponent, GlossaryPageComponent, HuntEventTablePageComponent,
    SevereInjuriesPageComponent, SevereInjuriesDetailPageComponent, StoryEventsPageComponent, FormattedTextModalComponent, OthersPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
  providers: [StatusBar, SplashScreen, {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, {
    provide: HTTP_INTERCEPTORS, useClass: KDMCachingInterceptor, multi: true,
  }, KDMDataService, KDMCalculationService, KDMObserverService, KDMDBService],
  bootstrap: [AppComponent],
})
export class AppModule {

  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }

}
