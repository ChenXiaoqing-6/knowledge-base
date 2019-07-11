import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kb-detail-content',
  templateUrl: './kb-detail-content.component.html',
  styleUrls: ['./kb-detail-content.component.css']
})
export class KbDetailContentComponent implements OnInit {
  @Input() public url: string;
  public isLoading: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    this.isLoading = false;
    const iframeElement = document.getElementById('iFrame') as HTMLIFrameElement;
    // iframeElement.contentWindow.postMessage
    console.log('iFrame' + iframeElement + this.isLoading);
  }

  resizeIframe(iFrame) {
    // iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + 'px';
  }

}
