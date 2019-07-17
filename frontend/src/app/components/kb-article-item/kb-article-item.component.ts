import { IArticle } from './../../models/IArticle';
import { Component, OnInit, Input } from '@angular/core';

import { KbViewFacade } from '../../state/article/article.facade';
import { AlertService } from 'fundamental-ngx';

@Component({
  selector: 'kb-article-item',
  templateUrl: './kb-article-item.component.html',
  styleUrls: ['./kb-article-item.component.css']
})
export class KbArticleItemComponent implements OnInit {
  @Input() article: IArticle;
  constructor(private viewFacade: KbViewFacade, private alertService: AlertService) { }

  ngOnInit() {
  }

  copyArticleLink() {
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      let textarea = document.createElement("textarea");
      textarea.textContent = this.article.link;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy"); // Security exception may be thrown by some browsers.
        this.alertService.open('Knowledge article URL copied', {
          type: 'information',
          dismissible: false,
          duration: 3000
        });
      } catch (ex) {
        console.log(ex);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  onMore() {

  }
  
  openArticleDetail() {
    this.viewFacade.openArticle(this.article);
  }
}