import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userData = {};
  responseData : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider) {
  }

  login() {
    this.authService.postData(this.userData, 'login').then((result) => {
      this.responseData = result;
      if (this.responseData.error != null) {
        this.toastCtrl.create({ message: this.responseData.error.text, duration: 1500, position: 'top' }).present();
      } else {
        localStorage.setItem('userData', JSON.stringify(this.responseData.userData));
        this.navCtrl.push(TabsPage, {}, { animate: false });
      }
    }, (err) => {
      this.authService.toast('Connection fail');
    });
  }
  
  welcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }
}
