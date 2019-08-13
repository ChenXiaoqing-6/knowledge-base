import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IArticle } from '../../models/IArticle';
import { Helper as PaginationHelper } from '../../models/IPagination';
import { KbSuggestedFacade } from '../../state/suggestion/suggested-article.facade';
// import { IFrameMessageAdapter } from '../../services/iframe.message.service';
import { IArticleAction, ARTICLE_ACTION_TYPE } from '../../models/IArticleAction';
import { KbActionService } from '../../services/kbAction.service';

@Component({
  selector: 'kb-suggested-list',
  templateUrl: './kb-suggested-list.component.html',
  styleUrls: ['./kb-suggested-list.component.css']
})
export class KbSuggestedListComponent implements OnInit, OnDestroy {
  suggestedArticles$: Observable<IArticle[]>;
  suggestedAticlesTotalCount$: Observable<number>;
  suggestedArticlesIsInit$: Observable<boolean>;
  suggestedArticlesIsError$: Observable<boolean>;
  suggestedArticlesBusy$: Observable<boolean>;
  articleActions: IArticleAction[];

  constructor(private suggestedListFacade: KbSuggestedFacade,
    // private frameMessageAdapter: IFrameMessageAdapter,
    private kbActionService: KbActionService) {

  }

  ngOnInit() {
    this.suggestedArticles$ = this.suggestedListFacade.getSuggestedArticlesBasedLinkage();
    this.suggestedAticlesTotalCount$ = this.suggestedListFacade.getTotalObjectCount();
    this.suggestedArticlesIsInit$ = this.suggestedListFacade.isInit();
    this.suggestedArticlesBusy$ = this.suggestedListFacade.isLoadingSuggestedAticles();
    this.suggestedArticlesIsError$ = this.suggestedListFacade.isError();
    
    this.suggestedListFacade.isInit().pipe(filter(isInit => !isInit)).subscribe(() => {
      this.suggestedListFacade.getSuggestedArticle({
        pagination: PaginationHelper.createSuggestedPagination(),
        searchTerm: 'Angular'
      });
    });

    // this.frameMessageAdapter.getSearchTermFromActiveCase().subscribe((searchTerm: string)=>{
    //   this.suggestedListFacade.getSuggestedArticle({
    //     pagination: PaginationHelper.createSuggestedPagination(),
    //     searchTerm: searchTerm
    //   });
    // });


    this.articleActions = [
      this.kbActionService.getAction(ARTICLE_ACTION_TYPE.MORE) as IArticleAction,
      this.kbActionService.getAction(ARTICLE_ACTION_TYPE.COPY) as IArticleAction,
    ];
  }

  public ngOnDestroy(): void {
  }

}
