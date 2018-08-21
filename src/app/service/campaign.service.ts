import { Injectable } from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';
import { environment } from "../../environments/environment";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { UserService } from "../service/user.service";
import * as AWS from "aws-sdk";
import * as awsservice from "aws-sdk/lib/service";
import { CognitoCallback, CognitoUtil, LoggedInCallback } from "./cognito.service";
import { OrganizationService } from "./organization.service";

@Injectable()
export class CampaignService {

  orgId:string;
  
  constructor(public cognitoUtil: CognitoUtil, public http: Http, public orgService: OrganizationService) {}

  createCampaign(campaignInfo) {
    let orgId = this.orgService.getOrgId();
    console.log('here is the org id');
    console.log(orgId);
    var promise = new Promise((res,rej) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let queryString = `OrgID=${orgId}&CampURL=${campaignInfo.url}&CampStatus=active&CampName=${campaignInfo.name}`;

      this.http.post('https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/core-stage-v2/campaign', queryString, {headers: headers})
      .toPromise()
      .then(response => {
        console.log('here is the response from lambda');
        console.log(response["_body"]);
        let tempBody = response["_body"].replace(/[{}]/g, "");
        let responseArray = tempBody.split('=');
        res(responseArray);
      })
      .catch(err => {
        console.log('here is the error');
        console.log(err);
        rej(err);
      })
    });
    return promise;
  }

}