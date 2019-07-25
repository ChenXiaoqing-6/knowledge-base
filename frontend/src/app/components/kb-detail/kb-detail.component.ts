import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from '../../models/IArticle';
import { KbViewFacade } from '../../state/article/article.facade';

@Component({
  selector: 'kb-detail',
  templateUrl: './kb-detail.component.html',
  styleUrls: ['./kb-detail.component.css']
})
export class KbDetailComponent implements OnInit {
  
  public article: IArticle;
  constructor(private route: ActivatedRoute, private kbViewFacade: KbViewFacade) { 
  }

  ngOnInit() {
    this.article = this.route.snapshot.params as IArticle;
  }

  onBackToSearchPage() {
    this.kbViewFacade.backToSearchPage();
  }
 }