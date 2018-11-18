import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'call-tracking',
  templateUrl: './call-tracking.component.html',
  styleUrls: ['./call-tracking.component.css']
})
export class CallTrackingComponent implements OnInit {

  @Input() loading: boolean;
  @Input() campaigns: any;
  @Input() selectedCampaign: any;
  addAccount: boolean = false;
  newIntegration: any;
  twilioAccounts = [];

  noAcctFoundObj = {
    status: false,
    msg: 'No Twilio account found. Add a new Twilio integration to your account below.'
  };

  constructor() { }

  ngOnInit() {
    if (!this.selectedCampaign) {
      this.selectedCampaign = this.campaigns[0];
    }
    console.log('here is the selected account');
    console.log(this.selectedCampaign);
    if (!this.selectedCampaign.TwilioCred || this.selectedCampaign.TwilioCred === 'null') {
      this.initNewIntegration();
    }
  }

  delete(account) {
    console.log('delete: ' + account);
    // TODO: make call to the server to remove this then remove from the UI
    let index = this.twilioAccounts.indexOf(account);
    this.twilioAccounts = this.twilioAccounts.slice(index, 0);
    if (this.twilioAccounts.length === 0) {
      this.initNewIntegration();
    }
  }

  save() {
    this.twilioAccounts.push(this.newIntegration.name);
    delete this.newIntegration;
    this.addAccount = false;
    this.noAcctFoundObj.status = false;
  }

  initNewIntegration() {
    this.newIntegration = {
      name: '',
      sid: '',
      token: ''
    }
    this.noAcctFoundObj.status = true;
    this.addAccount = true;
  }

  onCampaignChange() {

  }

}
