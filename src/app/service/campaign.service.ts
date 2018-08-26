import { Injectable } from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';
import { environment } from "../../environments/environment";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { UserService } from "../service/user.service";
import * as AWS from "aws-sdk";
import * as awsservice from "aws-sdk/lib/service";
import { CognitoCallback, CognitoUtil, LoggedInCallback } from "./cognito.service";
import { OrganizationService } from "./organization.service";
import { Campaign } from "../models/campaign";

@Injectable()
export class CampaignService {

  orgId:string;
  campaigns:any = [];
  
  constructor(public cognitoUtil: CognitoUtil, public http: Http, public orgService: OrganizationService) {}

  private buildQueryString(campObj, orgId) {
    let tempQueryString = `OrgID=${orgId}&CampStatus=active`;
    for (var key in campObj) {
      console.log(key);
      tempQueryString += `&${key}=${campObj[key]}`;
    }
    return tempQueryString;
  }

  getCampaignsByIds(ids) {
    if (!this.campaigns) {
      // Loop through the ids and grab the campaigns
    } else {
      return this.campaigns;
    }
  }

  formatCampaign(awsCampaign) {
    let campaign = new Campaign();
    for (var key in awsCampaign) {
      campaign[key] = awsCampaign[key];
    }
    return campaign;
  }

  getCampaignsByOrgId(orgId) {
    console.log('get campaigns by ord id is called');
    console.log(orgId);
    // If the campaigns don't exist, go fetch them
    var promise = new Promise((res,rej) => {
      if (!this.campaigns || this.campaigns.length == 0) {
        // make call to get campaigns from aws by orgId
        // save campaigns to the service
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
    
          let queryString = `?OrgID=${orgId}`;
    
          this.http.get(`https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/campaign-stage/campaign${queryString}`, {headers: headers})
          .toPromise()
          .then(response => {
            let campaignArray = [];
            let campaignObj = JSON.parse(response['_body']);
            let campaigns = campaignObj.Campaign;
            for (var x in campaigns) {
              campaignArray.push(this.formatCampaign(campaigns[x]));
            }
            res(campaignArray);
          })
          .catch(err => {
            console.log('here is the error');
            console.log(err);
            rej(err);
          })
      } else {
        res(this.campaigns);
      }
    });
    return promise;
  }

  deleteCampaign(campId) {

  }

  updateCampaign(campaignInfo) {
    let orgId = this.orgService.getOrgId();
    console.log('here is the org id');
    console.log(orgId);
    var promise = new Promise((res,rej) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let queryString = this.buildQueryString(campaignInfo, orgId);
    });
    return promise;
  }

  createCampaign(newCampaign) {
    let orgId = this.orgService.getOrgId();
    console.log('here is the org id');
    console.log(orgId);
    var promise = new Promise((res,rej) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let queryString = this.buildQueryString(newCampaign, orgId);

      this.http.post('https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/core-stage-v2/campaign', queryString, {headers: headers})
      .toPromise()
      .then(response => {
        this.campaigns.push(newCampaign);
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