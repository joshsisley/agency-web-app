import { Injectable } from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';
import { environment } from "../../environments/environment";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
import * as awsservice from "aws-sdk/lib/service";
import { CognitoCallback, CognitoUtil, LoggedInCallback } from "./cognito.service";
import { resolve } from "dns";

@Injectable()
export class UserService {

  user:any;

  constructor(public cognitoUtil: CognitoUtil, public http:Http){}

  getCognitoUser() {
    return this.cognitoUtil.getCurrentUser();
  }

  getCurrentUser() {
    return this.user;
  }
  
  getUserByCognitoID() {
    var promise = new Promise((resolve, reject) => {
      let cognitoUser = this.getCognitoUser();
      console.log('got the current cognito user');
      console.log(cognitoUser);

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = {
        'CognitoID': cognitoUser["username"]
      }

      this.http.get('https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/core-stage-v4/searchUser', {params:body, headers:headers})
      .toPromise()
      .then(response => {
        console.log('here is the response from lambda');
        console.log(response['_body']);
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