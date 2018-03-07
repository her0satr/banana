import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  userData = {};
  responseData : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    this.authService.postData(this.userData, 'signup').then((result) => {
      this.responseData = result;
      
      localStorage.setItem('userData', JSON.stringify(this.responseData.userData));
      this.navCtrl.push(TabsPage, {}, { animate: false });
    }, (err) => {
      console.error('Connection fail');
    });
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
