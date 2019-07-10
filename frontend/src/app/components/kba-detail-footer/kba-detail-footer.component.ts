import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kba-detail-footer',
  templateUrl: './kba-detail-footer.component.html',
  styleUrls: ['./kba-detail-footer.component.css']
})
export class KbaDetailFooterComponent implements OnInit {
  @Input() url: string = '';
  constructor() { }

  ngOnInit() {
  }

  openHelpCenter(url: string): void {
    window.open(this.url, '_blank');
  }

}
