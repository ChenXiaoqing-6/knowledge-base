import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { IArticle } from '../../models/IArticle';
import { Helper as PaginationHelper } from '../../models/IPagination';
import { KbSearchFacade } from '../../state/search/search-article.facade';
import { KbLinkedListFacade } from '../../state/linkedArticle/linked-article.facade';
import { KbSuggestedFacade } from '../../state/suggestedList/suggested-article.facade';

@Component({
  selector: 'app-kb-search',
  templateUrl: './kb-search.component.html',
  styleUrls: ['./kb-search.component.css']
})
export class KbSearchComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject();
  linkedArticles$: Observable<IArticle[]>;
  linkedArticlesTotalCount$: Observable<number>;
  linkedArticlesIsCompleted$: Observable<boolean>;
  linkedArticlesBusy$: Observable<boolean>;

  suggestedArticles$: Observable<IArticle[]>;
  suggestedAticlesTotalCount$: Observable<number>;
  suggestedArticlesIsCompleted$: Observable<boolean>;
  suggestedArticlesBusy$: Observable<boolean>;
  
  articles$: Observable<IArticle[]>;
  totalCount$: Observable<number>;
  isInit$: Observable<boolean>;
  busy$: Observable<boolean>;
  notFound$: Observable<boolean>;
  search$: Subject<string> = new Subject();
  loadMore$: Subject<void> = new Subject();
  getLinkedArticles$: Subject<void> = new Subject();
  getsuggestedArticle$: Subject<void> = new Subject();

  constructor(private searchFacade: KbSearchFacade, private linkedListFacade: KbLinkedListFacade, private suggestedListFacade: KbSuggestedFacade) { }

  ngOnInit() {
    this.articles$ = this.searchFacade.getArticles();
    this.isInit$ = this.searchFacade.isInit();
    this.busy$ = this.searchFacade.isSearching();
    this.totalCount$ = this.searchFacade.getTotalObjectCount();
    this.notFound$ = this.searchFacade.isNotFound();

    this.linkedArticles$ = this.linkedListFacade.getArticles();
    this.linkedArticlesIsCompleted$ = this.linkedListFacade.isCompleted();
    this.linkedArticlesBusy$ = this.linkedListFacade.isLinkingArticles();
    this.linkedArticlesTotalCount$ = this.linkedListFacade.getTotalObjectCount();

    this.suggestedArticles$ = this.suggestedListFacade.getArticles();
    this.suggestedAticlesTotalCount$ = this.suggestedListFacade.getTotalObjectCount();
    this.suggestedArticlesIsCompleted$ = this.suggestedListFacade.isCompleted();
    this.suggestedArticlesBusy$ = this.suggestedListFacade.isLoadingSuggestedAticles();

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

    this.getLinkedArticles$.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged()
    ).subscribe(() => {
      this.linkedListFacade.getLinkedArticles();
    });

    this.getsuggestedArticle$.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged()
    ).subscribe(() => {
      this.suggestedListFacade.getsuggestedArticle({
        pagination: PaginationHelper.createSuggestedPagination(),
        searchTerm: "Angular"
      });
    })

    this.getLinkedArticles$.next();
    this.getsuggestedArticle$.next();
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
