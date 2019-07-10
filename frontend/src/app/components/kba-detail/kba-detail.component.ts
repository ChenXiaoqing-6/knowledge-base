import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from './../../models/IArticle';

@Component({
  selector: 'kba-detail',
  templateUrl: './kba-detail.component.html',
  styleUrls: ['./kba-detail.component.css']
})
export class KbaDetailComponent implements OnInit {
  @Input() article: IArticle;
  constructor() { }

  ngOnInit() {
  }

}
