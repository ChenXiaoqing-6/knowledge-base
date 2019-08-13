import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IArticle } from '../models/IArticle';
import { IArticleLinkage, IArticleLinkageOptions } from '../models/IArticleLinkage';
import { ISearchOptions } from '../models/IRequestOptions';
import { CollectionResponse, SingleResponse } from '../models/IResponse';
import { MockLinkedArticles, MockArticleResponse, mockSearch } from '../services/mock/mock-data';
import { CloudService } from './cloud.service';
import { MockArticle } from '../models/mock/Article.mock';
import { IExtendArticleLinkage } from '../models/IArticleLinkage';

@Injectable({
  providedIn: 'root'
})
export class KbService {

  constructor(private cloudService: CloudService) { }

  public searchArticles(options: ISearchOptions): Observable<CollectionResponse<IArticle>> {
    // const params = new HttpParams()
    //   .set('page', '' + options.pagination.pageIndex)
    //   .set('pageSize', '' + options.pagination.pageSize)
    //   .set('search', options.searchTerm);

    // return this.cloudService.getHttp().get(
    //   this.cloudService.getUrl("search"), { params }
    // ).pipe(
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
    return mockSearch(options);
  }
  
  public getArticle(id: string): IArticle {
    return MockArticleResponse;
  }

  public getArticle2(id: string): Observable<IArticle> {
    const params = new HttpParams().set('provider', 'MindTouch')

    return this.cloudService.getHttp().get(
      this.cloudService.getUrl(id), { params }
    ).pipe(
      switchMap((response: SingleResponse<IArticle>) => {
        return of(response.data[0]);
      })
    );
  }

  public getLinkedArticles(options: IArticleLinkageOptions): Observable<CollectionResponse<IExtendArticleLinkage>> {
    // TODO: get linked article for a case
    // const params = new HttpParams()
    //   .set('object.objectId', options.objectRef.objectId)
    //   .set('object.objectType', options.objectRef.objectType)
    //   .set('page', '' + options.pagination.pageIndex)
    //   .set('pageSize', '' + options.pagination.pageSize);

    // return this.cloudService.getHttp().get(
    //   this.cloudService.getUrl('article-linkages'), { params }
    // ).pipe(
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
    return MockLinkedArticles();
  }

  public postArticleLinkage(articleLinkage: IArticleLinkage): Observable<IArticle> {
    // return this.cloudService.getHttp().post(this.cloudService.getUrl('article-linkages'), articleLinkage);
    return of(MockArticle);
  }

  public deleteArticleLinkage(articleLinkage: IArticleLinkage): Observable<IArticle> {
    // return this.cloudService.getHttp().delete(`${this.cloudService.getUrl('article-linkages')}\/${articleLinkage.id}`);
    return of(MockArticle);
  }
}
