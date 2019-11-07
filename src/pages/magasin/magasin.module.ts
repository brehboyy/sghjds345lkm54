import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MagasinPage } from './magasin';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MagasinPage
  ],
  imports: [
    IonicPageModule.forChild(MagasinPage),
    PipesModule
  ],
})
export class MagasinPageModule {}
