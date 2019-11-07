import { Component } from '@angular/core';
import { NavController,ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the ConnexionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'connexion',
  templateUrl: 'connexion.html'
})
export class ConnexionComponent {
  formgroup:FormGroup;
  login:AbstractControl;
  password:AbstractControl;

  constructor(
    public formbuilder:FormBuilder,
    public storage:Storage,
    public navCtrl: NavController,
    public toastCtrl:ToastController,
    public api:ApiProvider,
    public view:ViewController) {

    this.formgroup = formbuilder.group({
      login:['',[Validators.required,Validators.maxLength(20)]],
      password:['',[Validators.required,Validators.maxLength(20), Validators.minLength(8)]]
    });

    this.login = this.formgroup.controls['login'];
    this.password = this.formgroup.controls['password'];
  }
  goToRegister (){
    //const modalRegister = this.modal.create('RegisterPage');
    //modalRegister.present();
    this.navCtrl.push('RegisterPage');
  }

  goToForgotpassword(){
    this.navCtrl.push('ForgotPasswordPage');
  }

  goToHome(){
    console.log(this.formgroup);
    if(this.formgroup.valid){
      this.api.login(this.login.value, this.password.value).subscribe(data => {
        if(data['success']){
          this.storage.set('id_user', parseInt(data['result']));
          let toast = this.toastCtrl.create({
            message: data['message'] ? data['message'] : "Connexion reussi",
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.view.dismiss(parseInt(data['result']));
        }else{
          let toast = this.toastCtrl.create({
            message: data['message'] ? data['message'] : "Aucune connexion n'a pu être établie",
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
        }
      });
    } 
  }

}
