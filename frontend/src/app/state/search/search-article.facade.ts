import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/IArticle';
import { IKbState } from '../index';
import { SearchArticles } from './search-article.actions';
import { selectIsLoading, selectIsInit, selectAllArticles, selectPagination, selectTotalObjectCount } from './search-article.selectors';
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
    this.store$.dispatch(new SearchArticles(options));
  }

  public getPagination(): Observable<IPagination> {
    return this.store$.pipe(select(selectPagination));
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

}
