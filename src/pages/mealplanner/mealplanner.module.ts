import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealplannerPage } from './mealplanner';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MealplannerPage,
  ],
  imports: [
    IonicPageModule.forChild(MealplannerPage),
    PipesModule
  ],
})
export class MealplannerPageModule {}
