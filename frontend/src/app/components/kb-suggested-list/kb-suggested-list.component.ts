import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IArticle } from '../../models/IArticle';
import { Helper as PaginationHelper } from '../../models/IPagination';
import { KbSuggestedFacade } from '../../state/suggestedList/suggested-article.facade';

@Component({
  selector: 'kb-suggested-list',
  templateUrl: './kb-suggested-list.component.html',
  styleUrls: ['./kb-suggested-list.component.css']
})
export class KbSuggestedListComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject();
  suggestedArticles$: Observable<IArticle[]>;
  suggestedAticlesTotalCount$: Observable<number>;
  suggestedArticlesIsCompleted$: Observable<boolean>;
  suggestedArticlesBusy$: Observable<boolean>;
  getsuggestedArticle$: Subject<void> = new Subject();

  type: String = "ArticleList";
  constructor(private suggestedListFacade: KbSuggestedFacade) { }

  ngOnInit() {
    this.suggestedArticles$ = this.suggestedListFacade.getArticles();
    this.suggestedAticlesTotalCount$ = this.suggestedListFacade.getTotalObjectCount();
    this.suggestedArticlesIsCompleted$ = this.suggestedListFacade.isCompleted();
    this.suggestedArticlesBusy$ = this.suggestedListFacade.isLoadingSuggestedAticles();

    this.getsuggestedArticle$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      this.suggestedListFacade.getsuggestedArticle({
        pagination: PaginationHelper.createSuggestedPagination(),
        searchTerm: "Angular"
      });
    });

    this.getsuggestedArticle$.next();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
