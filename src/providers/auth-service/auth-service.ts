import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost/PHP-Slim-Restful/api/';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  isLogin() {
    let result = false;
    let userTmp = localStorage.getItem('userData');
    if (userTmp != null) {
      result = true;
    }

    return result;
  }

  getUser() {
    let userData = { isLogin: false };
    let userTmp = localStorage.getItem('userData');
    if (userTmp != null) {
      userData = JSON.parse(userTmp);
      userData.isLogin = true;
    }

    return userData;
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + type, JSON.stringify(credentials), { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }), (err) => {
          reject(err);
        }
    });
  }
}
