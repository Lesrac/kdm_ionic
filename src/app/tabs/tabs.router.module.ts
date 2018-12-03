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
   //     loadChildren: '../pages/settlements/settlements.module#SettlementsPageModule',
        component: SettlementsPageComponent,
        children: [
     //     {path: '', component: SettlementsPageComponent, pathMatch: 'full'},
  //        {path: ':id/timeline', component: TimelinePageComponent},
          {path: ':id', component: SettlementPageComponent},
        ],
      },
      {
        path: 'others',
        outlet: 'others',
   //     loadChildren: '../pages/others/others.module#OthersPageModule',
        component: OthersPageComponent,
        children: [
          {path: 'glossary', component: GlossaryPageComponent},
        ],
      },
      {
        path: 'huntEvents',
        outlet: 'others',
        component: HuntEventTablePageComponent,
      },
      {
        path: 'survivors',
        outlet: 'survivors',
        component: SurvivorsPageComponent,
   //     loadChildren: '../pages/survivors/survivors.module#SurvivorsPageModule',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/kdm/(settlements:settlements)',
    pathMatch: 'full',
  },
];

/*
{
    path: 'kdm',
    children: [
      {
        path: 'settlements',
        loadChildren: './pages/settlements/settlements.module#SettlementsPageModule',
      },
      {
        path: 'other',
        loadChildren: './pages/others/others.module#OthersPageModule',
      },
      {
        path: 'survivors',
        loadChildren: './pages/survivors/survivors.module#SurvivorsPageModule',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'kdm/settlements',
    pathMatch: 'full',
  },
 */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
