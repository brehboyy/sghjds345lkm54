import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../providers/api/api';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';

  constructor(private api: ApiProvider , public storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      storage.ready().then(() => {
        storage.get('id_user').then((val) => {
          if (val > 0) {
            this.api.existUser(val).subscribe(data => {
              if (data['success']) {
                this.rootPage = 'HomePage';
              } else {
                this.rootPage = 'LoginPage';
              }
            });
          }
          else this.rootPage = 'LoginPage';
        })
      });
    });
  }
}

