import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { IArticle } from '../../models/IArticle';
import { Helper as PaginationHelper } from '../../models/IPagination';
import { KbSearchFacade } from '../../state/search/search-article.facade';
import { KbSuggestedFacade } from '../../state/suggestion/suggested-article.facade';
import { KbLinkedListFacade } from '../../state/linkage/linked-article.facade';

@Component({
  selector: 'kb-search',
  templateUrl: './kb-search.component.html',
  styleUrls: ['./kb-search.component.css']
})
export class KbSearchComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject();
  isSuggestedListBusy$: Observable<boolean>;
  isLinkedListBusy$: Observable<boolean>;
  articles$: Observable<IArticle[]>;
  totalCount$: Observable<number>;
  isInit$: Observable<boolean>;
  isError$: Observable<boolean>;
  busy$: Observable<boolean>;
  notFound$: Observable<boolean>;
  search$: Subject<string> = new Subject();
  loadMore$: Subject<void> = new Subject();

  constructor(private searchFacade: KbSearchFacade, private suggestedFacade: KbSuggestedFacade, private linkedFacade: KbLinkedListFacade) { }

  ngOnInit() {
    this.articles$ = this.searchFacade.getArticlesBasedLinkage();
    this.isInit$ = this.searchFacade.isInit();
    this.isError$ = this.searchFacade.isError();
    this.busy$ = this.searchFacade.isSearching();
    this.totalCount$ = this.searchFacade.getTotalObjectCount();
    this.notFound$ = this.searchFacade.isNotFound();
    this.isSuggestedListBusy$ = this.suggestedFacade.isLoadingSuggestedAticles();
    this.isLinkedListBusy$ = this.linkedFacade.isLinkingArticles();

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
