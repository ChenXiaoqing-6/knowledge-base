import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from './../../models/IArticle';
import { IArticleAction } from '../../models/IArticleAction';

@Component({
  selector: 'kb-article-actions',
  templateUrl: './kb-article-actions.component.html',
  styleUrls: ['./kb-article-actions.component.css']
})
export class KbArticleActionsComponent implements OnInit {

  @Input() article: IArticle;
  @Input() actions: IArticleAction[];

  constructor() { }

  ngOnInit() {
  }

  onClick(action: IArticleAction) {
    action.handler(this.article);
  }
}
