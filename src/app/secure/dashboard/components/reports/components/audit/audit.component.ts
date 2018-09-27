import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'audit-report',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  @Input() selectedCampaign: any;
  @Input() selectedAudit: any;
  @Input() loading: boolean;
  @Input() campAudits: any;
  selectedSection: string = "Errors";
  totalIssues: any;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.loading && !changes.currentValue && this.selectedAudit) {
      this.totalIssues = this.selectedAudit.totalErrors;
    }
    if (changes.selectedCampaign && !changes.selectedCampaign.firstChange) {
      console.log('the selected campaign has changed');
      console.log(changes);
      console.log(this.selectedCampaign);
    }
  }

  manageIssue() {
    // Ability for user to assign a task to someone to fix the issue
  }

  stripOutEntriesWithZeroIssues(issueArray) {
    for (var x in issueArray) {
      if (!issueArray[x].value || issueArray[x].value === 0) {
        // strip out this entry from the array
        issueArray.splice(x, 1);
      }
    }
    return issueArray;
  }

  changeSection(section) {
    this.selectedSection = section;
    this.selectedAudit[this.selectedSection] = this.stripOutEntriesWithZeroIssues(this.selectedAudit[this.selectedSection]);
    let totalString = "total" + section;
    this.totalIssues = this.selectedAudit[totalString];
  }

}
