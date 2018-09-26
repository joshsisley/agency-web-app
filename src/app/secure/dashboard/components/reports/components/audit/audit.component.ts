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
  selectedSection: string = "Errors";

  constructor() { }

  ngOnInit() {
    console.log(this.loading);
  }

  manageIssue() {
    // Ability for user to assign a task to someone to fix the issue
  }

}
