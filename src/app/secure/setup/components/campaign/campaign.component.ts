import { Component, OnInit} from '@angular/core';
import { CampaignService } from '../../../../service/campaign.service';
import {Router} from "@angular/router";
import { OrganizationService } from '../../../../service/organization.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class FirstCampaignComponent implements OnInit {

  campaign:any = {};

  constructor(private campaignService: CampaignService, private router:Router, private orgService:OrganizationService) { }

  ngOnInit() {
  }

  saveCampaign() {
    console.log(this.campaign);
    this.campaign.status = "active";
    this.campaignService.createCampaign(this.campaign).then((res) => {
      if (res[1] == 'true') {
        // make call to update org status
        // update the var that sets whether you can see the sidenave
        console.log('it gets to here');
        this.orgService.updateOrg({'orgOnboardingStatus':'completed'});
        this.router.navigate(['/securehome']);
      } else {
        console.log('there was an error');
      }
    });
  }

}
