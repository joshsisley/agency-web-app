import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../service/organization.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  agency: any = {}

  constructor(private orgService: OrganizationService, private router: Router) { }

  ngOnInit() {

  }

  saveAgency() {
    this.agency.orgOnboardingStatus = 'campaign';
    this.orgService.updateOrg(this.agency).then(response => {
      if (response[1] == 'true') {
        this.router.navigate(['/dashboard/setup/campaign'])
        // route to campaign
      } else {
        console.log('there was an error');
      }
    });
  }

}
