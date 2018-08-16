import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
import * as awsservice from "aws-sdk/lib/service";
import * as CognitoIdentity from "aws-sdk/clients/cognitoidentity";

@Injectable()
export class UserService {
  
  getUserByCognitoID(cognitoId) {
   
  }
}