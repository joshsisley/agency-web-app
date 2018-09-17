import { Component, OnInit, Input } from '@angular/core';
import { CampaignService } from '../../../../../service/campaign.service';

declare const gapi: any;

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  auth2:any;

  @Input() selectedCampaign:any;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  getGoogleAccount() {
    this.campaignService.getGoogleReviews().then((response) => {
      console.log('here is the returned response');
      console.log(response);
    })
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '599335119509-g9m0qc3clu0sb1bcsgetdisc4mmcsro1.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE

        // TODO: Now need to store this info in the org or user profile????

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
