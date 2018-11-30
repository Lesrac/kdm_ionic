import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPageComponent } from './tabs.component';
import { SettlementsPageComponent } from '../settlements/settlements.component';
import { OthersPage } from '../others/others.component';
import { SurvivorsPageComponent } from '../survivors/survivors.component';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPageComponent,
        children: [
            {
                path: '',
                redirectTo: '/tabs/(settlements:settlements)',
                pathMatch: 'full',
            },
            {
                path: 'settlements',
                outlet: 'settlements',
                component: SettlementsPageComponent,
            },
            {
                path: 'other',
                outlet: 'other',
                component: OthersPage,
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
        redirectTo: '/tabs/(settlements:settlements)',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
