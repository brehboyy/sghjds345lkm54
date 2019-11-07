import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealpopsPage } from './mealpops';

@NgModule({
  declarations: [
    MealpopsPage,
  ],
  imports: [
    IonicPageModule.forChild(MealpopsPage),
  ],
})
export class MealpopsPageModule {}
