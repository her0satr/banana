import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userDetails : any;

  constructor(public navCtrl: NavController, public app: App, private authService: AuthServiceProvider) {
    this.userDetails = this.authService.getUser();
  }

  logout() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }
}
