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
  campAudits:any;
  selectedAudit:any;

  constructor(private reportService: ReportsService) { }

  ngOnInit() {
    console.log('here is the incoming selected campaign');
    console.log(this.selectedCampaign);
    if (!this.selectedCampaign && this.campaigns && this.campaigns.length > 0) {
      this.selectedCampaign = this.campaigns[0];
    }

    // Get stored audits
    this.campAudits = this.reportService.getLocalAudits();
    console.log(this.campAudits);

    // If stored audits aren't there, get latest audits from DB
    if (!this.campAudits) {
      this.reportService.getCampaignAudits(this.selectedCampaign.CampURL,this.selectedCampaign.CampID, 'get').then((auditResults) => {
        console.log(auditResults);
        this.campAudits = [];
        for (var x in auditResults) {
          this.campAudits.push(auditResults[x].Result.results[0]);
        }
        this.selectedAudit = this.campAudits[0];

        if (this.campAudits.length == 0) {
          // fetch the audit from dataforseo
        }

        console.log('here is the audit to display');
        console.log(this.selectedAudit);
        this.loading = false;
      });
    }
  }

  // Called when the user wants to refresh the dashboard for latest info
  getNewAudit() {
    // make call to get the audit from dataforseo
  }

}
