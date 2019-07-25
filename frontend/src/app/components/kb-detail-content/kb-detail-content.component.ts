import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  private onDestroy$: Subject<boolean> = new Subject();

  constructor(private viewFacade: KbViewFacade) {
    this.isContentLoading$ = this.viewFacade.isSearching();
  }

  public ngOnInit() {
    this.setIFrameHeight();
  }

  public onIFrameLoad(event) {
    if (event.target && event.target.src != '') {
      const iframeElement = document.getElementById('iFrame') as HTMLIFrameElement;
      if (iframeElement && iframeElement.contentWindow) {
        iframeElement.contentWindow.postMessage({ FrameHeight: "FrameHeight", iframeId: iframeElement.id }, iframeElement.src);
        this.viewFacade.setContentLoadSuccess();
      }
    }
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  public changeIFrameHeight(event): void {
    if (event.data && event.data.hasOwnProperty("FrameHeight")) {
      const Iframe = document.getElementById(event.data.iframeId);
      if (Iframe) {
        Iframe.setAttribute("height", event.data.FrameHeight);
      }
    }
  }

  public setIFrameHeight(): void {
    const { body, documentElement } = document;
    const iFrame = document.getElementById('iFrame');
    const iHeaderHeight = 50, iFooterHeight = 50, iBufferHeight = 50;  // TODO: It may need to get the header and footer height with document object

    if (documentElement && iFrame) {
      const iDocumentHeight = Math.max(body.scrollHeight, body.offsetHeight,
        documentElement.clientHeight, documentElement.scrollHeight, documentElement.offsetHeight);
      const iDynamicHeight = iDocumentHeight - iFooterHeight - iHeaderHeight - iBufferHeight;
      iFrame.setAttribute("height", `${iDynamicHeight}`);
    }
  }

}
