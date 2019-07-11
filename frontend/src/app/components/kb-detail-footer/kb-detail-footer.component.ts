import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kb-detail-footer',
  templateUrl: './kb-detail-footer.component.html',
  styleUrls: ['./kb-detail-footer.component.css']
})
export class KbDetailFooterComponent implements OnInit {
  @Input() url: string = '';
  constructor() { }

  ngOnInit() {
  }

  openHelpCenter(url: string): void {
    window.open(this.url, '_blank');
  }

}
