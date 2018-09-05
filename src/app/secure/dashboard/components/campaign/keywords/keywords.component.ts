import { Component, OnInit, Input } from '@angular/core';
import { Subject } from '../../../../../../../node_modules/rxjs';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import { CampaignService } from '../../../../../service/campaign.service';
import { LocalDataService } from '../../../../../service/local-data.service';
import { _ } from 'underscore';

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
  selectedKeywords:any = [];
  otherKeywords:string;
  selectedLocation:any;
  showDropdown:boolean = false;

  constructor(private campaignService:CampaignService, private dataService: LocalDataService) { }

  ngOnInit() {
    this.searchTextChanged
    .debounceTime(300)
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

  getKeywords(keyLocation) {
    this.showDropdown = false;
    this.selectedLocation = keyLocation;
    console.log(location.hostname);
    if (location.hostname === 'localhost') {
      this.suggestedKeywords = this.dataService.getRankedKeywords();
    } else {
      this.campaignService.getRankedKeywords(keyLocation, this.selectedCampaign).then((response) => {
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
        } else {
          this.suggestedKeywords = response['results'][0].ranked;
          console.log('here are the ranked keywords');
          console.log(this.suggestedKeywords);
        }
      });
    }
    // set the location
    // save to campaign?
    // call api to get the keywords passing in the location
    // display keywords in table below
    // return ['pizza','grafton','wisconsin'];
  }

  handleSelected(keyword) {
    let index = this.selectedKeywords.indexOf(keyword.key);
    if (index > -1) {
      this.selectedKeywords.splice(index, 1);
    } else {
      this.selectedKeywords.push(keyword.key);
    }
  }

  parseOtherKeywords() {
    // Format the string of other keywords into an array and add to the end of the selected keywords
    if (this.otherKeywords) {
      let keywordArray = this.otherKeywords.split(',');
      for (var x in keywordArray) {
        console.log(keywordArray[x].trim());
        this.selectedKeywords.push(keywordArray[x].trim());
      }
    }
  }

  save() {
    // save the selected location and list of keywords to the campaign.
    this.parseOtherKeywords();
    console.log('selected keywords');
    console.log(this.selectedKeywords);
  }

}
