import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from "../../environments/environment";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
import * as awsservice from "aws-sdk/lib/service";
import { CognitoCallback, CognitoUtil, LoggedInCallback } from "./cognito.service";
import { resolve } from "dns";

@Injectable()
export class UserService {

  user: any;

  constructor(public cognitoUtil: CognitoUtil, public http: Http) { }

  getCognitoUser() {
    return this.cognitoUtil.getCurrentUser();
  }

  getCurrentUser() {
    return this.user;
  }

  getUserByCognitoID() {
    var promise = new Promise((resolve, reject) => {
      let cognitoUser = this.getCognitoUser();

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = {
        'CognitoID': cognitoUser["username"]
      }

      this.http.get('https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/Dev/searchUser', { params: body, headers: headers })
        .toPromise()
        .then(response => {
          let user = JSON.parse(response['_body']);
          this.user = user;
          resolve(user);
        })
        .catch(err => {
          console.log('here is the error');
          reject(err);
        })
    })
    return promise;
  }
}