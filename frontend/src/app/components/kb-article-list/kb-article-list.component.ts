import { IArticle } from './../../models/IArticle';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'kb-article-list',
  templateUrl: './kb-article-list.component.html',
  styleUrls: ['./kb-article-list.component.css']
})
export class KbArticleListComponent implements OnInit {
  @Input() articles: IArticle[];
  constructor() { }

  ngOnInit() {
  }

}
