import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  @Input() campaigns:any;
  @Input() loading:boolean;
  showCreateCampaign:boolean = false;
  showEditCampaign:boolean = false;
  selectedCampaign:any;
  updateDashboardCampaignList:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  editCampaign(campaign) {
    this.selectedCampaign = campaign;
    this.showEditCampaign = true;
  }

  updateCampaignList(event) {
    console.log('this gets called to update the list');
    this.campaigns.push(event);
    this.backToCampaigns();
  }

  backToCampaigns() {
    this.showCreateCampaign = false;
    this.showEditCampaign = false;
  }

}
