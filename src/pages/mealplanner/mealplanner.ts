import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ToastController, IonicPage } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the MealplannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mealplanner',
  templateUrl: 'mealplanner.html',
})
export class MealplannerPage {
	moments = ["matin", "midi" , "collation", "soir"];
	aujourdhui:string;
	text: string;
	userid:number;
	auj : Date;
	mealplannersAll: any;
  mealplanner: any;
	hasAnswered = false;
  constructor(public api:ApiProvider, public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public view: ViewController, public modalCtrl: ModalController) {
  	this.auj = new Date();
    //this.aujourdhui = this.auj.toDateString();
    this.userid=this.navParams.get('userid');
    this.getRepasbyId();
  }

  jourSuivant(bool){
  	//si vrai jour suivant sinon jour precedent
  	if(bool)
  		this.auj.setDate(this.auj.getDate() + 1);
  	else
  		this.auj.setDate(this.auj.getDate() - 1);
  	this.getDayAuj();
  }

  ionViewDidLoad() {
    
  }

  getRepasbyId(){
    this.api.getAllRepasById(this.userid).subscribe(data => {
      this.text = data['message'];
      this.mealplannersAll = data['mealplanner'];
      this.getDayAuj();
    });
  }



  closeView(){
  	const viewRecette = this.view;
  	viewRecette.dismiss();
  }

  getDayAuj(){
    switch (this.auj.getDay()) {
      case 0:
         this.aujourdhui = "Dimanche  " + this.auj.getDate() + "/" + (this.auj.getMonth()  + 1);
        break;
      case 1:
          this.aujourdhui = "Lundi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      case 2:
          this.aujourdhui = "Mardi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      case 3:
          this.aujourdhui = "Mercredi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      case 4:
          this.aujourdhui = "Jeudi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      case 5:
          this.aujourdhui = "Vendredi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      case 6:
          this.aujourdhui = "Samedi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      
      default:
        this.aujourdhui = "Erreur";
        break;
    }
    this.mealplanner= [];
    for (let i = 0; i < this.mealplannersAll.length; i++) {
      let dateWindows = new Date(this.auj);
      let parser = this.mealplannersAll[i].date.split(/[^0-9]/);
      let dateRepas = new Date(parser[0],(parseInt(parser[1])-1),parser[2],parser[3],parser[4],parser[5]);
      //new Date(this.mealplannersAll[i].date);
      dateRepas.setHours(0,0,0,0);
      dateWindows.setHours(0,0,0,0);
      if(dateRepas.valueOf() === dateWindows.valueOf()){
        this.mealplanner.push(this.mealplannersAll[i]);
      }
    }
  }

  deleteRepas(repas) {
    this.api.deleteRepasMealPlanner(repas.id).subscribe(data => {
      if(data['success']){
        let toast = this.toastCtrl.create({
          message: repas.Titre + " supprimmé du MealPlanner",
          duration: 1000,
          position: 'top'
        });
        toast.present();
        this.getRepasbyId();
      }
    })
  }


  openDetails(recette_id) {
    /*this.ga.trackEvent('Livre', 'open recette', 'index recette', this.slides.getActiveIndex())
      .then(() => {
        this.hasAnswered = true;
      });
    this.ga.trackEvent('Livre', 'open recette', 'id recette', recette.ID_recette)
      .then(() => {
        this.hasAnswered = true;
      });*/
      const modalRecette = this.modalCtrl.create('RecettePage',{recette_id:recette_id});
      modalRecette.present();
  }
}
