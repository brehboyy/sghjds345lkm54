import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the MealpopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mealpops',
  templateUrl: 'mealpops.html',
})
export class MealpopsPage {
  recette:any;
  id_recette:number;
  buttonColor: string[];
  value:string;
  isactiveicon:boolean=false;
  colorBtn:boolean=true;
  isactivedate:boolean=false;
  moments=['09:00:00', '12:00:00', '16:00:00', '19:00:00'];
  moment:any;
  userid:number = -1;
  constructor(public toastCtrl:ToastController, public storage:Storage, public api:ApiProvider, public navCtrl: NavController, public navParams: NavParams, public view:ViewController) {
    this.buttonColor = ['dark','dark','dark','dark'];
    storage.ready().then(() => {
      storage.get('id_user').then((val) => {
        this.userid = val;
      })
    });
  }

  ionViewDidLoad() {
  }
   dismiss(){
  	const viewRecette = this.view;
  	viewRecette.dismiss();
  }
  ionViewWillLoad(){
    this.recette = this.navParams.get('recette');
  }
  color() {
    if(this.isactiveicon&&this.isactivedate){
        this.colorBtn = false;
    }

  }
  select(icon){
    this.isactiveicon = true;
    for(let i=0;i<4;i++){
      this.buttonColor[i] = 'dark';
    }
    this.buttonColor[icon] = 'primary';
    this.color();
    this.moment=this.moments[icon];
  }

  getDate(){
    if(this.value!=""){
      this.isactivedate = true;      
    }
    this.color();
  }

  addValider(){
    let date = "";
    date = this.value+" "+this.moment;
    //let recetteid = this.navParams.get('recetteid');

    this.api.addRepas(this.userid,this.recette.REC_Identifier , date).subscribe(data => {
      let toast = this.toastCtrl.create({
        message: data['message'],
        duration: 1500,
        position: 'top'
      });
      toast.present();
    });
    this.view.dismiss();
  }

}
