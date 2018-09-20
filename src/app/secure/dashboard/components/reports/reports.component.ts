import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @Input() loading:boolean;
  @Input() campaigns:any;
  selectedCampaign:any;

  constructor() { }

  ngOnInit() {
    if (!this.selectedCampaign && this.campaigns && this.campaigns.length > 0) {
      this.selectedCampaign = this.campaigns[0];
    }
    console.log('here is the default campaign');
    console.log(this.selectedCampaign);
    // make call to get the overview report
    
  }

  get

}
