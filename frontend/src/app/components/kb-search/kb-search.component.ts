import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, take } from 'rxjs/operators';
import { IArticle } from '../../models/IArticle';
import { Helper as PaginationHelper } from '../../models/IPagination';
import { KbViewFacade } from '../../state/article/article.facade';
import { KbLinkedListFacade } from '../../state/linkage/linked-article.facade';
import { KbSearchFacade } from '../../state/search/search-article.facade';
import { KbSuggestedFacade } from '../../state/suggestion/suggested-article.facade';
import { KbService } from '../../services/kb.service';

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
  searchsuguestionArticles$: Subject<string> = new Subject();
  loadMore$: Subject<void> = new Subject();
  btn;
  searchInput;
  time;

  public suguestionArticles: Array<IArticle> = [];

  constructor(
    private searchFacade: KbSearchFacade,
    private suggestedFacade: KbSuggestedFacade,
    private linkedFacade: KbLinkedListFacade,
    private kbViewFacade: KbViewFacade,
    private kbService: KbService) { }

  ngOnInit() {
    this.articles$ = this.searchFacade.getArticles();
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
      debounceTime(300),
    ).subscribe(searchTerm => {
      this.searchFacade.searchArticles({
        pagination: PaginationHelper.create(),
        searchTerm: searchTerm
      });
    });

    this.searchsuguestionArticles$.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged(),
      debounceTime(300),
    ).subscribe(searchTerm => {
      this.kbService.searchArticles({
        pagination: PaginationHelper.createSuggestedPagination(),
        searchTerm: searchTerm
      }).pipe(take(1)).subscribe((resp) => {
        this.suguestionArticles = resp.data;
      });
    });

    this.loadMore$.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(300)
    ).subscribe(() => {
      this.searchFacade.loadMoreArticles();
    });

  }


  ngAfterViewInit() {
    this.searchInput = document.getElementsByClassName('fd-input');
    this.btn = document.getElementsByClassName("fd-button sap-icon--search fd-button--light");
    let this_ = this
    this.btn[0].onclick = function () {
      this_.search(this_.searchInput[0].value);
    };
  }

  openArticleDetail(articleId: string) {
    this.kbViewFacade.openArticle(articleId);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  search(searchString: string) {
    this.search$.next(searchString);
  }

  onKeyup(searchString: string) {
    this.suguestionArticles = [];
    this.searchsuguestionArticles$.next(searchString);
  }

  loadMore() {
    this.loadMore$.next();
  }


  displayFunction(item: IArticle): string {
    return item.title;
  }

  selectItem(event: { item: any }) {
    this.openArticleDetail(event.item.id);
  }

}
