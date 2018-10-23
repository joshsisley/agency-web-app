import { Component, OnInit, Input, NgZone } from '@angular/core';
import { CampaignService } from '../../../../../service/campaign.service';

declare const gapi: any;

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  tempReviews: any = [
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

  auth2: any;
  step: string = 'auth';
  reviews: any;
  averageRating: any;
  totalReviewCount: number;
  locationList: any;
  showLocationList: boolean = false;
  availableLocations: any = [];
  selectedLocations: any = [];

  @Input() selectedCampaign: any;

  constructor(private campaignService: CampaignService, private zone: NgZone) { }

  ngOnInit() {
    // check token expiration
    // if token is good, make call to get reviews
    // if not, reauth the user
    let refreshToken = this.selectedCampaign.CampRefreshToken;
    if (refreshToken && refreshToken != 'null') {
      let cookie = this.getCookie(`${this.selectedCampaign.CampName}-reviewTimeout`);
      if (cookie) {
        // Set the results to stored list
        this.locationList = JSON.parse(localStorage.getItem(`${this.selectedCampaign.CampName}-locationList`));
        this.step = 'reviews';
      } else {
        // Get the reviews again
      }
      // show the reviews
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

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '118306580572-fjshggl9vgomhsj2edmf8gri4vujfp1m.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        access_type: 'offline',
        scope: 'profile email https://www.googleapis.com/auth/plus.business.manage'
      });
      if (this.locationList && this.locationList.length === 0) {
        this.attachSignin(document.getElementById('googleBtnReDo'));
      } else {
        this.attachSignin(document.getElementById('googleBtn'));
      }
    });
  }

  attachSignin(element) {
    let self = this;
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        // TODO: Handle automatic sign in for google user without popup
        this.selectedCampaign.CampRefreshToken = googleUser.getAuthResponse().id_token;
        this.selectedCampaign.CampTokenTimeOut = googleUser.getAuthResponse().expires_at;
        this.campaignService.updateCampaign(this.selectedCampaign).then((response) => {
          this.campaignService.getGoogleLocations(googleUser.getAuthResponse().access_token).then((response) => {
            // prompt user to select locations
            self.showLocationList = true;
            self.availableLocations = response;
            this.zone.run(() => {
              this.step = 'locations';
            })
            // self.locationList = response;
            // // Save list to storage and create cookie
            // localStorage.setItem(`${this.selectedCampaign.CampName}-locationList`, JSON.stringify(response));
            // this.setCookie(`${this.selectedCampaign.CampName}-reviewTimeout`, 'reviewTimeout');
          })
          // now make the calls to get the reviews using the access token
        })

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  handleSelected(location) {
    let name = location.name;
    let index = this.selectedLocations.indexOf(name);
    if (index >= 0) {
      this.selectedLocations.splice(index, 1);
    } else {
      this.selectedLocations.push(name);
    }
  }

  getGoogleReviews() {
    let token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
    this.campaignService.getGoogleReviews(token, this.selectedLocations).then((response) => {

    })
  }

  successCallback = function (data) {
    // this.changeDetectorRef.detectChanges();
    this.step = 'reviews';
  }

  setCookie(name, value) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

}
