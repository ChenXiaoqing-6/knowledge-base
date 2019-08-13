import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper as PaginationHelper } from '../../models/IPagination';
import { IArticle } from './../../models/IArticle';
import { KbLinkedListFacade } from '../../state/linkage/linked-article.facade';
import { IArticleAction, ARTICLE_ACTION_TYPE } from '../../models/IArticleAction';
import { KbActionService } from '../../services/kbAction.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'kb-linked-list',
  templateUrl: './kb-linked-list.component.html',
  styleUrls: ['./kb-linked-list.component.css']
})
export class KbLinkedListComponent implements OnInit, OnDestroy {
  linkedArticles$: Observable<IArticle[]>;
  linkedArticlesTotalCount$: Observable<number>;
  linkedArticlesIsInit$: Observable<boolean>;
  linkedArticlesIsError$: Observable<boolean>;
  linkedArticlesBusy$: Observable<boolean>;
  articleActions: IArticleAction[];

  constructor(private linkedListFacade: KbLinkedListFacade, private kbActionService: KbActionService) {
  }

  ngOnInit() {
    this.linkedArticles$ = this.linkedListFacade.getArticles();
    this.linkedArticlesIsInit$ = this.linkedListFacade.isInit();
    this.linkedArticlesBusy$ = this.linkedListFacade.isLinkingArticles();
    this.linkedArticlesTotalCount$ = this.linkedListFacade.getTotalObjectCount();
    this.linkedArticlesIsError$ = this.linkedListFacade.isError();
    this.articleActions = [
      this.kbActionService.getAction(ARTICLE_ACTION_TYPE.DELETE) as IArticleAction
    ];
    // TODO: get objectId and objectType from parent
    this.linkedListFacade.isInit().pipe(filter(isInit => !isInit)).subscribe(() => {
      this.linkedListFacade.getLinkedArticles({
        pagination:  PaginationHelper.createLinkagePagination(),
        objectRef: { objectId: 'test', objectType: 'CASE' }   // TODO: replace objectId with caseId 
      });
    });
  }

  public ngOnDestroy(): void {
  }
}
