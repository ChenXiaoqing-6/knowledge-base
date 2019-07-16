import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs/operators';
import { IArticle } from '../../models/IArticle';
import { IKbState } from '../index';
import { SearchArticles, LoadNextPage, SearchArticlesReset } from './search-article.actions';
import {
  selectIsLoading,
  selectIsInit,
  selectAllArticles,
  selectPagination,
  selectSearchTerm,
  selectTotalObjectCount
} from './search-article.selectors';
import { IPagination } from '../../models/IPagination';
import { ISearchOptions } from '../../models/IRequestOptions';

@Injectable()
export class KbSearchFacade {

  constructor(private store$: Store<IKbState>) {
    
  }

  public getArticles(): Observable<IArticle[]> {
    return this.store$.pipe(select(selectAllArticles));
  }

  public searchArticles(options: ISearchOptions) {
    console.log("search:", options);
    if (options.searchTerm.trim().length == 0) {
      this.resetSearch();
    } else {
      this.store$.dispatch(new SearchArticles(options));
    }
  }

  public loadMoreArticles() {
    console.log("loadmore:");
    this.store$.dispatch(new LoadNextPage());
  }

  public resetSearch() {
    this.store$.dispatch(new SearchArticlesReset());
  }

  public getPagination(): Observable<IPagination> {
    return this.store$.pipe(select(selectPagination));
  }

  public getSerachTerm(): Observable<string> {
    return this.store$.pipe(select(selectSearchTerm));
  }

  public getTotalObjectCount(): Observable<number> {
    return this.store$.pipe(select(selectTotalObjectCount));
  }

  public isInit(): Observable<boolean> {
    return this.store$.pipe(select(selectIsInit));
  }

  public isSearching(): Observable<boolean> {
    return this.store$.pipe(select(selectIsLoading));
  }

  public isNotFound(): Observable<boolean> {
    return this.isSearching().pipe(
      combineLatest(
        this.getTotalObjectCount(),
        (isLoading, totalCount) => {
          return !isLoading && totalCount === 0;
        }
      )
    );
  }

  public getSearchOptions(): Observable<ISearchOptions> {
    return this.getPagination().pipe(
      combineLatest(
        this.getSerachTerm(),
        (_pagination, _searchTerm) => {
          return {
            pagination: _pagination,
            searchTerm: _searchTerm
          };
        }
      )
    );
  }

}
