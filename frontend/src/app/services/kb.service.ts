import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//import { map } from 'rxjs/operators';
import { CollectionResponse } from '../models/IResponse';
import { IArticle } from '../models/IArticle';
import { ISearchOptions } from '../models/IRequestOptions';
// import { AppConfig } from '../config/config';
// import { BaseHttpClient } from '../services/http.client';

import { MockSearchResponse } from '../services/mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class KbService {

  // constructor(private http: BaseHttpClient) { }

  // private getUrl(endpoint: string) {
  //   return `${AppConfig.facadeBaseURL}/${endpoint}`;
  // }

  searchArticles(options: ISearchOptions): Observable<CollectionResponse<IArticle>> {
    //mock
    return of(MockSearchResponse);

    // return this.http.get(this.getUrl("search")).pipe(
    //   map(res => res['data'])
    // );
  }

}
