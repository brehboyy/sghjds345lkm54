import { NgModule } from '@angular/core';
import { ConnexionComponent } from './connexion/connexion';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';

@NgModule({
	declarations: [ConnexionComponent],
	imports: [
		ReactiveFormsModule,
	],
	exports: [
		ConnexionComponent,
		FormsModule,
		ReactiveFormsModule]
})
export class ComponentsModule {}
