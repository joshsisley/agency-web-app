import { Component, OnInit, Input } from '@angular/core';
import { CampaignService } from '../../../../../service/campaign.service';

@Component({
  selector: 'campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {

  @Input() selectedCampaign: any;
  success: boolean = false;
  successMessage: string = '';
  saveInProgress: boolean = false;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
  }

  updateCampaign() {
    this.saveInProgress = true;
    // take the selectedCampaign and call update
    this.selectedCampaign.CampStatus = 'active';
    this.campaignService.updateCampaign(this.selectedCampaign).then((res) => {
      this.successMessage = 'Successfully updated the campaign';
      this.success = true;
      this.saveInProgress = false;
      setTimeout(() => {
        this.success = false;
        this.successMessage = '';
      }, 1700)
    });
  }

}
