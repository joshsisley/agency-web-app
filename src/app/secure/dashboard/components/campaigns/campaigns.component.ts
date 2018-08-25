import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  @Input() campaigns:any;
  showCreateCampaign:boolean = false;
  showEditCampaign:boolean = false;
  selectedCampaign:any;

  constructor() { }

  ngOnInit() {
  }

  editCampaign(campaign) {
    this.selectedCampaign = campaign;
    this.showEditCampaign = true;
  }

}
