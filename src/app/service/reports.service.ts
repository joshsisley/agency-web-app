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
    let formattedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    return formattedUrl;
  }

  /*
  * Method used to post and get onPage results. Puts the data inside of our DB
  */
  manageOnPage(url, method, id) {
    var promise = new Promise((res, rej) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let strippedUrl = this.formatUrl(url);

      let queryString = `?CampURL=${strippedUrl}&action=${method}&CampID=${id}`;

      if (method == 'get') {
        let taskId = localStorage.getItem(`${url}-taskId`);
        queryString += `&taskID=${taskId}`;
      }

      this.http.post(`https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/Dev/report${queryString}`, { headers: headers })
        .toPromise()
        .then(response => {
          res(response);
        })
        .catch(err => {
          console.log('here is the error');
          console.log(err);
          rej(err);
        })
    });
    return promise;
  }

  /*
  *  Get onPage results from the DB for the specified campaign
  */
  getCampaignAudits(url, id, method) {
    this.campAudits = [];
    // pass in a domain and find all rows with that domain
    // set the campAudits to the returned docs
    // if no campAudits, make call to get camp audits from dataforseo
    var promise = new Promise((res, rej) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let strippedUrl = this.formatUrl(url);

      let queryString = `?domain=${strippedUrl}&action=${method}`;

      this.http.get(`https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/Dev/getonpageresultbycampurl${queryString}`)
        .toPromise()
        .then(response => {
          let results = JSON.parse(response["_body"]);
          if (results && results.length > 0) {
            this.campAudits = this.formatAuditResults(results);
          }
          res(this.campAudits);
        })
        .catch(err => {
          console.log(err);
          rej(err);
        })
    });
    return promise;
  }

}
