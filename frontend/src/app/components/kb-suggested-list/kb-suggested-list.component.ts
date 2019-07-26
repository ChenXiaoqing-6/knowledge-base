import { Component, OnInit } from '@angular/core';
import { MockSuggestedResponse } from '../../services/mock/mock-data';
import { IArticle } from '../../models/IArticle';

@Component({
  selector: 'app-kb-suggested-list',
  templateUrl: './kb-suggested-list.component.html',
  styleUrls: ['./kb-suggested-list.component.css']
})
export class KbSuggestedListComponent implements OnInit {

  //mockSuggestedResponse: IArticle []=[];
  private mockSuggestedResponse: IArticle []=MockSuggestedResponse;
  suggestedListTotal:number = this.mockSuggestedResponse.length;
  articles = this.mockSuggestedResponse;
  constructor() { }
  
  ngOnInit() {
  }
}
