import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {UserRegistrationService} from "./service/user-registration.service";
import {UserParametersService} from "./service/user-parameters.service";
import {UserLoginService} from "./service/user-login.service";
import {CognitoUtil} from "./service/cognito.service";
import {routing} from "./app.routes";
import {AboutComponent, HomeComponent, HomeLandingComponent} from "./public/home.component";
import {AwsUtil} from "./service/aws.service";
import {UseractivityComponent} from "./secure/useractivity/useractivity.component";
import {MyProfileComponent} from "./secure/profile/myprofile.component";
import {SecureHomeComponent} from "./secure/landing/securehome.component";
import {JwtComponent} from "./secure/jwttokens/jwt.component";
import {DynamoDBService} from "./service/ddb.service";
import {LoginComponent} from "./public/auth/login/login.component";
import {RegisterComponent} from "./public/auth/register/registration.component";
import {ForgotPassword2Component, ForgotPasswordStep1Component} from "./public/auth/forgot/forgotPassword.component";
import {LogoutComponent, RegistrationConfirmationComponent} from "./public/auth/confirm/confirmRegistration.component";
import {ResendCodeComponent} from "./public/auth/resend/resendCode.component";
import {NewPasswordComponent} from "./public/auth/newpassword/newpassword.component";
import { MFAComponent } from './public/auth/mfa/mfa.component';
import { OrganizationService } from "./service/organization.service";
import { UserService } from "./service/user.service";
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { SetupComponent } from './secure/setup/setup.component';
import { AgencyComponent } from './secure/setup/components/agency/agency.component';
import { FirstCampaignComponent } from './secure/setup/components/campaign/campaign.component';
import { NavbarComponent } from "./secure/navbar/navbar.component";
import { SidebarComponent } from "./secure/sidebar/sidebar.component";
import { CampaignService } from "./service/campaign.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CampaignsComponent } from './secure/dashboard/components/campaigns/campaigns.component';
import { CampaignCreateComponent } from './secure/dashboard/components/campaign/campaign-create/campaign-create.component';
import { CampaignEditComponent } from './secure/dashboard/components/campaign/campaign-edit/campaign-edit.component';
import { CampaignDashboardComponent } from './secure/dashboard/components/campaign/campaign-dashboard/campaign-dashboard.component';
import { KeywordsComponent } from './secure/dashboard/components/campaign/keywords/keywords.component';
import { LocationProfileComponent } from './secure/dashboard/components/campaign/location-profile/location-profile.component';


@NgModule({
    declarations: [
        NewPasswordComponent,
        LoginComponent,
        LogoutComponent,
        RegistrationConfirmationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPassword2Component,
        RegisterComponent,
        MFAComponent,
        AboutComponent,
        HomeLandingComponent,
        HomeComponent,
        UseractivityComponent,
        MyProfileComponent,
        SecureHomeComponent,
        JwtComponent,
        AppComponent,
        DashboardComponent,
        SetupComponent,
        AgencyComponent,
        FirstCampaignComponent,
        NavbarComponent,
        SidebarComponent,
        CampaignsComponent,
        CampaignCreateComponent,
        CampaignEditComponent,
        CampaignDashboardComponent,
        KeywordsComponent,
        LocationProfileComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        NgbModule.forRoot()
    ],
    providers: [
        CognitoUtil,
        AwsUtil,
        DynamoDBService,
        UserRegistrationService,
        UserLoginService,
        UserParametersService,
        OrganizationService,
        UserService,
        CampaignService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
