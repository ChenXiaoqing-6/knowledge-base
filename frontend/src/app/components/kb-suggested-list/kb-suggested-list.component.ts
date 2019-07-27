import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from '../../models/IArticle';

@Component({
  selector: 'kb-suggested-list',
  templateUrl: './kb-suggested-list.component.html',
  styleUrls: ['./kb-suggested-list.component.css']
})
export class KbSuggestedListComponent implements OnInit {

  @Input() articles: IArticle[];
  type: String = "ArticleList";
  constructor() { }

  ngOnInit() {
  }

}
