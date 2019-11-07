import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  email:AbstractControl;
  formgroup:FormGroup;
  constructor(public api: ApiProvider, public navCtrl: NavController, public toastCtrl: ToastController, public formbuilder:FormBuilder, public navParams: NavParams) {
    this.formgroup = formbuilder.group({
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}')]]
    });

    this.email = this.formgroup.controls['email'];
  }

  back(){
    this.navCtrl.pop();
  }

  public resetPassword(){
    this.api.forgotPassword(this.email.value).subscribe(data=>{
      let obj = JSON.parse(data['_body']);
      let toast = this.toastCtrl.create({
        message: obj.message,
        duration: 1500,
        position: 'bottom'
      });
      toast.present();
    });
  }
  ionViewDidLoad() {
  }

}
