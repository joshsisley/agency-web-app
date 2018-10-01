import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../../../service/campaign.service';
import { Router } from "@angular/router";
import { OrganizationService } from '../../../../service/organization.service';
import { ReportsService } from '../../../../service/reports.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class FirstCampaignComponent implements OnInit {

  campaign: any = {};

  constructor(private campaignService: CampaignService,
    private router: Router,
    private orgService: OrganizationService,
    private reportService: ReportsService) { }

  ngOnInit() {
  }

  saveCampaign() {
    console.log(this.campaign);
    this.campaign.status = "active";
    this.campaignService.createCampaign(this.campaign).then((res) => {
      if (res[1] == 'true') {
        let id = res[3];
        // make call to update org status
        // update the var that sets whether you can see the sidenave
        console.log('it gets to here');
        this.orgService.updateOrg({ 'orgOnboardingStatus': 'completed' });
        // Make call to post onPage for the new url
        this.reportService.manageOnPage(this.campaign.CampURL, 'post', id).then((response) => {
          let parsedBody = JSON.parse(response["_body"]);
          let body = JSON.parse(parsedBody)
          let taskId = body.results[0]['task_id'];
          console.log('here is that task id');
          console.log(taskId);
          // set the localstorage item
          localStorage.setItem(`${this.campaign.CampURL}-taskId`, taskId);
          this.router.navigate(['/dashboard']);
        })
      } else {
        console.log('there was an error');
      }
    });
  }

}
