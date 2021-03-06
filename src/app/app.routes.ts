import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AboutComponent, HomeComponent, HomeLandingComponent} from "./public/home.component";
import {SecureHomeComponent} from "./secure/landing/securehome.component";
import {MyProfileComponent} from "./secure/profile/myprofile.component";
import {JwtComponent} from "./secure/jwttokens/jwt.component";
import {UseractivityComponent} from "./secure/useractivity/useractivity.component";
import {LoginComponent} from "./public/auth/login/login.component";
import {RegisterComponent} from "./public/auth/register/registration.component";
import {ForgotPassword2Component, ForgotPasswordStep1Component} from "./public/auth/forgot/forgotPassword.component";
import {LogoutComponent, RegistrationConfirmationComponent} from "./public/auth/confirm/confirmRegistration.component";
import {ResendCodeComponent} from "./public/auth/resend/resendCode.component";
import {NewPasswordComponent} from "./public/auth/newpassword/newpassword.component";
import { DashboardComponent } from "./secure/dashboard/dashboard.component";
import { SetupComponent } from "./secure/setup/setup.component";
import { AgencyComponent } from "./secure/setup/components/agency/agency.component";
import { FirstCampaignComponent } from "./secure/setup/components/campaign/campaign.component";
import { ReportsComponent } from "./secure/dashboard/components/reports/reports.component";

const homeRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home/login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {path: 'about', component: AboutComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'confirmRegistration/:username', component: RegistrationConfirmationComponent},
            {path: 'resendCode', component: ResendCodeComponent},
            {path: 'forgotPassword/:email', component: ForgotPassword2Component},
            {path: 'forgotPassword', component: ForgotPasswordStep1Component},
            {path: 'newPassword', component: NewPasswordComponent},
            {path: '', component: HomeComponent}
        ]
    },
];

const secureHomeRoutes: Routes = [
    {

        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard', component: SecureHomeComponent, children: [
        {path: 'logout', component: LogoutComponent},
        {path: 'jwttokens', component: JwtComponent},
        {path: 'myprofile', component: MyProfileComponent},
        {path: 'useractivity', component: UseractivityComponent},
        {path: 'setup', component: SetupComponent, children: [
            {path: '', component: AgencyComponent},
            {path: 'campaign', component: FirstCampaignComponent}
        ]},
        {path: 'reports', component: ReportsComponent},
        {path: '', component: DashboardComponent}]
    }
];

const routes: Routes = [
    {
        path: '',
        children: [
            ...homeRoutes,
            ...secureHomeRoutes,
            {
                path: '',
                component: HomeComponent
            }
        ]
    },


];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
