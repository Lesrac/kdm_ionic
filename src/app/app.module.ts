import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
import { InnovationPageComponent } from '../pages/innovation/innovation.component';
import { InnovationModalComponent } from '../pages/innovation/innovation_modal.component';
import { SurvivorsPageComponent } from '../pages/survivors/survivors.component';
import { SurvivorPageComponent } from '../pages/survivor/survivor.component';
import { DisordersPageComponent } from '../pages/disorder/disorders.component';
import { DisorderModalComponent } from '../pages/disorder/disorder_modal.component';
import { FightingArtPageComponent } from '../pages/fighting_art/fighting_art.component';
import { FightingArtModalComponent } from '../pages/fighting_art/fighting_art_modal.component';
import { InputNumberComponent } from '../pages/template/input_number.component';
import { ShowListComponent } from '../pages/template/show_list.component';
import { ShowListModalComponent } from '../pages/template/show_list_modal.component';

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
    InnovationPageComponent,
    SurvivorsPageComponent,
    SurvivorPageComponent,
    DisordersPageComponent,
    FightingArtPageComponent,
    InputNumberComponent,
    ShowListComponent,
    ShowListModalComponent,
    TabsPageComponent,
    CreateSettlementPopoverComponent,
    TimelineEventModalComponent,
    DefeatedMonsterModalComponent,
    StorageModalComponent,
    InnovationModalComponent,
    DisorderModalComponent,
    FightingArtModalComponent,
    AddLinebreakToPunctuationPipe,
    AutoresizeTextareaDirective,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
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
    InnovationPageComponent,
    SurvivorsPageComponent,
    SurvivorPageComponent,
    DisordersPageComponent,
    FightingArtPageComponent,
    ShowListComponent,
    ShowListModalComponent,
    TabsPageComponent,
    CreateSettlementPopoverComponent,
    TimelineEventModalComponent,
    DefeatedMonsterModalComponent,
    StorageModalComponent,
    InnovationModalComponent,
    DisorderModalComponent,
    FightingArtModalComponent,
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler,
  },
    KDMDataService,
    KDMCheckerService,
    KDMCalculationService,
  ],
})
export class AppModule {
}
