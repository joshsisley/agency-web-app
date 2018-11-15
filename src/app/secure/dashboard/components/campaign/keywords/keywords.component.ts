import { Component, OnInit, Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from '../../../../../../../node_modules/rxjs';
import { Observable } from "rxjs";
import { CampaignService } from '../../../../../service/campaign.service';
import { LocalDataService } from '../../../../../service/local-data.service';
import { _ } from 'underscore';

@Component({
  selector: 'keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css']
})
export class KeywordsComponent implements OnInit {

  @Input() selectedCampaign: any;
  searchTextChanged = new Subject<string>();
  subscription: Observable<string>;
  targetLocation: string;
  success: boolean = false;
  successMessage: string = '';
  locationDropdownList: any = [];
  suggestedKeywords: any = [];
  selectedKeywords: any = [];
  removedKeywords: any = [];
  otherKeywords: string;
  selectedLocation: any;
  showDropdown: boolean = false;
  saveInProgress: boolean = false;

  constructor(private campaignService: CampaignService, private dataService: LocalDataService) { }

  ngOnInit() {
    // Set the target location if it exists
    if (this.selectedCampaign.CampTargetLocationName || this.selectedCampaign.CampTargetLocationAddress) {
      this.selectedLocation = {
        name: this.selectedCampaign.CampTargetLocationName,
        address: this.selectedCampaign.CampTargetLocationAddress
      }
    }

    this.searchTextChanged
      .pipe(debounceTime(300))
      .subscribe((search) => this.getGoogleLocations());
  }

  getGoogleLocations() {
    this.campaignService.findLocalBusiness(this.targetLocation).then((businessList: Array<object>) => {
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
    this.searchTextChanged.next($event.target.value);
  }

  getKeywords(keyLocation) {
    this.showDropdown = false;
    this.selectedLocation = keyLocation;
    if (location.hostname === 'localhost') {
      this.suggestedKeywords = this.dataService.getRankedKeywords();
    } else {
      this.campaignService.getRankedKeywords(keyLocation, this.selectedCampaign).then((response) => {
        if (response["status"] == "error") {
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
        this.selectedKeywords.push(keywordArray[x].trim());
      }
    }
  }

  save() {
    this.saveInProgress = true;
    // save the selected location and list of keywords to the campaign.
    this.parseOtherKeywords();
    if (!this.selectedCampaign.CampKeywords) {
      this.selectedCampaign.CampKeywords = this.selectedKeywords;
    }
    this.selectedCampaign.CampStatus = 'active';
    this.selectedCampaign.CampTargetLocationName = this.selectedLocation.name;
    this.selectedCampaign.CampTargetLocationAddress = this.selectedLocation.address;
    this.campaignService.updateCampaign(this.selectedCampaign).then((updatedCampaign) => {
      this.selectedCampaign = updatedCampaign;
      this.successMessage = 'Successfully updated the campaign';
      this.suggestedKeywords = [];
      this.success = true;
      this.saveInProgress = false;
      setTimeout(() => {
        this.success = false;
        this.successMessage = '';
      }, 1700)
    });
  }

  removeKeyword(keyword) {
    // Show UI confirm to remove the keyword
    // mark the keyword as removed and show msg for user to save changes
    let index = this.selectedCampaign.CampKeywords.indexOf(keyword);
    this.selectedCampaign.CampKeywords.splice(index, 1);
    this.removedKeywords.push(keyword);
  }

  undoRemoveKeyword(keyword) {
    this.selectedCampaign.CampKeywords.push(keyword);
    this.removedKeywords = _.without(this.removedKeywords, keyword);

  }

}
