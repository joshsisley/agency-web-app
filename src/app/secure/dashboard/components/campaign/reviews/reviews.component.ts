import { Component, OnInit, Input } from '@angular/core';
import { CampaignService } from '../../../../../service/campaign.service';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() selectedCampaign:any;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    
  }

  getGoogleAccount() {
    this.campaignService.getGoogleReviews().then((response) => {
      console.log('here is the returned response');
      console.log(response);
    })
  }

}
