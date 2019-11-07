import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { IonicStorageModule } from '@ionic/storage';
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartsModule,
    HttpClientModule
  ],
  entryComponents: [
    MyApp
  ],
  bootstrap: [IonicApp],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
