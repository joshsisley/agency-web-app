import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";
import { OrganizationService } from "../../service/organization.service";
import { resolve } from "../../../../node_modules/@types/q";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './secureHome.html'
    // styleUrls: ['/assets/css/sb-admin.css']
})
export class SecureHomeComponent implements OnInit, LoggedInCallback {

    constructor(public router: Router, public userService: UserLoginService, public orgService: OrganizationService) {
        this.userService.isAuthenticated(this);
        console.log("SecureHomeComponent: constructor");
    }

    ngOnInit() {

    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            console.log('the user is logged in');
            this.getUserInfo().then((user) => {
                this.getOrgInfo(user).then((org) => {
                    console.log('here is the org');
                    console.log(org);
                });
            });
            // Make call to ge the User
            // this.orgService.getOrgById();
        }
    }

    getUserInfo() {
        var promise = new Promise((resolve,reject) => {
            // make call to get the user here
            // save user info locally
            // resolve with user
        });
        return promise;
    }

    getOrgInfo(user:any) {
        var promise = new Promise((resolve,reject) => {
            // make call to get the org using the user orgId param
            // resolve with org info
        });
        return promise;
    }
}

