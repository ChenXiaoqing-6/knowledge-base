import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IArticle } from './../../models/IArticle';
import { KbLinkedListFacade } from '../../state/linkedArticle/linked-article.facade';

@Component({
  selector: 'kb-linked-list',
  templateUrl: './kb-linked-list.component.html',
  styleUrls: ['./kb-linked-list.component.css']
})
export class KbLinkedListComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();
  linkedArticles$: Observable<IArticle[]>;
  linkedArticlesTotalCount$: Observable<number>;
  linkedArticlesIsCompleted$: Observable<boolean>;
  linkedArticlesBusy$: Observable<boolean>;
  getLinkedArticles$: Subject<void> = new Subject();

  type: String = "LinkedArticleList";
  constructor(private linkedListFacade: KbLinkedListFacade) { }

  ngOnInit() {
    this.linkedArticles$ = this.linkedListFacade.getArticles();
    this.linkedArticlesIsCompleted$ = this.linkedListFacade.isCompleted();
    this.linkedArticlesBusy$ = this.linkedListFacade.isLinkingArticles();
    this.linkedArticlesTotalCount$ = this.linkedListFacade.getTotalObjectCount();

    this.getLinkedArticles$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      this.linkedListFacade.getLinkedArticles();
    });

    this.getLinkedArticles$.next();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
