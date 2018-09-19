import { Component, OnInit, Input } from '@angular/core';
import { CampaignService } from '../../../../../service/campaign.service';

declare const gapi: any;

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  tempReviews:any = [
    {
      "name": '',
      "reviewId": '',
      "reviewer": {
        "profilePhotoUrl": "",
        "displayName": "awesomeSauce1",
        "isAnonymous": false
      },
      "starRating": 3,
      "comment": 'The service was ok. I wish this website would actually work already though.',
      "createTime": '2018-09-02T15:01:23.045123456Z',
      "updateTime": '2018-09-02T15:01:23.045123456Z',
      "reviewReply": {
        "comment": '',
        "updateTime": ''
      }
    },
    {
      "name": '',
      "reviewId": '',
      "reviewer": {
        "profilePhotoUrl": "",
        "displayName": "positivelyAwesome",
        "isAnonymous": false
      },
      "starRating": 5,
      "comment": 'The service was amazing. I would definitely come back to this place again and again. Will tell all of my friends to come! I hope this review is not too long for this!',
      "createTime": '2018-06-02T15:01:23.045123456Z',
      "updateTime": '2018-06-02T15:01:23.045123456Z',
      "reviewReply": {
        "comment": '',
        "updateTime": ''
      }
    },
    {
      "name": '',
      "reviewId": '',
      "reviewer": {
        "profilePhotoUrl": "",
        "displayName": "awesomeSauce1",
        "isAnonymous": false
      },
      "starRating": 5,
      "comment": 'The service was ok. I wish this website would actually work already though.',
      "createTime": '2014-10-02T15:01:23.045123456Z',
      "updateTime": '2014-10-02T15:01:23.045123456Z',
      "reviewReply": {
        "comment": '',
        "updateTime": ''
      }
    }
  ]

  auth2:any;
  step:string = 'auth';
  reviews:any;
  averageRating:any;
  totalReviewCount:number;

  @Input() selectedCampaign:any;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    // check token expiration
    // if token is good, make call to get reviews
    // if not, reauth the user
    let refreshToken = this.selectedCampaign.CampRefreshToken;
    if (refreshToken) {
      // show the reviews
      this.step = 'reviews';
      // TODO: Change this to go and grab the latest reviews on page load
      this.reviews = this.tempReviews;
      this.averageRating = 4.5;
      this.totalReviewCount = 3;
    } else {
      // reauth the user
    }
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  // getGoogleAccount() {
  //   this.campaignService.getGoogleReviews('ya29.GlwdBnJMQOh2WIYHwS3hK49LcMUAwbOVIQqvV8gHZ2S0Y2imdss4R2fwVtwvcVU9dvvgszs3TabQpwz4lcLyIjbfT6EbVN719jHL4ZsVw0YrjwB58vv8W0Br_C048g').then((response) => {
  //     console.log('here is the returned response');
  //     console.log(response);
  //   })
  // }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '599335119509-unfh985atjiepr1js16spg23r0m07m63.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email https://www.googleapis.com/auth/plus.business.manage'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        //YOUR CODE HERE
        console.log(googleUser);
        // TODO: Now need to store this info in the org or user profile????
        // make call to update campaign with access token and expiration
        // Then, make call to get the reviews using the new access_token
        this.selectedCampaign.CampRefreshToken = googleUser.getAuthResponse().id_token;
        this.selectedCampaign.CampTokenTimeOut = googleUser.getAuthResponse().expires_at;
        this.campaignService.updateCampaign(this.selectedCampaign).then((response) => {
          console.log('here is the returned camp');
          console.log(response);
          this.campaignService.getGoogleReviews(googleUser.getAuthResponse().access_token).then((response) => {
            console.log('here is the response from GMB');
            console.log(response);
            // TODO: Fix this to return correctly. Right now it looks like we need to setup a whitelist business
            // in order to get access to the API. We would then use the client id from that above.
            this.step = 'reviews';
            this.averageRating = 4.5;
            this.totalReviewCount = 3;
            this.reviews = this.tempReviews;
          })
          // now make the calls to get the reviews using the access token
        })

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}