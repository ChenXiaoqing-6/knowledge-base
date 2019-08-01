import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/IArticle';
import { KbViewFacade } from '../../state/article/article.facade';

@Component({
  selector: 'kb-detail',
  templateUrl: './kb-detail.component.html',
  styleUrls: ['./kb-detail.component.css']
})
export class KbDetailComponent implements OnInit {

  public article$: Observable<IArticle>;
  constructor(private route: ActivatedRoute, private kbViewFacade: KbViewFacade) {
  }

  ngOnInit() {
    if (this.route.snapshot.params.hasOwnProperty("id")) {
      const articleId: string = this.route.snapshot.params.id;
      this.getSelectedArticle(articleId);
    }
  }

  getSelectedArticle(id: string) {
    this.article$ = this.kbViewFacade.getSelectedArticle(id) as Observable<IArticle>;
  }

  onBackToSearchPage() {
    this.kbViewFacade.backToSearchPage();
  }
}