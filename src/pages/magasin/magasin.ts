import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the MagasinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-magasin',
  templateUrl: 'magasin.html',
})
export class MagasinPage {
  userid:number = -1;

  searchFilter:string;
  compt: number;
  tabImg: any;
  add: boolean;
  ingredients: any;
  ingredientsNom: any;
  text: any;
  categories: any;
  id_cat: number;
  hasAnswered = false;
  ingredientsSave: any;
  displayCat: boolean= true;;
  swipeNum: number;
  boool: boolean;
  tuto: number;
  isfiltered:boolean;

  constructor(public api:ApiProvider, public navCtrl: NavController, public navParams: NavParams, public view:ViewController) {
    this.userid = this.navParams.get('userid');
    this.searchFilter = "";
    this.api.getcategories().subscribe(data => {
      if(data['success']){
        this.text = data['message'];
        this.categories = data['result'];
      }
    });
    //this.categories = [{ "ID_cat": "1", "Nom": "carrot" }, { "ID_cat": "2", "Nom": "fat" }, { "ID_cat": "3", "Nom": "gluten" }, { "ID_cat": "4", "Nom": "spices" }, { "ID_cat": "5", "Nom": "fruit" }, { "ID_cat": "6", "Nom": "meat" }, { "ID_cat": "7", "Nom": "nuts" }, { "ID_cat": "8", "Nom": "seafood" }, { "ID_cat": "9", "Nom": "sugar" }, { "ID_cat": "10", "Nom": "milk" }, { "ID_cat": "11", "Nom": "sauces" }, { "ID_cat": "12", "Nom": "other" }];
    this.id_cat = this.navParams.get('id_cat');
    this.isfiltered=true;
    this.getIndredient();
  }

  ionViewidLoad() {
  }

  afficheIng(cat) {
    this.id_cat = cat;
  }

  getIndredient(){
    this.api.getMagasinByIdUser(this.userid).subscribe(data => {
      if(data['success']){
        this.ingredients = data['result'];
        this.ingredientsSave = this.ingredients;
      }
    });
  }

  initializeItems() {
    this.ingredients = this.ingredientsSave;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isfiltered = false;
      this.displayCat = false;
      this.ingredients = this.ingredientsSave.filter((item) => {
        return (item.MI_Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.displayCat = true;
      this.isfiltered = true;
    }
  }

  close(){
  	const viewRecette = this.view;
  	viewRecette.dismiss(this.id_cat);
  }

  checked(ing){
    if (ing) return false;
    else return true;
  }

  checkerBox(ing) {
      if (ing.checked == true) {
        this.ingredients[this.ingredients.indexOf(ing)].checked = false;
        this.compt--;
      } else {
        this.ingredients[this.ingredients.indexOf(ing)].checked = true;
        this.compt++;
      }
  }

  addIngredient() {
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].checked == true) {
        this.ajouter(this.ingredients[i].MI_Identifier);
        //this.toastAjoutIng(ingredients[i]);
      }
    }
    this.view.dismiss(this.id_cat);
  }
  ajouter(id_ing) {
    if (this.userid != null) {
      this.api.addIngredientToFrigo(this.userid, id_ing).subscribe(data => {
        this.text = data['message'];
      });
    }
  }
}
