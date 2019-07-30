import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { IArticle } from '../../models/IArticle';
import { Helper as PaginationHelper } from '../../models/IPagination';
import { KbSearchFacade } from '../../state/search/search-article.facade';

@Component({
  selector: 'app-kb-search',
  templateUrl: './kb-search.component.html',
  styleUrls: ['./kb-search.component.css']
})
export class KbSearchComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject();
  articles$: Observable<IArticle[]>;
  totalCount$: Observable<number>;
  isInit$: Observable<boolean>;
  busy$: Observable<boolean>;
  notFound$: Observable<boolean>;
  search$: Subject<string> = new Subject();
  loadMore$: Subject<void> = new Subject();

  constructor(private searchFacade: KbSearchFacade) { }

  ngOnInit() {
    this.articles$ = this.searchFacade.getArticles();
    this.isInit$ = this.searchFacade.isInit();
    this.busy$ = this.searchFacade.isSearching();
    this.totalCount$ = this.searchFacade.getTotalObjectCount();
    this.notFound$ = this.searchFacade.isNotFound();

    this.search$.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged(),
      debounceTime(300)
    ).subscribe(searchTerm => {
      this.searchFacade.searchArticles({
        pagination: PaginationHelper.create(),
        searchTerm: searchTerm
      });
    });

    this.loadMore$.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(300)
    ).subscribe(() => {
      this.searchFacade.loadMoreArticles();
    });

  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  search(searchString: string) {
    this.search$.next(searchString);
  }

  loadMore() {
    this.loadMore$.next();
  }

}
