import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from '../../models/IArticle';

@Component({
  selector: 'kb-detail-header',
  templateUrl: './kb-detail-header.component.html',
  styleUrls: ['./kb-detail-header.component.css']
})
export class KbDetailHeaderComponent implements OnInit {
  @Input() article: IArticle;
  @Input() isDetailMode: false;

  constructor() { }

  ngOnInit() {
  }

}
