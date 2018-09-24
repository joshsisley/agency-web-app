import { Component, OnInit, Input } from '@angular/core';
import { CampaignService } from '../../service/campaign.service';
import { OrganizationService } from '../../service/organization.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedTab:string = 'campaigns';
  isOrgOwner:boolean = false;
  campaigns:any;
  loading:boolean = true;
  selectedCampaign:any;

  constructor(private campaignService: CampaignService, private orgService: OrganizationService, private userService: UserService) { }

  ngOnInit() {
    // get the campaigns and info needed for the overview page
    let orgOwnerStatus = localStorage.getItem('orgOwner')
    if (orgOwnerStatus == 'true') {
      this.isOrgOwner = true;
    }

    if (this.isOrgOwner) {
      let orgId = this.orgService.getOrgId();
      this.campaignService.getCampaignsByOrgId(orgId).then((camps) => {
        this.campaigns = camps;
        console.log(this.campaigns);
        this.loading = false;
      });
      console.log('here are the campaigns');
      // this.campaigns = [{
      //   "address1": "123 Test Rd",
      //   "city": "Durham",
      //   "state": "NC",
      //   "name": "Test Campaign #1",
      //   "url": "www.testcampaign1.com",
      //   "zip": "27707",
      //   "phoneNumber": "(333) 444-3333"
      // }]
      console.log(this.campaigns);
    } else {
      let user = this.userService.getCurrentUser();
      this.campaigns = this.campaignService.getCampaignsByIds(user.CampaignIDs);
    }
  }

  setSelectedTab(tab) {
    this.selectedTab = tab;
  }

  updateDashboardCampaigns(event) {
    this.campaigns.push(event.newCampaign);
    console.log('here are the new campaigns');
    console.log(this.campaigns);
  }

  updateSelectedTab(event) {
    this.selectedTab = event.tab;
    this.selectedCampaign = event.campaign;
  }

}
