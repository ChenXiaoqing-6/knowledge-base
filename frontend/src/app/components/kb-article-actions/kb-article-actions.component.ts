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

  public isOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onClick(action: IArticleAction) {
    action.handler(this.article);
  }

  onChildActionClick(childAction: IArticleAction) {
    this.isOpen = false;
    childAction.handler(this.article);
  }
}
