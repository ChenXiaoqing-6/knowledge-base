import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from '../../models/IArticle';

@Component({
  selector: 'kb-detail-footer',
  templateUrl: './kb-detail-footer.component.html',
  styleUrls: ['./kb-detail-footer.component.css']
})
export class KbDetailFooterComponent implements OnInit {
  @Input() article: IArticle;
  constructor() { }

  ngOnInit() {
  }

  openHelpCenter(): void {
    window.open(this.article.link, '_blank');
  }

}
