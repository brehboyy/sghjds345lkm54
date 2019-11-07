import { Component, ViewChild } from '@angular/core';
import { PopoverController, NavController, Slides, ModalController, ActionSheetController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { ConnexionComponent } from '../../components/connexion/connexion';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;
  userid = 0;
  tabs: any = [];
  Ingredients: any = [];
  vue: boolean = true;
  Recettes: any;
  afficherConnection:boolean = true;

  traduire: boolean;
  ingredients: any = [];
  categories: any;
  id: number;
  id_cat: number;
  text: any;
  ingredientsSAVE: any;
  test: any;
  del: boolean;
  hasAnswered = false;
  add: boolean;
  displayCat: boolean;
  shouldSwipe: boolean = true;
  supCat: number[];
  tabIng: any;
  display: number;
  rechercher: boolean;


  constructor(public popoverCtrl: PopoverController, public actionDeco: ActionSheetController, public storage: Storage, public api: ApiProvider, public popoverController: PopoverController, public navCtrl: NavController, private modal: ModalController) {
    this.tabs = ["page1", "page2"];
    this.api.getcategories().subscribe(data => {
      if (data['success']) {
        this.text = data['message'];
        this.categories = data['result'];
        this.categories.push({"CAT_Identifier" : 0, "CAT_Name" : "Tous"});
      }
    });
    //this.categories = [{ "ID_cat": 1, "Nom": "carrot" }, { "ID_cat": 2, "Nom": "fat" }, { "ID_cat": 3, "Nom": "gluten" }, { "ID_cat": 4, "Nom": "spices" }, { "ID_cat": 5, "Nom": "fruit" }, { "ID_cat": 6, "Nom": "meat" }, { "ID_cat": 7, "Nom": "nuts" }, { "ID_cat": 8, "Nom": "seafood" }, { "ID_cat": 9, "Nom": "sugar" }, { "ID_cat": 10, "Nom": "milk" }, { "ID_cat": 11, "Nom": "sauces" }, { "ID_cat": 12, "Nom": "other" }];
    storage.ready().then(() => {
      storage.get('id_user').then((val) => {
        this.userid = val;
        this.getLivre();
        this.getFrigo();
      }).then(()=>{
        this.afficherConnection = (this.userid == 0);
      });
    });
    this.id_cat = 2;
  }

  afficheIng(cat) {
    this.id_cat = cat;
  }

  openConnexion() {
    const popover = this.popoverCtrl.create(ConnexionComponent);
    popover.onDidDismiss(id_user  => {
      this.userid = id_user;
      this.afficherConnection = false;
      this.getFrigo();
      this.getLivre();
    });
    popover.present();
  }

  getFrigo() {
    if (this.userid > 0) {
      this.api.getFrigoByIdUser(this.userid).subscribe(data => {
        if (data['success']) {
          this.Ingredients = data['result'];
        }
      });
    }
  }

  changement() {
    if (this.SwipedTabsSlider._activeIndex == 0) {
      this.vue = !this.vue;
      this.getLivre();
    }
    else if (this.SwipedTabsSlider._activeIndex == 1) {
      this.vue = !this.vue;
      this.getFrigo();
    }

  }

  getLivre() {
    if (this.userid > 0) {
      this.api.getLivreByIdUser(this.userid).subscribe(data => {
        if (data['success']) {
          this.Recettes = data['result'];
        }
      });
    }else{
      if(this.Ingredients.length > 0){
        this.api.getLivreTmpUser(this.Ingredients.map(ing => parseInt(ing.MI_Identifier))).subscribe(data => {
          if(data['success']){
            this.Recettes = data['result'];
          }
        });
      }
      
    }
  }

  deleteIng(ing) {
    if (this.userid > 0) {
      this.api.deleteIng(this.userid, ing.MI_Identifier).subscribe(data => {
        this.text = data['message'];
        this.getFrigo();
      });
    }else{
      this.Ingredients.splice(this.Ingredients.indexOf(ing), 1);
    }
  }

  openRecette(recette_id) {
    const modalRecette = this.modal.create('RecettePage', { recette_id: recette_id });
    modalRecette.present();
  }

  openProfil() {
    if(this.userid > 0){
      const modalRecette = this.modal.create('CopiePage', { userid: this.userid });
      modalRecette.present();
    }
  }

  openMP() {
    if(this.userid > 0){
      const modalRecette = this.modal.create('MealplannerPage', { userid: this.userid });
      modalRecette.present();
    }
  }

  magasin() {
    const modalMagasin = this.modal.create('MagasinPage', { userid: this.userid, ingredientsTmp: this.Ingredients, id_cat: this.id_cat == 0 ? 2 : this.id_cat });
    //Les element de cette object sont definis dans le magasin (id_cat: l'identifiant de la categorie, ingredientsTmp: la liste des ingredients choisis pour une personne non identifié);
    modalMagasin.onDidDismiss(obj => {
      this.id_cat = obj.id_cat;
      this.Ingredients = obj.ingredientsTmp;
      console.log(this.Ingredients);
      this.getFrigo();
      this.getLivre();
    });
    modalMagasin.present();
  }


  tobook() {
    this.SwipedTabsSlider.slideTo(0, 500);
  }
  tofrigo() {
    this.SwipedTabsSlider.slideTo(1, 500);

  }

  presentDeco() {
    if(this.userid > 0){
      let actionSheet = this.actionDeco.create({
        buttons: [
          {
            text: 'Deconnexion',
            role: 'destructive',
            handler: () => {
              this.storage.set('id_user', 0);
              window.location.reload();
            }
          }, {
            text: 'Annuler',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
    actionSheet.present();
    }
  }
}