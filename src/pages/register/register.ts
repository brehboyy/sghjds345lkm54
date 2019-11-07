import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  formgroup:FormGroup;
  login:AbstractControl;
  password:AbstractControl;
  email:AbstractControl;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController,public navParams: NavParams,public formbuilder:FormBuilder, public api:ApiProvider) {

    this.formgroup = formbuilder.group({
      login:['',[Validators.required,Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9 ]*')]],
      password:['',[Validators.required,Validators.maxLength(20),Validators.pattern('^[?=.*0-9a-zA-Z]*'), Validators.minLength(8)]],
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}')]]
    });

    this.login = this.formgroup.controls['login'];
    this.password = this.formgroup.controls['password'];
    this.email = this.formgroup.controls['email'];

  }

  back(){
    this.navCtrl.pop();
  }
  

  public goToLogin(){
    if(this.formgroup.valid){
      this.api.enregistrer(this.login.value, this.password.value,this.email.value).subscribe(data=>{
        if(data['success']){
          this.navCtrl.pop();
        }else{
          let toast = this.toastCtrl.create({
            message: data['message'],
            duration: 15000,
            position: 'bottom'
          });
          toast.present();
        }
      })
      
    }
  }

  ionViewDidLoad() {
  }

}
