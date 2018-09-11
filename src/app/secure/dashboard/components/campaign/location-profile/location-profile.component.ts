import { Component, OnInit, Input } from '@angular/core';
import { CampaignService } from '../../../../../service/campaign.service';

@Component({
  selector: 'location-profile',
  templateUrl: './location-profile.component.html',
  styleUrls: ['./location-profile.component.css']
})
export class LocationProfileComponent implements OnInit {

  @Input() selectedCampaign:any;
  success:boolean = false;
  successMessage:string = '';
  hoursMap:any = [
    {
      name: 'Sunday',
      status: 'Closed',
      openTime: '',
      closeTime: ''
    },
    {
      name: 'Monday',
      status: 'Closed',
      openTime: '',
      closeTime: ''
    },
    {
      name: 'Tuesday',
      status: 'Closed',
      openTime: '',
      closeTime: ''
    },
    {
      name: 'Wednesday',
      status: 'Closed',
      openTime: '',
      closeTime: ''
    },
    {
      name: 'Thursday',
      status: 'Closed',
      openTime: '',
      closeTime: ''
    },
    {
      name: 'Friday',
      status: 'Closed',
      openTime: '',
      closeTime: ''
    },
    {
      name: 'Saturday',
      status: 'Closed',
      openTime: '',
      closeTime: ''
    }
  ]

  timeMask:any = [/[0-1]/, /(1[0-2]|0?[1-9])/,':',/[0-5]/,/[0-9]/, ' ',/[AaPp]/,/[Mm]/]

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    console.log(this.selectedCampaign);
    console.log(this.selectedCampaign.CampHours);
    if (this.selectedCampaign.CampHours && this.selectedCampaign.CampHours.length > 0 && this.selectedCampaign.CampHours != 'null') {
      console.log('it still somehow gets inside')
      this.hoursMap = this.selectedCampaign.CampHours;
    }
  }

  saveCampaign() {
    console.log('here are the times');
    console.log(this.hoursMap);
    this.selectedCampaign.CampHours = this.hoursMap;
    this.campaignService.updateCampaign(this.selectedCampaign).then((camp) => {
      console.log('here is the updated campaign');
      console.log(camp);
      this.successMessage = 'Successfully updated the campaign';
      this.success = true;
      setTimeout(() => {
        this.success = false;
        this.successMessage = '';
      }, 1700)
    })
  }

}
