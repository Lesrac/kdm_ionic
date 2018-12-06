import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { SurvivorsPageComponent } from '../pages/survivors/survivors.component';
import { SettlementsPageComponent } from '../pages/settlements/settlements.component';
import { OthersPageComponent } from '../pages/others/others.component';
import { SettlementPageComponent } from '../pages/settlement/settlement.component';
import { TimelinePageComponent } from '../pages/timeline/timeline.component';
import { HuntEventTablePageComponent } from '../pages/others/hunt_event_table/hunt-event-table.component';
import { GlossaryPageComponent } from '../pages/others/glossary/glossary.component';
import { BrainTraumaPageComponent } from '../pages/others/brain_trauma/brain-trauma.component';
import { SevereInjuriesPageComponent } from '../pages/others/severe_injuries/severe-injuries.component';
import { ShowdownsPageComponent } from '../pages/others/showdown/showdowns.component';
import { StoryEventsPageComponent } from '../pages/others/story_events/story-events.component';
import { SevereInjuriesDetailPageComponent } from '../pages/others/severe_injuries/severe-injuries-detail.component';
import { ShowdownPageComponent } from '../pages/others/showdown/showdown.component';
import { ShowListComponent } from '../pages/template/show-list.component';
import { ShowListTypes } from '../model/show-list-types';
import { ShowListDetailComponent } from '../pages/template/show-list-detail.component';

// known bugs for lazy loading in aux outlets:
// https://github.com/angular/angular/issues/10981
// https://github.com/angular/angular/issues/10726
const routes: Routes = [
  {
    path: 'kdm',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/kdm/(settlements:settlements)',
        pathMatch: 'full',
      },
      {
        path: 'settlements',
        outlet: 'settlements',
        component: SettlementsPageComponent,
      },
      {
        path: ':id',
        outlet: 'settlements',
        component: SettlementPageComponent,
      },
      {
        path: ':id/timeline',
        outlet: 'settlements',
        component: TimelinePageComponent,
      },
      {
        path: ':id/innovations',
        outlet: 'settlements',
        component: ShowListComponent,
        data: { type: ShowListTypes.INNOVATION },
      },
      {
        path: ':id/innovations/:name',
        outlet: 'settlements',
        component: ShowListDetailComponent,
        data: { type: ShowListTypes.INNOVATION },
      },
      {
        path: 'others',
        outlet: 'others',
        component: OthersPageComponent,
      },
      {
        path: 'huntEvents',
        outlet: 'others',
        component: HuntEventTablePageComponent,
      },
      {
        path: 'glossary',
        outlet: 'others',
        component: GlossaryPageComponent,
      },
      {
        path: 'brainTrauma',
        outlet: 'others',
        component: BrainTraumaPageComponent,
      },
      {
        path: 'severeInjuries',
        outlet: 'others',
        component: SevereInjuriesPageComponent,
      },
      {
        path: 'severeInjuries/head',
        outlet: 'others',
        data: {bodypart: 'HEAD'},
        component: SevereInjuriesDetailPageComponent,
      },
      {
        path: 'severeInjuries/arms',
        outlet: 'others',
        data: {bodypart: 'ARMS'},
        component: SevereInjuriesDetailPageComponent,
      },
      {
        path: 'severeInjuries/body',
        outlet: 'others',
        data: {bodypart: 'BODY'},
        component: SevereInjuriesDetailPageComponent,
      },
      {
        path: 'severeInjuries/waist',
        outlet: 'others',
        data: {bodypart: 'WAIST'},
        component: SevereInjuriesDetailPageComponent,
      },
      {
        path: 'severeInjuries/legs',
        outlet: 'others',
        data: {bodypart: 'LEGS'},
        component: SevereInjuriesDetailPageComponent,
      },
      {
        path: 'showdowns',
        outlet: 'others',
        component: ShowdownsPageComponent,
      },
      {
        path: 'showdowns/:id',
        outlet: 'others',
        component: ShowdownPageComponent,
      },
      {
        path: 'storyEvents',
        outlet: 'others',
        component: StoryEventsPageComponent,
      },
      {
        path: 'survivors',
        outlet: 'survivors',
        component: SurvivorsPageComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/kdm/(settlements:settlements)',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
