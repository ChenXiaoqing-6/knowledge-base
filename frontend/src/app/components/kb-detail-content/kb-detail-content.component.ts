import { Component, OnInit, Input } from '@angular/core';
import { Observable, fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    fromEvent(window, 'message').pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(event => this.changeIFrameHeight(event));
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
      var Iframe = document.getElementById(event.data.iframeId);
      if (Iframe) {
        Iframe.setAttribute("height", event.data.FrameHeight);
      }
    }
  }

}
