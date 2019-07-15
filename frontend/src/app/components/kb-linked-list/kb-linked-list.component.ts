import { Component, OnInit } from '@angular/core';
import { MockSearchResponse } from './../../services/mock/mock-data';

@Component({
  selector: 'app-kb-linked-list',
  templateUrl: './kb-linked-list.component.html',
  styleUrls: ['./kb-linked-list.component.css']
})
export class KbLinkedListComponent implements OnInit {
  articles = [...MockSearchResponse.data];
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
