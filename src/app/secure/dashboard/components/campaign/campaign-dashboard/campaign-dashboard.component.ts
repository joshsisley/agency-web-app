import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.css']
})
export class CampaignDashboardComponent implements OnInit {

  @Input() selectedCampaign:any;

  constructor() { }

  ngOnInit() {
  }

}
