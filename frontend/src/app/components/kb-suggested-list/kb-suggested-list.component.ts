import { Component, OnInit, OnDestroy } from '@angular/core';
import { IArticle } from '../../models/IArticle';
import { Observable, Subject } from 'rxjs';
import { KbSuggestedFacade } from '../../state/suggestedlist/suggested-article.facade';
import { takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'kb-suggested-list',
  templateUrl: './kb-suggested-list.component.html',
  styleUrls: ['./kb-suggested-list.component.css']
})
export class KbSuggestedListComponent implements OnInit,OnDestroy {
  

  private onDestroy$: Subject<boolean> = new Subject();
  suggestedArticles$:Observable<IArticle[]>;
  suggestedAticlesTotalCount$:Observable<number>;
  suggestedArticlesIsCompleted$:Observable<boolean>;
  suggestedArticlesBusy$:Observable<boolean>;
  getsuggestedArticle$: Subject<void> = new Subject();

  constructor(private suggestedFacade:KbSuggestedFacade) { }
  
  ngOnInit() {
    this.suggestedArticles$ = this.suggestedFacade.getArticles();
    this.suggestedAticlesTotalCount$ = this.suggestedFacade.getTotalObjectCount();
    this.suggestedArticlesIsCompleted$ = this.suggestedFacade.isCompleted();
    this.suggestedArticlesBusy$ = this.suggestedFacade.isLoadingSuggestedAticles();

    this.getsuggestedArticle$.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged(),
      debounceTime(300)
    ).subscribe(() => {
      this.suggestedFacade.getsuggestedArticle();
    });
    this.getsuggestedArticle$.next();
  }

  

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
