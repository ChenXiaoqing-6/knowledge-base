import { Injectable } from '@angular/core';
import { Observable, timer, throwError } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
//import { map } from 'rxjs/operators';
import { CollectionResponse } from '../models/IResponse';
import { IArticle } from '../models/IArticle';
import { ISearchOptions } from '../models/IRequestOptions';
// import { AppConfig } from '../config/config';
// import { BaseHttpClient } from '../services/http.client';

import { MockArticleResponse, MockSearchResponse } from '../services/mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class KbService {

  // constructor(private http: BaseHttpClient) { }

  // private getUrl(endpoint: string) {
  //   return `${AppConfig.facadeBaseURL}/${endpoint}`;
  // }

  private _mock(options: ISearchOptions): Observable<CollectionResponse<IArticle>> {

    if (options.searchTerm.indexOf("Error") >= 0) {
      return throwError(new Error('Fake error')); 
    }

    let data: Array<IArticle> = [];
    let types: Array<string> = ["Java", "Angular", "Nodejs", "Javascript"];
    for (let i = 1; i <= 100; i++) {
      let tag = types[i % types.length];
      data.push({ ...MockArticleResponse, id: 5000 + i, title: `mockArticle-${i}-tag[${tag}]` });
    }

    let typeData:Array<IArticle> = data.filter((article)=> {
      return article.title.indexOf(options.searchTerm) >= 0;
    });

    let no = 0;
    let typeDataPages: Array<Array<IArticle>> = [];
    while(no < typeData.length) {
      typeDataPages.push(typeData.slice(no, no+options.pagination.pageSize));
      no += options.pagination.pageSize;
    }
    let ret = {
      ...MockSearchResponse, 
      data: (options.pagination.pageIndex <= typeDataPages.length) ? 
        typeDataPages[options.pagination.pageIndex-1] : [], 
      totalObjectCount: typeData.length
    };
    console.log("send request to server: ", options);
    return timer(30).pipe(tap(()=>{console.log("done.");}),mapTo(ret));
  }

  searchArticles(options: ISearchOptions): Observable<CollectionResponse<IArticle>> {

   return this._mock(options);

    // return this.http.get(this.getUrl("search")).pipe(
    //   map(res => res['data'])
    // );
  }

}
