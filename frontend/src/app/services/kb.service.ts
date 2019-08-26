// import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable/*, of */} from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { AppConfig } from '../../config';
import { IArticle } from '../models/IArticle';
import { ISearchOptions } from '../models/IRequestOptions';
import { CollectionResponse } from '../models/IResponse';
import { mockSearch, MockLinkedArticles, MockArticleResponse } from '../services/mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class KbService {

  constructor(/*private http: HttpClient*/) { }

  // public getUrl(endpoint: string) {
  //   return `${AppConfig.facadeBaseURL}/${endpoint}`;
  // }

  public searchArticles(options: ISearchOptions): Observable<CollectionResponse<IArticle>> {

    return mockSearch(options);

    // const params = new HttpParams()
    //   .set('page', '' + options.pagination.pageIndex)
    //   .set('pageSize', '' + options.pagination.pageSize)
    //   .set('search', options.searchTerm);

    // return this.http.get(this.getUrl("search"), { params }).pipe(
    //   switchMap((response: Object) => {
    //     return of(Object.assign({
    //       data: [],
    //       pageSize: 1,
    //       currentPage: 1,
    //       lastPage: 1,
    //       totalObjectCount: 0
    //     }, response));
    //   })
    // );
  }

  public getArticle(id: string): IArticle {
    return MockArticleResponse;
    //TODO:
  }

  public getLinkedArticles(): Observable<CollectionResponse<IArticle>> {
    return MockLinkedArticles();
  }

}
