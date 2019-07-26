import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from './../../models/IArticle';

@Component({
  selector: 'app-kb-linked-list',
  templateUrl: './kb-linked-list.component.html',
  styleUrls: ['./kb-linked-list.component.css']
})
export class KbLinkedListComponent implements OnInit {
  @Input() articles: IArticle[];
  constructor() { }

  ngOnInit() {
  }

  removeLinkedArticle(article){
    const index = this.articles.indexOf(article, 0);
    if (index > -1) {
      this.articles.splice(index, 1);
    }
  }

  openArticleDetail(){

  }

}
