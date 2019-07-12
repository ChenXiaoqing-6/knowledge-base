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
    const _changeIframeHeight = function (event) {
      if (event.data.hasOwnProperty("FrameHeight")) {
        var Iframe = document.getElementById(event.data.iframeId);
        if (Iframe) {
          Iframe.setAttribute("height", event.data.FrameHeight);
        }
      }
    }
    window.addEventListener('message', _changeIframeHeight, true);
  }

  resizeIframe(event) {
    if (event.target && event.target.src != '') {
      this.isLoading = false;
      const iframeElement = document.getElementById('iFrame') as HTMLIFrameElement;
      if (iframeElement && iframeElement.contentWindow) {
        iframeElement.contentWindow.postMessage({ FrameHeight: "FrameHeight", iframeId: iframeElement.id }, iframeElement.src);
      }
    }

    // dispatch iFrameLoadSuccessAction
  }

  onIFrameLoadError(event) {
    // dispatch iFrameLoadFailAction
  }

}
