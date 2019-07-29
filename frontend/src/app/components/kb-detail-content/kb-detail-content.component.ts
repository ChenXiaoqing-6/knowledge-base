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
  @Input() public parentHeaderBarId: string;

  public isContentLoading$: Observable<boolean>;

  constructor(private viewFacade: KbViewFacade) {
    this.isContentLoading$ = this.viewFacade.isSearching();
  }

  public ngOnInit() {
  }

  public ngAfterViewInit(): void {
    this.changeIFrameHeight();
  }

  public onIFrameLoad(event) {
    if (event.target && event.target.src != '') {
      this.viewFacade.setContentLoadSuccess();
    }
  }

  public ngOnDestroy(): void {
  }

  public changeIFrameHeight(): void {
    const { documentElement } = document;
    const iFrame = document.getElementById('iFrame');
    if (documentElement && iFrame) {
      const iDocumentHeight = documentElement.clientHeight;
      const content: HTMLElement = document.getElementById(this.parentHeaderBarId) as HTMLElement;
      const iHeaderHeight = content.offsetHeight,
        iFooterHeight = 47;
      const iDynamicHeight = iDocumentHeight - iHeaderHeight - iFooterHeight;
      iFrame.setAttribute("height", `${iDynamicHeight}`);
    }
  }
}
