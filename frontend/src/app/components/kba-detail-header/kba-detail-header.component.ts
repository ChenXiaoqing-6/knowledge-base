import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from './../../models/IArticle';

@Component({
  selector: 'kba-detail-header',
  templateUrl: './kba-detail-header.component.html',
  styleUrls: ['./kba-detail-header.component.css']
})
export class KbaDetailHeaderComponent implements OnInit {
  @Input() article: IArticle;
  @Input() isDetailMode: false;

  constructor() { }

  ngOnInit() {
  }

}
