import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ReportsService {

  campAudits:any = [];

  constructor(private http: Http) { }

  getCampaignAudit(url, id, method) {
    // pass in a domain and find all rows with that domain
    // set the campAudits to the returned docs
    // if no campAudits, make call to get camp audits from dataforseo
    var promise = new Promise((res,rej) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let queryString = `?CampURL=${url}&CampID=${id}&action=${method}`;

      this.http.post(`https://lkgxlf78fe.execute-api.us-east-2.amazonaws.com/Dev/report${queryString}`, {headers: headers})
      .toPromise()
      .then(response => {
        console.log('here is the response from the audit api');
        console.log(response);
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

}
