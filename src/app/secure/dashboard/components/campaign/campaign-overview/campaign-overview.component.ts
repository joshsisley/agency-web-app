import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'campaign-overview',
  templateUrl: './campaign-overview.component.html',
  styleUrls: ['./campaign-overview.component.css']
})
export class CampaignOverviewComponent implements OnInit {

  @Input() selectedCampaign:any;

  constructor() { }

  ngOnInit() {
  }

  goToReports() {
    // pass in the selectedCampaign to auto select from dropdown
    // then navigate to other component
  }

}
