import { Component, OnInit, Input } from '@angular/core';
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

  @Input() selectedCampaign:any;
  searchTextChanged = new Subject<string>();
  subscription:Observable<string>;
  targetLocation:string;
  locationDropdownList:any = [];
  suggestedKeywords:any = [];
  selectedLocation:any;
  showDropdown:boolean = false;

  constructor(private campaignService:CampaignService) { }

  ngOnInit() {
    this.searchTextChanged
    .debounceTime(400)
    .distinctUntilChanged()
    .subscribe((search) => this.getGoogleLocations());
  }

  getGoogleLocations() {
    console.log('this does get called');
    this.campaignService.findLocalBusiness(this.targetLocation).then((businessList:Array<object>) => {
      console.log(businessList);
      if (businessList.length > 0) {
        this.locationDropdownList = businessList;
      } else {
        this.locationDropdownList = [{
          "name": "No Results Found",
          "address": ""
        }]
      }
      this.showDropdown = true;
    });
  }

  search($event) {
    console.log($event);
    this.searchTextChanged.next($event.target.value);
  }

  getKeywords(location) {
    this.showDropdown = false;
    this.selectedLocation = location;
    this.campaignService.getRankedKeywords(location, this.selectedCampaign).then((response) => {
      console.log('here is the response to the UI');
      console.log(response);
      if (response["status"] == "error") {
        console.log(`Error Code ${response["error"].code}: ${response["error"].message}`);
        // TODO: Temp work around while figuring out the keywords
        this.suggestedKeywords = [
        {
            "key": "serps rank checker",
            "exact_domain": "dataforseo.com",
            "country_code": "US",
            "language": "en",
            "position": 22,
            "url": "https://dataforseo.com/apis/serp-api",
            "relative_url": "/apis/serp-api",
            "results_count": 65400,
            "etv": 2,
            "traffic_cost": 16.75442,
            "competition": 0,
            "cpc": 8.37721,
            "date": "2018-03-16T00:00:00+00:00",
            "extra": "",
            "search_volume": 1000,
            "spell": "",
            "title": "SERP rank position checker API ⓴⓲ SERP analysis and keyword ...",
            "snippet": "DataForSEO ➤➤➤ SERP API ➤➤➤ Google SERP Rankings Checker API ✓✓✓ Great Speed, Clear Stats, Simple Pricing. Try for free now!"
        }]
        console.log(this.suggestedKeywords);
      } else {
        this.suggestedKeywords = response['results'].ranked;
      }
    });
    // set the location
    // save to campaign?
    // call api to get the keywords passing in the location
    // display keywords in table below
    // return ['pizza','grafton','wisconsin'];
  }

}
