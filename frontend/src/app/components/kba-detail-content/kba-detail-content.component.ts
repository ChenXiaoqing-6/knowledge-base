import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kba-detail-content',
  templateUrl: './kba-detail-content.component.html',
  styleUrls: ['./kba-detail-content.component.css']
})
export class KbaDetailContentComponent implements OnInit {
  @Input() public url: string;
  constructor() { }

  ngOnInit() {
  }

}
