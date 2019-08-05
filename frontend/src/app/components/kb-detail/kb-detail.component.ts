import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/IArticle';
import { KbViewFacade } from '../../state/article/article.facade';
import { IArticleAction, ARTICLE_ACTION_TYPE } from '../../models/IArticleAction';
import { KbActionService } from '../../services/kbAction.service';

@Component({
  selector: 'kb-detail',
  templateUrl: './kb-detail.component.html',
  styleUrls: ['./kb-detail.component.css']
})
export class KbDetailComponent implements OnInit {

  public article$: Observable<IArticle>;
  public articleActions: IArticleAction[];
  constructor(private route: ActivatedRoute, 
    private kbViewFacade: KbViewFacade,
    private kbActionService: KbActionService) {
  }

  ngOnInit() {
    if (this.route.snapshot.params.hasOwnProperty("id")) {
      const articleId: string = this.route.snapshot.params.id;
      this.getSelectedArticle(articleId);
    }
    this.articleActions = [
      this.kbActionService.getAction(ARTICLE_ACTION_TYPE.MORE) as IArticleAction,
      this.kbActionService.getAction(ARTICLE_ACTION_TYPE.COPY) as IArticleAction,
    ]
  }

  getSelectedArticle(id: string) {
    this.article$ = this.kbViewFacade.getSelectedArticle(id) as Observable<IArticle>;
  }

  onBackToSearchPage() {
    this.kbViewFacade.backToSearchPage();
  }
}