import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../service/organization.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  agency:any = {}

  constructor(private orgService: OrganizationService) { }

  ngOnInit() {

  }

  saveAgency() {
    console.log(this.agency);
    this.agency.orgOnboardingStatus = 'campaign';
    this.orgService.updateOrg(this.agency).then(response => {
      console.log(response);
      if (response[1] == 'true') {
        // route to campaign
      } else {
        console.log('there was an error');
      }
    });
  }

}
