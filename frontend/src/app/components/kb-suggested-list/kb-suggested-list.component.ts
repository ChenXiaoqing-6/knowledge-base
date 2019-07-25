import { Component, OnInit, Input } from '@angular/core';
import { MockSuggestedResponse } from '../../services/mock/mock-data';


@Component({
  selector: 'app-kb-suggested-list',
  templateUrl: './kb-suggested-list.component.html',
  styleUrls: ['./kb-suggested-list.component.css']
})
export class KbSuggestedListComponent implements OnInit {

  @Input() articles = MockSuggestedResponse;
  constructor() { }

  ngOnInit() {
  }


}
