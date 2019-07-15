import { Component, OnInit, Input } from '@angular/core';
import { Observable} from 'rxjs';
import { IArticle } from '../../models/IArticle';
import { KbViewFacade } from '../../state/article/article.facade';

@Component({
  selector: 'kb-detail-content',
  templateUrl: './kb-detail-content.component.html',
  styleUrls: ['./kb-detail-content.component.css']
})
export class KbDetailContentComponent implements OnInit {
  @Input() public article: IArticle;
  isContentLoading$: Observable<boolean>;

  constructor(private viewFacade: KbViewFacade) { 
    this.isContentLoading$ = this.viewFacade.isSearching();
  }

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
      const iframeElement = document.getElementById('iFrame') as HTMLIFrameElement;
      if (iframeElement && iframeElement.contentWindow) {
        iframeElement.contentWindow.postMessage({ FrameHeight: "FrameHeight", iframeId: iframeElement.id }, iframeElement.src);
      }

      this.viewFacade.setContentLoadSuccess();  // dispatch iFrameLoadSuccessAction
    }
  }

  onIFrameLoadError(event) {
    // dispatch iFrameLoadFailAction
  }

}
