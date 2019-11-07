import { Component } from '@angular/core';
import { PopoverController, ModalController, IonicPage, NavController, AlertController, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the RecettePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recette',
  templateUrl: 'recette.html',
})


export class RecettePage {

  src = "assets/imgs/tarte.jpg";
  titre = "Tarte Delissiouza";
  recette_id: any;
  recette: any;
  serving: any;  //`REC_YIELDNB`,
  calories: any;  //`REC_TOTALCALORIES`,
  graisses: any;  //`REC_TOTALFAT`,
  glucides: any;  //`REC_TOTALCARBS`,
  proteines: any;  //`REC_PROTEIN`,
  instructions: any;  //`REC_INSTRUCTIONS` 

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public alertController: AlertController,
    public popoverController: PopoverController,
    private modal: ModalController,
    public api: ApiProvider,
    //private iab: InAppBrowser
  ) {
    this.recette = [];
    this.getRecette();

  }

  getRecette() {
    this.recette_id = this.navParams.get('recette_id');
    this.api.getRecette(this.recette_id).subscribe(data => {
      if (data['success']) {
        this.recette = data['result'];
      }
    });
  }

  /*gotoSource(){
    const browser = this.iab.create(this.recette.REC_Source);
  }*/

  close() {
    const viewRecette = this.view;
    viewRecette.dismiss();
  }
  ionViewDidLoad() {
    this.getRecette();
  }
  Planner() {
    var customTemplate =
      '<ion-toggle>enable</ion-toggle>' +
      '<label class="item item-input"><input type="text" placeholder="your address"></label>';

    const alert = this.alertController.create({
      message: customTemplate,
      buttons: ['OK']

    });

    alert.present();

  }
  openMealpops() {
    const modalMagasin = this.modal.create('MealpopsPage', { recette: this.recette });
    modalMagasin.present();
  }
}
