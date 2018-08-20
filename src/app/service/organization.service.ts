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

  orgId:string;
  
  constructor(public cognitoUtil: CognitoUtil, public http: Http) {}
  
  /* 
  *   Takes in Param of Id = orgId = string
  */
  getOrgById(orgId) {

    this.orgId = orgId;

    var promise = new Promise((res,rej) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = {
        'action': 'search_org_by_orgId',
        'OrgID': orgId
      }

      this.http.post('https://qcj5gnlj4h.execute-api.us-east-2.amazonaws.com/v1/FrontEndApi', body, {headers: headers})
      .toPromise()
      .then(response => {
        console.log('here is the response from lambda');
        console.log(response);
        let org = JSON.parse(response["_body"]);
        res(org);
      })
      .catch(err => {
        console.log('here is the error');
        console.log(err);
        rej(err);
      })
    });
    return promise;
  }

  updateOrg(orgInfo) {
    console.log('still has the org id: ' + this.orgId);
    console.log(orgInfo);
    var promise = new Promise((res,rej) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let queryString = `OrgID=${this.orgId}&OrgName=${orgInfo.name}&OrgOnboardingComplete=${orgInfo.orgOnboardingStatus}`;

      this.http.post('https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/core-stage-v1/organization', queryString, {headers: headers})
      .toPromise()
      .then(response => {
        console.log('here is the response from lambda');
        console.log(response._body);
        let tempBody = response._body.replace(/[{}]/g, "");
        let responseArray = tempBody.split('=');
        res(responseArray);
      })
      .catch(err => {
        console.log('there was an error');
        rej(err);
      })
    });
    return promise;
  }
}