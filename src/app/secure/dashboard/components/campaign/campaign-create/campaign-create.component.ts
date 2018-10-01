import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Campaign } from "../../../../../models/campaign";
import { Router } from "@angular/router";
import { CampaignService } from '../../../../../service/campaign.service';
import { ReportsService } from '../../../../../service/reports.service';

@Component({
  selector: 'campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})
export class CampaignCreateComponent implements OnInit {

  campaign: any = new Campaign();
  @Output() updateCampaigns: EventEmitter<Object> = new EventEmitter();

  constructor(private campaignService: CampaignService,
    private router: Router,
    private reportService: ReportsService) { }

  ngOnInit() {
  }

  saveCampaign() {
    this.campaign.CampStatus = 'setup';
    this.campaignService.createCampaign(this.campaign).then((res) => {
      console.log(res);
      let id = res[3];
      this.reportService.manageOnPage(this.campaign.CampURL, 'post', id).then((response) => {
        let parsedBody = JSON.parse(response["_body"]);
        let body = JSON.parse(parsedBody);
        let taskId = body.results[0]['task_id'];
        // set the localstorage item
        localStorage.setItem(`${this.campaign.CampURL}-taskId`, taskId);
        this.updateCampaigns.emit(this.campaign)
      });
    });
  }

}
