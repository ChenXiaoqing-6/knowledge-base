import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'fundamental-ngx';
import { IArticle } from './../../models/IArticle';

@Component({
  selector: 'kb-article-actions',
  templateUrl: './kb-article-actions.component.html',
  styleUrls: ['./kb-article-actions.component.css']
})
export class KbArticleActionsComponent implements OnInit {

  @Input() article: IArticle;
  constructor(private alertService: AlertService) { }

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

}
