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

    }
  }

  manageIssue() {
    // Ability for user to assign a task to someone to fix the issue
  }

  stripOutEntriesWithZeroIssues(issueArray) {
    let newIssueArray = [];
    for (let x in issueArray) {
      if (issueArray[x].value && issueArray[x].value > 0) {
        // Only return entries with value greater than 0
        newIssueArray.push(issueArray[x]);
      }
    }
    return newIssueArray;
  }

  changeSection(section) {
    this.selectedSection = section;
    this.selectedAudit[this.selectedSection] = this.stripOutEntriesWithZeroIssues(this.selectedAudit[this.selectedSection]);
    let totalString = "total" + section;
    this.totalIssues = this.selectedAudit[totalString];
  }

}
