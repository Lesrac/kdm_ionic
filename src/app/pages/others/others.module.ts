import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OthersPageComponent } from './others.component';
import { ParentModule } from '../../util/parent.module';
import { HuntEventTablePageComponent } from './hunt_event_table/hunt-event-table.component';
import { StoryEventsPageComponent } from './story_events/story-events.component';
import { GlossaryPageComponent } from './glossary/glossary.component';
import { ShowdownPageComponent } from './showdown/showdown.component';
import { ShowdownsPageComponent } from './showdown/showdowns.component';
import { BrainTraumaPageComponent } from './brain_trauma/brain-trauma.component';
import { SevereInjuriesDetailPageComponent } from './severe_injuries/severe-injuries-detail.component';
import { SevereInjuriesPageComponent } from './severe_injuries/severe-injuries.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OthersPageComponent,
  },
  {
    path: 'huntEvents',
    component: HuntEventTablePageComponent,
  },
  {
    path: 'glossary',
    component: GlossaryPageComponent,
  },
  {
    path: 'brainTrauma',
    component: BrainTraumaPageComponent,
  },
  {
    path: 'severeInjuries',
    component: SevereInjuriesPageComponent,
  },
  {
    path: 'severeInjuries/head',
    data: {bodypart: 'HEAD'},
    component: SevereInjuriesDetailPageComponent,
  },
  {
    path: 'severeInjuries/arms',
    data: {bodypart: 'ARMS'},
    component: SevereInjuriesDetailPageComponent,
  },
  {
    path: 'severeInjuries/body',
    data: {bodypart: 'BODY'},
    component: SevereInjuriesDetailPageComponent,
  },
  {
    path: 'severeInjuries/waist',
    data: {bodypart: 'WAIST'},
    component: SevereInjuriesDetailPageComponent,
  },
  {
    path: 'severeInjuries/legs',
    data: {bodypart: 'LEGS'},
    component: SevereInjuriesDetailPageComponent,
  },
  {
    path: 'showdowns',
    component: ShowdownsPageComponent,
  },
  {
    path: 'showdowns/:id',
    component: ShowdownPageComponent,
  },
  {
    path: 'storyEvents',
    component: StoryEventsPageComponent,
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ParentModule,
    FormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [OthersPageComponent, ShowdownsPageComponent, ShowdownPageComponent,
    BrainTraumaPageComponent, GlossaryPageComponent, HuntEventTablePageComponent,
    SevereInjuriesPageComponent, SevereInjuriesDetailPageComponent, StoryEventsPageComponent],
})
export class OthersPageModule {
}
