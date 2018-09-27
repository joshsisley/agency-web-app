import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { _ } from 'underscore'

@Injectable()
export class ReportsService {

  campAudits: any;

  constructor(private http: Http) { }

  getLocalAudits() {
    return this.campAudits;
  }

  formatAuditResults(results) {
    for (var x in results) {
      results[x].Result = JSON.parse(results[x].Result);
    }
    return results;
  }

  formatUrl(url) {
    let formattedUrl = url.replace(/(^\w+:|^)\/\//, '');
    return formattedUrl;
  }

  getCampaignAudits(url, id, method) {
    // pass in a domain and find all rows with that domain
    // set the campAudits to the returned docs
    // if no campAudits, make call to get camp audits from dataforseo
    var promise = new Promise((res, rej) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let strippedUrl = this.formatUrl(url);
      console.log('here is the formatted url');
      console.log(strippedUrl);

      let queryString = `?domain=${strippedUrl}&action=${method}`;

      this.http.get(`https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/Dev/getonpageresultbycampurl${queryString}`)
        .toPromise()
        .then(response => {
          let results = JSON.parse(response["_body"]);
          console.log(results);
          if (results && results.length > 0) {
            this.campAudits = this.formatAuditResults(results);
          }
          res(this.campAudits);
        })
        .catch(err => {
          console.log('here is the error');
          console.log(err);
          rej(err);
        })
    });
    return promise;
  }

}
