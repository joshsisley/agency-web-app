import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../../../../../node_modules/rxjs';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import { CampaignService } from '../../../../../service/campaign.service';

@Component({
  selector: 'keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css']
})
export class KeywordsComponent implements OnInit {

  searchTextChanged = new Subject<string>();
  subscription:Observable<string>;
  targetLocation:string;
  locationDropdownList:any = [];
  suggestedKeywords:any = [];
  selectedLocation:any;
  showDropdown:boolean = false;

  constructor(private campaignService:CampaignService) { }

  ngOnInit() {
    this.subscription = this.searchTextChanged
    .debounceTime(400)
    .distinctUntilChanged()
    .mergeMap(search => this.getGoogleLocations())
    .subscribe(() => { });
  }

  getGoogleLocations() {
    console.log('this does get called');
    this.campaignService.findLocalBusiness(this.targetLocation).then((businessList) => {
      console.log('here is what is returned to the UI');
      this.locationDropdownList = businessList;
      this.showDropdown = true;
    });
  }

  search($event) {
    console.log($event);
    this.searchTextChanged.next($event.target.value);
  }

  getKeywords(location) {
    console.log('this gets called');
    this.showDropdown = false;
    this.selectedLocation = location;
    this.suggestedKeywords = ['pizza','grafton','wisconsin']
    // set the location
    // save to campaign?
    // call api to get the keywords passing in the location
    // display keywords in table below
    // return ['pizza','grafton','wisconsin'];
  }

}
