import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/IArticle';
import { KbViewFacade } from '../../state/article/article.facade';

@Component({
  selector: 'kb-detail-content',
  templateUrl: './kb-detail-content.component.html',
  styleUrls: ['./kb-detail-content.component.css']
})
export class KbDetailContentComponent implements OnInit {
  @Input() public article: IArticle;
  public isContentLoading$: Observable<boolean>;

  constructor(private viewFacade: KbViewFacade) {
    this.isContentLoading$ = this.viewFacade.isSearching();
  }

  ngOnInit() {
    window.addEventListener('message', this._changeIFrameHeight, true);
  }

  onIFrameLoad(event) {
    if (event.target && event.target.src != '') {
      const iframeElement = document.getElementById('iFrame') as HTMLIFrameElement;
      if (iframeElement && iframeElement.contentWindow) { //load success
        iframeElement.contentWindow.postMessage({ FrameHeight: "FrameHeight", iframeId: iframeElement.id }, iframeElement.src);
        this.viewFacade.setContentLoadSuccess();  // dispatch iFrameLoadSuccessAction
      }
    }
  }

  private _changeIFrameHeight(event): void {
    if (event.data.hasOwnProperty("FrameHeight")) {
      var Iframe = document.getElementById(event.data.iframeId);
      if (Iframe) {
        Iframe.setAttribute("height", event.data.FrameHeight);
      }
    }
  }

}
