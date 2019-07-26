import { Component, OnInit } from '@angular/core';
import { IArticle } from '../../models/IArticle';
import { MockSearchResponse } from '../../services/mock/mock-data';

@Component({
  selector: 'kb-suggested-list',
  templateUrl: './kb-suggested-list.component.html',
  styleUrls: ['./kb-suggested-list.component.css']
})
export class KbSuggestedListComponent implements OnInit {

  articles: IArticle[] = [...MockSearchResponse.data];
  type: String = "ArticleList";
  constructor() { }

  ngOnInit() {
  }

}
