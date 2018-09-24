import { Component, OnInit, Input } from '@angular/core';
import { ReportsService } from '../../../../service/reports.service';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @Input() loading:boolean;
  @Input() campaigns:any;
  @Input() selectedCampaign:any;

  constructor(private reportService: ReportsService) { }

  ngOnInit() {
    console.log('here is the incoming selected campaign');
    console.log(this.selectedCampaign);
    if (!this.selectedCampaign && this.campaigns && this.campaigns.length > 0) {
      this.selectedCampaign = this.campaigns[0];
    }
    console.log('here is the default campaign');
    console.log(this.selectedCampaign);
    // Get the localstorage request date
    let requestDate = localStorage.getItem('reportRequestDate');
    console.log('here is the request date');
    console.log(requestDate);
    let timeSinceLastRequest;
    if (requestDate) {
      let today = new Date().getTime();
      timeSinceLastRequest = today - parseInt(requestDate);
    }
    console.log('time since last request');
    console.log(timeSinceLastRequest)


    // make call to get the overview report
    // check the local storage to see last time report was requested.
    if (!timeSinceLastRequest || timeSinceLastRequest >= 86400000) {
      this.reportService.getCampaignAudit(this.selectedCampaign.CampURL,this.selectedCampaign.CampID, 'get').then((response) => {
        console.log(response);
        let date = new Date().getTime();
        localStorage.setItem('reportRequestDate', date.toString());
      });
    }
    // } else {
    //   this.reportService.getCampaignAudit(this.selectedCampaign.CampURL,this.selectedCampaign.CampID, 'get').then((response) => {
    //     console.log(response);
    //     // let date = new Date().getTime();
    //     // localStorage.setItem('reportRequestDate', date.toString());
    //   });
    // }
  }

  get

}
