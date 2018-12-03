import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'kdm',
    children: [
      {
        path: 'settlements',
        loadChildren: './pages/settlements/settlements.module#SettlementsPageModule',
      },
      {
        path: 'other',
        loadChildren: '.pages/others/others.module#OthersPageModule',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
