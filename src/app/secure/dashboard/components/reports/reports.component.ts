import { Component, OnInit, Input } from '@angular/core';
import { ReportsService } from '../../../../service/reports.service';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @Input() loading: boolean;
  @Input() campaigns: any;
  @Input() selectedCampaign: any;
  campAudits: any;
  selectedAudit: any;
  reportTypes = ['Website Audit'];
  selectedReport = 'Website Audit';

  constructor(private reportService: ReportsService) { }

  ngOnInit() {
    this.loading = true;
    if (!this.selectedCampaign && this.campaigns && this.campaigns.length > 0) {
      this.selectedCampaign = this.campaigns[0];
    }

    // Get stored audits
    this.campAudits = this.reportService.getLocalAudits();

    // If stored audits aren't there, get latest audits from DB
    if (!this.campAudits) {
      this.getAudits();
    }
  }

  onCampaignChange() {
    this.loading = true;
    this.getAudits();
  }

  onReportChange() {

  }

  getAudits() {
    this.reportService.getCampaignAudits(this.selectedCampaign.CampURL, this.selectedCampaign.CampID, 'get').then((auditResults) => {
      this.campAudits = [];
      for (var x in auditResults) {
        this.campAudits.push(auditResults[x].Result.results[0]);
      }
      this.selectedAudit = this.campAudits[0];
      this.selectedAudit = this.mapAudit(this.selectedAudit);

      if (this.campAudits.length == 0) {
        // fetch the audit from dataforseo
        let taskId = localStorage.getItem(`${this.selectedCampaign.CampURL}-taskId`);
        if (taskId) {
          this.reportService.manageOnPage(this.selectedCampaign.CampURL, 'get', this.selectedCampaign.CampID).then((res) => {
            // check for success
            this.reportService.getCampaignAudits(this.selectedCampaign.CampURL, this.selectedCampaign.CampID, 'get').then((results) => {
              for (var x in results) {
                this.campAudits.push(results[x].Result.results[0]);
              }
              this.selectedAudit = this.campAudits[0];
              this.selectedAudit = this.mapAudit(this.selectedAudit);

              // Clear taskId from localStorage
              localStorage.removeItem(`${this.selectedCampaign.CampURL}-taskId`);
            });
          })
        }
      }
      this.loading = false;
    });
  }

  // Takes an audit and maps it out to how the UI needs it in order to display
  mapAudit(audit) {
    let auditMap = {
      campaign: this.selectedCampaign.CampName,
      totalErrors: 0,
      totalWarnings: 0,
      totalNotices: 0,
      ErrorsMap: {
        duplicate_pages: {
          title: 'Duplicate Pages'
        },
        duplicate_meta_tags: {
          title: 'Duplicate Meta Tags'
        },
        duplicate_meta_descriptions: {
          title: 'Duplicate Meta Descriptions'
        },
        duplicate_titles: {
          title: 'Duplicate Titles'
        },
        links_broken: {
          value: '',
          title: 'Links Broken'
        },
        pages_broken: {
          value: '',
          title: 'Pages Broken'
        },
        pages_invalid_size: {
          value: '',
          title: 'Pages Invalid Size'
        },
        pages_with_lorem_ipsum: {
          value: '',
          title: 'Pages with lorem ipsum'
        },
        response_code_4xx: {
          value: '',
          title: 'Response Code 4xx'
        },
        response_code_5xx: {
          value: '',
          title: 'Response Code 5xx'
        },
        title_duplicate_tag: {
          value: '',
          title: 'Duplicate Title Tag'
        },
        title_empty: {
          value: '',
          title: 'Empty Title'
        },
        title_inappropriate: {
          value: '',
          title: 'Inappropriate Title'
        }
      },
      WarningsMap: {
        absent_doctype: {
          value: '',
          title: 'Missing Doctype'
        },
        absent_encoding_meta_tag: {
          value: '',
          title: 'Absent Encoding Meta Tag'
        },
        deprecated_html_tags: {
          value: '',
          title: 'Deprecated HTML Tags'
        },
        images_invalid_alt: {
          value: '',
          title: 'Invalid Image Alt'
        },
        images_invalid_title: {
          value: '',
          title: 'Invalid Image Title'
        },
        meta_description_empty: {
          value: '',
          title: 'Meta Description Empty'
        },
        meta_description_inappropriate: {
          value: '',
          title: 'Inappropriate Meta Description'
        },
        meta_keywords_empty: {
          value: '',
          title: 'Empty Meta Keywords'
        },
        meta_keywords_inappropriate: {
          value: '',
          title: 'Inappropriate Meta Keywords'
        },
        seo_non_friendly_url: {
          value: '',
          title: 'SEO Non-Friendly URL'
        },
        time_load_high: {
          value: '',
          title: 'High Load Time'
        },
        time_waiting_high: {
          value: '',
          title: 'High Waiting Time'
        },
        title_long: {
          value: '',
          title: 'Title is to long'
        },
        title_short: {
          value: '',
          title: 'Title is to short'
        }
      },
      NoticesMap: {
        content_readability_bad: {
          value: '',
          title: 'Bad Content Readability'
        },
        pages_http: {
          value: '',
          title: 'Http Pages'
        },
        pages_https: {
          value: '',
          title: 'Https Pages'
        },
        pages_total: {
          value: '',
          title: 'Total Pages'
        },
        response_code_3xx: {
          value: '',
          title: 'Response code of 3xx'
        },
        seo_friendly_url: {
          value: '',
          title: 'SEO Friendly URL'
        },
      }
    }
    if (audit) {
      let totalErrors = 0;
      let totalWarnings = 0;
      let totalNotices = 0;
      for (var key in audit.summary[0]) {
        if (auditMap.ErrorsMap[key]) {
          auditMap.ErrorsMap[key].value = audit.summary[0][key];
          if (!isNaN(auditMap.ErrorsMap[key].value)) {
            totalErrors += auditMap.ErrorsMap[key].value;
          }
        }
        if (auditMap.WarningsMap[key]) {
          auditMap.WarningsMap[key].value = audit.summary[0][key];
          if (!isNaN(auditMap.WarningsMap[key].value)) {
            totalWarnings += auditMap.WarningsMap[key].value;
          }
        }
        if (auditMap.NoticesMap[key]) {
          auditMap.NoticesMap[key].value = audit.summary[0][key];
          if (!isNaN(auditMap.NoticesMap[key].value)) {
            totalNotices += auditMap.NoticesMap[key].value;
          }
        }
      }
      // Go through and create an array of each
      let errorsList = [], warningsList = [], noticeList = [];
      for (var x in auditMap.ErrorsMap) {
        errorsList.push(auditMap.ErrorsMap[x]);
      }
      for (var x in auditMap.WarningsMap) {
        warningsList.push(auditMap.WarningsMap[x]);
      }
      for (var x in auditMap.NoticesMap) {
        noticeList.push(auditMap.NoticesMap[x]);
      }
      auditMap.totalErrors = totalErrors;
      auditMap.totalWarnings = totalWarnings;
      auditMap.totalNotices = totalNotices;
      auditMap["Errors"] = errorsList;
      auditMap["Warnings"] = warningsList;
      auditMap["Notices"] = noticeList;
    }
    return auditMap;
  }

  // Called when the user wants to refresh the dashboard for latest info
  getNewAudit() {
    // make call to get the audit from dataforseo
  }

}
