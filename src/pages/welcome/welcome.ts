import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider) {
      if (this.authService.isLogin()) {
        this.navCtrl.push(TabsPage);
      }
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
