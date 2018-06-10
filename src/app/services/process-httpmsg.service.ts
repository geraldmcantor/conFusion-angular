import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  public extractData(res: Response) {
      let body = res.json();
      console.log(body);
      return body || { };
  }
}
