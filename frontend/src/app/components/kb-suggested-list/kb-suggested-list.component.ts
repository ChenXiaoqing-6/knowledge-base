import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IArticle } from '../../models/IArticle';
import { Helper as PaginationHelper } from '../../models/IPagination';
import { KbSuggestedFacade } from '../../state/suggestion/suggested-article.facade';
import { ActionDisplayType } from './../../models/ActionDisplayType.enum';

@Component({
  selector: 'kb-suggested-list',
  templateUrl: './kb-suggested-list.component.html',
  styleUrls: ['./kb-suggested-list.component.css']
})
export class KbSuggestedListComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject();
  suggestedArticles$: Observable<IArticle[]>;
  suggestedAticlesTotalCount$: Observable<number>;
  suggestedArticlesIsInit$: Observable<boolean>;
  suggestedArticlesIsError$: Observable<boolean>;
  suggestedArticlesBusy$: Observable<boolean>;

  type: ActionDisplayType = ActionDisplayType.SEARCHED_ARTICLE_LIST;
  constructor(private suggestedListFacade: KbSuggestedFacade) { }

  ngOnInit() {
    this.suggestedArticles$ = this.suggestedListFacade.getArticles();
    this.suggestedAticlesTotalCount$ = this.suggestedListFacade.getTotalObjectCount();
    this.suggestedArticlesIsInit$ = this.suggestedListFacade.isInit();
    this.suggestedArticlesBusy$ = this.suggestedListFacade.isLoadingSuggestedAticles();
    this.suggestedArticlesIsError$ = this.suggestedListFacade.isError();
    this.suggestedListFacade.getsuggestedArticle({
      pagination: PaginationHelper.createSuggestedPagination(),
      searchTerm: "Angular"
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
