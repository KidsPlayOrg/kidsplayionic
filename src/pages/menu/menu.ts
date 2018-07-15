import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, App } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
	@ViewChild(Nav) nav: Nav;
	pages: Array<{title: string, component: string, icon: string, openTab?: any}>;
	rootPage = 'HomePage';
  constructor(public navCtrl: NavController, public auth: AuthProvider, public appCtrl:App) {
  	this.pages = [
  		{title: 'Home', component: 'HomePage', icon: 'home'},
  	];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page){
  	this.nav.setRoot(page.component, {openTab: page.openTab});
  }

  logout(){
    this.auth.logout().then(()=>{
      this.appCtrl.getRootNav().setRoot('LoginPage');
    })
  }

}
