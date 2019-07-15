import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs/operators';
import { IArticle } from '../../models/IArticle';
import { IKbState } from '../index';
import { SearchArticles, SearchArticlesReset } from './search-article.actions';
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
    if (options.searchTerm.trim().length == 0) {
      this.resetSearch();
    } else {
      this.store$.dispatch(new SearchArticles(options));
    }
  }

  public loadMoreArticles() {
    this.getSearchOptionsForNext().subscribe(options => {
      this.store$.dispatch(new SearchArticles(options));
    });
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

  public getSearchOptionsForNext(): Observable<ISearchOptions> {
    return this.getPagination().pipe(
      combineLatest(
        this.getSerachTerm(),
        (pagination, searchTerm) => {
          return {
            pagination: { ...pagination, pageIndex: pagination.pageIndex + 1 },
            searchTerm: searchTerm
          };
        }
      )
    );
  }

}
