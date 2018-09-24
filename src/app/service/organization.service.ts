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

  getOrgId() {
    if (this.orgId) {
      return this.orgId;
    }
  }

  getOrgInfo() {
    return JSON.parse(localStorage.getItem('orgInfo'));
  }
  
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

      this.http.post('https://qcj5gnlj4h.execute-api.us-east-2.amazonaws.com/dev/FrontEndApi', body, {headers: headers})
      .toPromise()
      .then(response => {
        console.log('here is the response from lambda');
        console.log(response);
        let org = JSON.parse(response["_body"]);
        localStorage.setItem('orgInfo', JSON.stringify({'name':org.OrgName, 'orgOwner': org.OrgOwner, 'orgOnboardingStatus':org.OrgOnboardingComplete}))
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

      if (!orgInfo.name || orgInfo.name.length == 0) {
        orgInfo.name = this.getOrgInfo().name;
      }

      let queryString = `OrgID=${this.orgId}&OrgName=${orgInfo.name}&OrgOnboardingComplete=${orgInfo.orgOnboardingStatus}`;

      this.http.post('https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/Dev/organization', queryString, {headers: headers})
      .toPromise()
      .then(response => {
        console.log('here is the response from lambda');
        console.log(response["_body"]);
        let tempBody = response["_body"].replace(/[{}]/g, "");
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