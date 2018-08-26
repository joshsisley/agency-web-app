import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Campaign } from "../../../../models/campaign";
import {Router} from "@angular/router";
import { CampaignService } from '../../../../service/campaign.service';

@Component({
  selector: 'campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})
export class CampaignCreateComponent implements OnInit {

  campaign:any = new Campaign();
  @Output() updateCampaigns:EventEmitter<Object> = new EventEmitter();

  constructor(private campaignService: CampaignService, private router: Router) { }

  ngOnInit() {
  }

  saveCampaign() {
    this.campaignService.createCampaign(this.campaign).then((res) => {
      console.log(res);
      this.updateCampaigns.emit(this.campaign)
    });
  }

}
