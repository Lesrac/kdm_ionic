"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var app_component_1 = require('./app.component');
var contact_1 = require('../pages/contact/contact');
var tabs_component_1 = require('../pages/tabs/tabs.component');
var settlements_component_1 = require('../pages/settlements/settlements.component');
var settlement_component_1 = require('../pages/settlement/settlement.component');
var kdm_data_service_1 = require('../service/kdm_data.service');
var kdm_checker_service_1 = require('../service/kdm_checker.service');
var create_settlement_popover_component_1 = require('../pages/popover/create_settlement_popover.component');
var timeline_event_modal_component_1 = require('../pages/timeline/timeline_event_modal.component');
var defeated_monster_modal_component_1 = require('../pages/defeated_monster/defeated_monster_modal.component');
var add_linebreak_to_punctuation_pipe_1 = require('../pipe/add_linebreak_to_punctuation_pipe');
var autoresize_textarea_directive_1 = require('../directive/autoresize_textarea_directive');
var timeline_component_1 = require('../pages/timeline/timeline.component');
var defeated_monster_component_1 = require('../pages/defeated_monster/defeated_monster.component');
var location_component_1 = require('../pages/location/location.component');
var storage_component_1 = require('../pages/storage/storage.component');
var kdm_calculation_service_1 = require('../service/kdm_calculation.service');
var storage_modal_component_1 = require('../pages/storage/storage_modal.component');
var innovation_component_1 = require('../pages/innovation/innovation.component');
var innovation_modal_component_1 = require('../pages/innovation/innovation_modal.component');
var survivors_component_1 = require('../pages/survivors/survivors.component');
var survivor_component_1 = require('../pages/survivor/survivor.component');
var disorders_component_1 = require('../pages/disorder/disorders.component');
var disorder_modal_component_1 = require('../pages/disorder/disorder_modal.component');
var fighting_art_component_1 = require('../pages/fighting_art/fighting_art.component');
var fighting_art_modal_component_1 = require('../pages/fighting_art/fighting_art_modal.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.MyApp,
                contact_1.ContactPage,
                settlements_component_1.SettlementsPageComponent,
                settlement_component_1.SettlementPageComponent,
                timeline_component_1.TimelinePageComponent,
                defeated_monster_component_1.DefeatedMonsterPageComponent,
                location_component_1.LocationPageComponent,
                storage_component_1.StoragePageComponent,
                innovation_component_1.InnovationPageComponent,
                survivors_component_1.SurvivorsPageComponent,
                survivor_component_1.SurvivorPageComponent,
                disorders_component_1.DisordersPageComponent,
                fighting_art_component_1.FightingArtPageComponent,
                tabs_component_1.TabsPageComponent,
                create_settlement_popover_component_1.CreateSettlementPopoverComponent,
                timeline_event_modal_component_1.TimelineEventModalComponent,
                defeated_monster_modal_component_1.DefeatedMonsterModalComponent,
                storage_modal_component_1.StorageModalComponent,
                innovation_modal_component_1.InnovationModalComponent,
                disorder_modal_component_1.DisorderModalComponent,
                fighting_art_modal_component_1.FightingArtModalComponent,
                add_linebreak_to_punctuation_pipe_1.AddLinebreakToPunctuationPipe,
                autoresize_textarea_directive_1.AutoresizeTextareaDirective,
            ],
            imports: [
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp),
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.MyApp,
                contact_1.ContactPage,
                settlements_component_1.SettlementsPageComponent,
                settlement_component_1.SettlementPageComponent,
                timeline_component_1.TimelinePageComponent,
                defeated_monster_component_1.DefeatedMonsterPageComponent,
                location_component_1.LocationPageComponent,
                storage_component_1.StoragePageComponent,
                innovation_component_1.InnovationPageComponent,
                survivors_component_1.SurvivorsPageComponent,
                survivor_component_1.SurvivorPageComponent,
                disorders_component_1.DisordersPageComponent,
                fighting_art_component_1.FightingArtPageComponent,
                tabs_component_1.TabsPageComponent,
                create_settlement_popover_component_1.CreateSettlementPopoverComponent,
                timeline_event_modal_component_1.TimelineEventModalComponent,
                defeated_monster_modal_component_1.DefeatedMonsterModalComponent,
                storage_modal_component_1.StorageModalComponent,
                innovation_modal_component_1.InnovationModalComponent,
                disorder_modal_component_1.DisorderModalComponent,
                fighting_art_modal_component_1.FightingArtModalComponent,
            ],
            providers: [{
                    provide: core_1.ErrorHandler,
                    useClass: ionic_angular_1.IonicErrorHandler,
                },
                kdm_data_service_1.KDMDataService,
                kdm_checker_service_1.KDMCheckerService,
                kdm_calculation_service_1.KDMCalculationService,
            ],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
