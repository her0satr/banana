import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userDetails : any;
  public responseData : any;
  public dataSet : any;
  
  public page = { feed: "" };
  public userPostData = { user_id: "", token: "" };

  constructor(
    public navCtrl: NavController,
    public app: App,
    private authService: AuthServiceProvider) {
      this.userDetails = this.authService.getUser();
      this.loadFeed();
  }

  convertTime(time) {
    return new Date(time * 1000);
  }

  loadFeed() {
    // param
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    // request
    this.authService.postData(this.userPostData, 'feed').then((result) => {
      this.responseData = result;
      if (this.responseData.feedData) {
        this.dataSet = this.responseData.feedData;
      } else {
        console.log('API error.');
      }
    }, (err) => {
      console.error('Connection fail');
    });
  }

  feedUpdate() {
    var param = {
      token: this.userDetails.token,
      user_id: this.userDetails.user_id,
      feed: this.page.feed
    };
    this.authService.postData(param, 'feedUpdate').then((result) => {
      this.page.feed = '';
      this.loadFeed();
      this.authService.toast('Feed succesful updated.');
    }, (err) => {
      this.authService.toast('Connection fail');
    });
  }

  deleteFeed(row) {
    var param = {
      token: this.userDetails.token,
      user_id: this.userDetails.user_id,
      feed_id: row.feed_id
    };
    this.authService.postData(param, 'feedDelete').then((result) => {
      this.loadFeed();
      this.authService.toast('Feed successful deleted.');
    }, (err) => {
      this.authService.toast('Connection fail');
    });
  }

  logout() {
    localStorage.clear();
    const root = this.app.getRootNav();
    root.popToRoot();
  }
}
