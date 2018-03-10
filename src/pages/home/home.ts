import { Component } from '@angular/core';
import { NavController, App, Row } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userDetails : any;
  public responseData : any;
  
  public page = { feed: "" };
  public dataSet = [];
  public userPostData = { user_id: "", token: "", page_no: 1 };

  constructor(
    public navCtrl: NavController,
    public app: App,
    private authService: AuthServiceProvider) {
      this.userDetails = this.authService.getUser();
      this.loadFeed();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      if (this.userPostData.page_no != 0) {
        this.userPostData.page_no++;
        this.loadFeed();
      }
      
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  convertTime(time) {
    return new Date(time * 1000);
  }

  loadFeed() {
    // param
    this.userPostData.token = this.userDetails.token;
    this.userPostData.user_id = this.userDetails.user_id;

    // request
    this.authService.postData(this.userPostData, 'feed').then((result) => {
      this.responseData = result;
      
      if (this.responseData.feedData) {
        if (this.responseData.feedData.length == 0) {
          this.userPostData.page_no = 0;
        } else {
          for (var i = 0; i < this.responseData.feedData.length; i++) {
            this.dataSet.push(this.responseData.feedData[i]);
          }
        }
      } else {
        this.authService.toast('API error.');
      }
    }, (err) => {
      this.authService.toast('Connection fail.');
    });
  }

  feedUpdate() {
    var param = {
      token: this.userDetails.token,
      user_id: this.userDetails.user_id,
      feed: this.page.feed
    };
    this.authService.postData(param, 'feedUpdate').then((result) => {
      // reset
      this.dataSet = [];
      this.page.feed = '';
      this.userPostData.page_no = 1;

      // load feed
      this.loadFeed();
      this.authService.toast('Feed succesful updated.');
    }, (err) => {
      this.authService.toast('Connection fail');
    });
  }

  deleteFeed(row, index) {
    var param = {
      token: this.userDetails.token,
      user_id: this.userDetails.user_id,
      feed_id: row.feed_id
    };
    this.authService.postData(param, 'feedDelete').then((result) => {
      this.dataSet.splice(index, 1);
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
