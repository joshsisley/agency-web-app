import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";
import { OrganizationService } from "../../service/organization.service";
import { resolve } from "../../../../node_modules/@types/q";
import { UserService } from "../../service/user.service";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './secureHome.html'
    // styleUrls: ['/assets/css/sb-admin.css']
})
export class SecureHomeComponent implements OnInit, LoggedInCallback {

    loading:boolean = true;
    setupFlow:boolean = false;

    constructor(public router: Router, 
        public userLoginService: UserLoginService, 
        public orgService: OrganizationService,
        public userService: UserService) {
        this.userLoginService.isAuthenticated(this);
        console.log("SecureHomeComponent: constructor");
    }

    ngOnInit() {

    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            console.log('the user is logged in');
            this.userService.getUserByCognitoID().then((user) => {
                console.log('here is the user');
                console.log(user["Org"]);
                this.orgService.getOrgById(user["Org"]).then((org) => {
                    console.log('successfully receives the org');
                    console.log(org);
                    if (org["onboardingComplete"] && org["onboardingComplete"] === 'completed') {
                        this.router.navigate(['/securehome'])
                        this.loading = false;
                    } else if (org["onboardingComplete"] && org["onboardingComplete"] === 'campaign') {
                        console.log('it is set to campaign');
                        this.setupFlow = true;
                        this.router.navigate(['/securehome/setup/campaign'])
                        this.loading = false;
                    } else {
                        this.setupFlow = true;
                        this.router.navigate(['/securehome/setup'])
                        this.loading = false;
                    }
                })
            });
            // Make call to ge the User
            // this.orgService.getOrgById();
        }
    }
}

