import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IArticle } from './../../models/IArticle';
import { KbLinkedListFacade } from '../../state/linkage/linked-article.facade';
import { ActionDisplayType } from './../../models/ActionDisplayType.enum';

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
  linkedArticlesIsError$: Observable<boolean>;
  linkedArticlesBusy$: Observable<boolean>;
  getLinkedArticles$: Subject<void> = new Subject();

  type: ActionDisplayType = ActionDisplayType.LINKED_ARTICLE_LIST;
  constructor(private linkedListFacade: KbLinkedListFacade) { }

  ngOnInit() {
    this.linkedArticles$ = this.linkedListFacade.getArticles();
    this.linkedArticlesIsCompleted$ = this.linkedListFacade.isCompleted();
    this.linkedArticlesBusy$ = this.linkedListFacade.isLinkingArticles();
    this.linkedArticlesTotalCount$ = this.linkedListFacade.getTotalObjectCount();
    this.linkedArticlesIsError$ = this.linkedListFacade.isError();

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
