import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";
import { OrganizationService } from "../../service/organization.service";
import { resolve } from "../../../../node_modules/@types/q";
import { UserService } from "../../service/user.service";
import { CampaignService } from "../../service/campaign.service";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './secureHome.html'
    // styleUrls: ['/assets/css/sb-admin.css']
})
export class SecureHomeComponent implements OnInit, LoggedInCallback {

    loading:boolean = true;
    setupFlow:string = 'completed';
    campaigns:any;

    constructor(public router: Router, 
        public userLoginService: UserLoginService, 
        public orgService: OrganizationService,
        public userService: UserService,
        public campaignService: CampaignService) {
        this.userLoginService.isAuthenticated(this);
        console.log("SecureHomeComponent: constructor");
    }

    ngOnInit() {

    }

    updateTab(tab) {
        console.log('here is the new tab');
        console.log(tab);
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            console.log('the user is logged in');
            this.userService.getUserByCognitoID().then((user) => {
                console.log('here is the user');
                console.log(user);
                this.orgService.getOrgById(user["Org"]).then((org) => {
                    console.log('successfully receives the org');
                    console.log(org);
                    if (user.CognitoID === org.owner) {
                        localStorage.setItem('orgOwner', 'true');
                        // Check the org setup flow since user is the owner
                        if (org["onboardingComplete"] && org["onboardingComplete"] === 'completed') {
                            this.setupFlow = 'completed';
                            this.router.navigate(['/securehome'])
                            this.loading = false;
                        } else if (org["onboardingComplete"] && org["onboardingComplete"] === 'campaign') {
                            console.log('it is set to campaign');
                            this.setupFlow = 'campaign';
                            this.router.navigate(['/securehome/setup/campaign'])
                            this.loading = false;
                        } else {
                            this.setupFlow = 'agency';
                            this.router.navigate(['/securehome/setup'])
                            this.loading = false;
                        }
                    } else {
                        localStorage.setItem('orgOwner', 'false');
                        this.router.navigate(['/securehome']);
                    }
                })
            });
            // Make call to ge the User
            // this.orgService.getOrgById();
        }
    }
}

