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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParentModule } from './util/parent.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), FormsModule, ReactiveFormsModule, HttpClientModule,
    ParentModule, AppRoutingModule],
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
    console.log(router.config);
  }

}
