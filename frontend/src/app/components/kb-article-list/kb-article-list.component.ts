import { IArticle } from './../../models/IArticle';
import { Component, OnInit, Input } from '@angular/core';
import { ActionDisplayType } from './../../models/ActionDisplayType.enum';
@Component({
  selector: 'kb-article-list',
  templateUrl: './kb-article-list.component.html',
  styleUrls: ['./kb-article-list.component.css']
})
export class KbArticleListComponent implements OnInit {
  @Input() articles: IArticle[];
  type: ActionDisplayType = ActionDisplayType.SEARCHED_ARTICLE_LIST;
  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: number, article: IArticle) {
    return article.id;
  }

}
