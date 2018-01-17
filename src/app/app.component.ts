import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPageComponent } from '../pages/tabs/tabs.component';
import { KDMDataService } from '../service/kdm_data.service';

@Component({
  templateUrl: 'app.component.html',
})
export class MyApp {
  rootPage: any = TabsPageComponent;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private kdmDataService: KDMDataService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('platform ready');
      kdmDataService.initData();
      if (platform.is('cordova')) {
        console.log('platform is cordova');
        statusBar.styleDefault();
        splashScreen.hide();
      }
    });
  }
}
