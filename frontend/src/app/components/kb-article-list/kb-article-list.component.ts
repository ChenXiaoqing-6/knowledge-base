import { IArticle } from './../../models/IArticle';
import { Component, OnInit, Input } from '@angular/core';
import { IArticleAction, ARTICLE_ACTION_TYPE } from '../../models/IArticleAction';
import { KbActionService } from '../../services/kbAction.service';

@Component({
  selector: 'kb-article-list',
  templateUrl: './kb-article-list.component.html',
  styleUrls: ['./kb-article-list.component.css']
})
export class KbArticleListComponent implements OnInit {
  @Input() articles: IArticle[];
  public articleActions: IArticleAction[];
  constructor(private kbActionService: KbActionService) { }

  ngOnInit() {
    this.articleActions = [
      this.kbActionService.getAction(ARTICLE_ACTION_TYPE.MORE) as IArticleAction,
      this.kbActionService.getAction(ARTICLE_ACTION_TYPE.COPY) as IArticleAction,
    ];
  }

  trackByFn(index: number, article: IArticle) {
    return article.id;
  }

}
