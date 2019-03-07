import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// known bugs for lazy loading in aux outlets:
// https://github.com/angular/angular/issues/10981
// https://github.com/angular/angular/issues/10726
const routes: Routes = [
  {
    path: 'kdm',
    component: TabsPage,
    children: [
      {
        path: 'settlements',
        children: [
          {
            path: '',
            loadChildren: '../pages/settlements/settlements.module#SettlementsPageModule',
          },
        ],
      },
      {
        path: 'others',
        children: [
          {
            path: '',
            loadChildren: '../pages/others/others.module#OthersPageModule',
          },
        ],
      },
      {
        path: 'survivors',
        children: [
          {
            path: '',
            loadChildren: '../pages/survivors/survivors.module#SurvivorsPageModule',
          },
        ],
      },
      {
        path: '',
        redirectTo: '/kdm/settlements',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/kdm/settlements',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [IonicModule, FormsModule, CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
