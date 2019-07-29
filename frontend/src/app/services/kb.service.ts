import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../models/IArticle';
import { ISearchOptions } from '../models/IRequestOptions';
//import { map } from 'rxjs/operators';
import { CollectionResponse } from '../models/IResponse';
// import { AppConfig } from '../config/config';
// import { BaseHttpClient } from '../services/http.client';
import { mockSearch ,MockSuggestedArticles} from '../services/mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class KbService {

  // constructor(private http: BaseHttpClient) { }

  // private getUrl(endpoint: string) {
  //   return `${AppConfig.facadeBaseURL}/${endpoint}`;
  // }

  public searchArticles(options: ISearchOptions): Observable<CollectionResponse<IArticle>> {

   return mockSearch(options);

    // return this.http.get(this.getUrl("search")).pipe(
    //   map(res => res['data'])
    // );
  }

  public getSuggestedArticles(): Observable<CollectionResponse<IArticle>> {
    
    return MockSuggestedArticles();
    
  }

}
