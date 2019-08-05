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
  selectLastPage,
  selectIsError,
  selectTotalObjectCount,
  selectArticleById,
} from './search-article.selectors';
import { IPagination } from '../../models/IPagination';
import { ISearchOptions } from '../../models/IRequestOptions';

@Injectable()
export class KbSearchFacade {

  constructor(private store$: Store<IKbState>) { }

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

  public getLastPage(): Observable<number> {
    return this.store$.pipe(select(selectLastPage));
  }

  public getTotalObjectCount(): Observable<number> {
    return this.store$.pipe(select(selectTotalObjectCount));
  }

  public isInit(): Observable<boolean> {
    return this.store$.pipe(select(selectIsInit));
  }

  public isError(): Observable<boolean> {
    return this.store$.pipe(select(selectIsError));
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

  public getNextPageSearchOptions(): Observable<ISearchOptions | null> {
    return this.getPagination().pipe(
      combineLatest(
        this.getLastPage(),
        this.getSerachTerm(),
        (_pagination, _lastPage, _searchTerm) => {
          let _nextPage = { ..._pagination, pageIndex: _pagination.pageIndex + 1 };
          return (_nextPage.pageIndex > _lastPage) ? null :
            {
              pagination: _nextPage,
              searchTerm: _searchTerm
            }
        }
      )
    );
  }

  public getSelectedArticle(id: string): Observable<IArticle> {
    return this.store$.pipe(select(selectArticleById, {id}));
  }

}
