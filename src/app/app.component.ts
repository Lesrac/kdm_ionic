import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPageComponent } from '../pages/tabs/tabs.component';

@Component({
  templateUrl: 'app.component.html',
})
export class MyApp {
  rootPage: any = TabsPageComponent;

  constructor(platform: Platform,
              private statusBar: StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('platform ready');
      if (platform.is('cordova')) {
        console.log('platform is cordova');
        statusBar.styleDefault();
        splashScreen.hide();
      }
    });
  }
}
