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

  selectedTab = 'campaigns';
  isOrgOwner = false;
  campaigns: any;
  loading = true;
  selectedCampaign: any;

  constructor(private campaignService: CampaignService, private orgService: OrganizationService, private userService: UserService) { }

  ngOnInit() {
    // get the campaigns and info needed for the overview page
    let orgOwnerStatus = localStorage.getItem('orgOwner')
    if (orgOwnerStatus === 'true') {
      this.isOrgOwner = true;
    }

    if (this.isOrgOwner) {
      let orgId = this.orgService.getOrgId();
      this.campaignService.getCampaignsByOrgId(orgId).then((camps) => {
        this.campaigns = camps;
        this.loading = false;
      });
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
  }

  updateSelectedTab(event) {
    this.selectedTab = event.tab;
    this.selectedCampaign = event.campaign;
  }

}
