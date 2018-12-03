import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OthersPageComponent } from './others.component';
import { RouterModule } from '@angular/router';
import { ParentModule } from '../../util/parent.module';
import { DefeatedMonsterModalComponent } from '../defeated_monster/defeated-monster-modal.component';
import { StorageModalComponent } from '../storage/storage-modal.component';
import { HuntEventTablePageComponent } from './hunt_event_table/hunt-event-table.component';
import { AddedResourcesModalComponent } from '../defeated_monster/added-resources-modal.component';
import { StoryEventsPageComponent } from './story_events/story-events.component';
import { GlossaryPageComponent } from './glossary/glossary.component';
import { ShowdownPageComponent } from './showdown/showdown.component';
import { FormattedTextModalComponent } from '../template/formatted-text-modal.component';
import { ShowdownsPageComponent } from './showdown/showdowns.component';
import { BrainTraumaPageComponent } from './brain_trauma/brain-trauma.component';
import { SevereInjuriesDetailPageComponent } from './severe_injuries/severe-injuries-detail.component';
import { SevereInjuriesPageComponent } from './severe_injuries/severe-injuries.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ParentModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: OthersPageComponent, pathMatch: 'full'},
      {path: 'huntEvents', component: HuntEventTablePageComponent},
      {path: 'glossary', component: GlossaryPageComponent},
      ]),
  ],
  declarations: [OthersPageComponent, ShowdownsPageComponent, ShowdownPageComponent, AddedResourcesModalComponent,
    DefeatedMonsterModalComponent, StorageModalComponent, BrainTraumaPageComponent, GlossaryPageComponent, HuntEventTablePageComponent,
    SevereInjuriesPageComponent, SevereInjuriesDetailPageComponent, StoryEventsPageComponent, FormattedTextModalComponent],
})
export class OthersPageModule {
}
