import { Component, OnInit, Input } from '@angular/core';
import { CampaignService } from '../../../../../service/campaign.service';

@Component({
  selector: 'campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {

  @Input() selectedCampaign:any;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
  }

  updateCampaign() {
    // take the selectedCampaign and call update
    console.log('here is the updated campaign');
    console.log(this.selectedCampaign);
    this.campaignService.updateCampaign(this.selectedCampaign);
  }

}
