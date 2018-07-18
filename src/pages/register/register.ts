import { Component } from '@angular/core';
import { IonicPage, NavController, Alert, AlertController, Loading, LoadingController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator} from '../../validators/email';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	public registerForm: FormGroup;
	public loading: Loading;

  constructor(public navCtrl: NavController, 
  	public alertCtrl: AlertController, 
  	public loadingCtrl: LoadingController, public auth: AuthProvider, formBuilder: FormBuilder) { 
  	this.registerForm = formBuilder.group({
  		email: [
  			'',
  			Validators.compose([Validators.required, EmailValidator.isValid])
  		],
  		password: [
  			'',
  			Validators.compose([Validators.minLength(6), Validators.required])
  		]
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register():void{
  	if(!this.registerForm.valid){
  		console.log(`Need to complete the form, current value: ${this.registerForm.value}`);
  	}else{
  		const email: string = this.registerForm.value.email;
  		const password: string = this.registerForm.value.password;

  		this.auth.register(email, password).then(user =>{
  			this.loading.dismiss().then(()=>{
  				this.navCtrl.setRoot(MenuPage);
  			});
  		}, error => {
  			this.loading.dismiss().then(()=>{
  				const alert: Alert =  this.alertCtrl.create({
  					message: error.message,
  					buttons: [{ text: "Ok", role: 'cancel'}]
  				});
  				alert.present();
  			});
  		});
  		this.loading = this.loadingCtrl.create();
  		this.loading.present();
  	}
  }

}
