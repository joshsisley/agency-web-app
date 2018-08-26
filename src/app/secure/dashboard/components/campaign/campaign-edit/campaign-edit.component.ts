import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {

  @Input() selectedCampaign:any;

  constructor() { }

  ngOnInit() {
  }

  updateCampaign() {
    // take the selectedCampaign and call update
    console.log('here is the updated campaign');
    console.log(this.selectedCampaign);
  }

}
