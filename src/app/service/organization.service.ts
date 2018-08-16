import { Injectable } from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';
import { environment } from "../../environments/environment";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { UserService } from "../service/user.service";
import * as AWS from "aws-sdk";
import * as awsservice from "aws-sdk/lib/service";
import { CognitoCallback, CognitoUtil, LoggedInCallback } from "./cognito.service";

@Injectable()
export class OrganizationService {
  
  constructor(public cognitoUtil: CognitoUtil, public http: Http) {}
  
  /* 
  *   Takes in Param of Id = orgId = string
  */
  getOrgById(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = {
      'action': 'find_by_ordId',
      'orgId': id
    }

    this.http.post('https://qcj5gnlj4h.execute-api.us-east-2.amazonaws.com/v1/FrontEndApi', body, {headers: headers})
    .toPromise()
    .then(response => {
      console.log('here is the response from lambda');
      console.log(response);
    })
    .catch(err => {
      console.log('here is the error');
      console.log(err);
    })
  }
}