import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formgroup:FormGroup;
  login:AbstractControl;
  password:AbstractControl;
  constructor(public storage:Storage,
    public navCtrl: NavController,
    public api:ApiProvider,
    public navParams: NavParams,
    public modal: ModalController,
    public formbuilder:FormBuilder,
    public toastCtrl:ToastController) {

      this.formgroup = formbuilder.group({
        login:['',[Validators.required,Validators.maxLength(20)]],
        password:['',[Validators.required,Validators.maxLength(20), Validators.minLength(8)]]
      });

      this.login = this.formgroup.controls['login'];
      this.password = this.formgroup.controls['password'];

  }

  public goToRegister (){
    //const modalRegister = this.modal.create('RegisterPage');
    //modalRegister.present();
    this.navCtrl.push('RegisterPage');
  }

  goToForgotpassword(){
    this.navCtrl.push('ForgotPasswordPage');
  }
  
  public goToHome(){
    if(this.formgroup.valid){
      this.api.login(this.login.value, this.password.value).subscribe(data => {
        if(data['success']){
          this.storage.set('id_user', parseInt(data['result']));
          this.navCtrl.setRoot('HomePage');
        }else{
          let toast = this.toastCtrl.create({
            message: data['message'] ? data['message'] : "Aucune connexion n'a pu être établie",
            duration: 15000,
            position: 'bottom'
          });
          toast.present();
        }
      });
    } 
  }
  // showactionsheet() {
  //   let actionsheet = this.actionctrl.create( {
  //     title: 'My favorite list',
  //     buttons : [
  //       {
  //         text:'Delete',
  //         role:'destructive',
  //         handler: () => {
  //           console.log("Hey deleted successfully")
  //         }
  //       },
  //       {
  //         text:'Share',
  //         handler: () => {
  //           console.log("Hey Shared successfully")
  //         }
  //       },
  //       {
  //         text:'Cancel',
  //         role:'cancel',
  //         handler: () => {
  //           console.log("Hey cancelled successfully")
  //         }s
  //       }
  //     ]
  //   });

  //   actionsheet.present();
  // }

}