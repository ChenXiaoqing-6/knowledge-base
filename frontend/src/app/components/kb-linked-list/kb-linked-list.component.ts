import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  linkedArticlesIsInit$: Observable<boolean>;
  linkedArticlesIsError$: Observable<boolean>;
  linkedArticlesBusy$: Observable<boolean>;

  type: ActionDisplayType = ActionDisplayType.LINKED_ARTICLE_LIST;
  constructor(private linkedListFacade: KbLinkedListFacade) { }

  ngOnInit() {
    this.linkedArticles$ = this.linkedListFacade.getArticles();
    this.linkedArticlesIsInit$ = this.linkedListFacade.isInit();
    this.linkedArticlesBusy$ = this.linkedListFacade.isLinkingArticles();
    this.linkedArticlesTotalCount$ = this.linkedListFacade.getTotalObjectCount();
    this.linkedArticlesIsError$ = this.linkedListFacade.isError();
    this.linkedListFacade.getLinkedArticles();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
