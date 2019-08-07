import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { KbSuggestedFacade } from '../../state/suggestion/suggested-article.facade';
import { KbSuggestedListComponent } from './kb-suggested-list.component';
import { KbActionService } from '../../services/kbAction.service';
import { IArticleAction } from '../../models/IArticleAction';
import { IFrameMessageAdapter } from '../../services/iframe.message.service';
import { KbActionServiceMock } from '../../services/mock/kbAction.service.mock';
import { KbSuggestedFacadeMock } from '../../state/suggestion/mock/suggested-article.facade.mock';
import { IFrameMessageAdapterMock } from '../../services/mock/iframe.message.service.mock';

@Component({ selector: 'kb-article-item', template: '' })
class KbArticleItemComponent {
  @Input() article: any;
  @Input() actions: IArticleAction[];
}

describe('KbSuggestedListComponent', () => {
  let component: KbSuggestedListComponent;
  let fixture: ComponentFixture<KbSuggestedListComponent>;
  const facadeSpy = new KbSuggestedFacadeMock();
  const kbActionServiceSpy = new KbActionServiceMock();
  const frameMessageAdapterSpy = new IFrameMessageAdapterMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbSuggestedListComponent,
        KbArticleItemComponent
      ],
      providers: [
        { provide: KbSuggestedFacade, useValue: facadeSpy },
        { provide: KbActionService, useValue: kbActionServiceSpy },
        { provide: IFrameMessageAdapter, useValue: frameMessageAdapterSpy}
      ],
      imports: [
        FundamentalNgxModule,
        TranslateModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbSuggestedListComponent);
    component = fixture.componentInstance;
    frameMessageAdapterSpy.getSearchTermFromActiveCase.and.returnValue(of('unitTest'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
