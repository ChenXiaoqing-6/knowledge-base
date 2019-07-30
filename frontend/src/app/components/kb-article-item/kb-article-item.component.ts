import { Component, OnInit, Input } from '@angular/core';
import { KbViewFacade } from '../../state/article/article.facade';
import { IArticle } from './../../models/IArticle';
import { ActionDisplayType } from './../../models/ActionDisplayType.enum';

@Component({
  selector: 'kb-article-item',
  templateUrl: './kb-article-item.component.html',
  styleUrls: ['./kb-article-item.component.css']
})
export class KbArticleItemComponent implements OnInit {
  @Input() article: IArticle;
  @Input() type: ActionDisplayType;
  constructor( private viewFacade: KbViewFacade) { }

  ngOnInit() { }
  
  openArticleDetail() {
    this.viewFacade.openArticle(this.article);
  }
}