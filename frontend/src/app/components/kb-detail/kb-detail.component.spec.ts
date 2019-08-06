import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { ActivatedRoute } from '@angular/router';
import { KbViewFacade } from './../../state/article/article.facade';
import { KbDetailComponent } from './kb-detail.component';
import { KbActionService } from '../../services/kbAction.service';
import { IArticleAction } from '../../models/IArticleAction';
import { KbActionServiceMock } from '../../services/mock/kbAction.service.mock';
import { KbViewFacadeMock } from '../../state/article/mock/article.facade.mock';

@Component({ selector: 'kb-detail-header', template: '' })
class KbDetailHeaderComponent {
  @Input() article: any;
  @Input() isDetailMode: true;
}

@Component({ selector: 'kb-detail-footer', template: '' })
class KbDetailFooterComponent {
  @Input() article: any;
}

@Component({ selector: 'kb-detail-content', template: '' })
class KbDetailContentComponent {
  @Input() article: any;
  @Input() public parentHeaderBarId: string;
}

@Component({ selector: 'kb-article-actions', template: '' })
class KbArticleActionsComponent {
  @Input() article: any;
  @Input() actions: IArticleAction[];
}

describe('KbDetailComponent', () => {
  let component: KbDetailComponent;
  let fixture: ComponentFixture<KbDetailComponent>;
  const KbViewFacadeSpy = new KbViewFacadeMock();
  const KbActionServiceSpy = new KbActionServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbDetailComponent,
        KbDetailHeaderComponent,
        KbDetailFooterComponent,
        KbDetailContentComponent,
        KbArticleActionsComponent,
      ],
      imports: [
        FundamentalNgxModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {snapshot:{params: {id: '5001'}} }},
        { provide: KbViewFacade, useValue: KbViewFacadeSpy },
        { provide: KbActionService, useValue: KbActionServiceSpy }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbDetailComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getSelectedArticle');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should KbViewFacade backToSearchPage be called if onBackToSearchPage is called', () => {
    component.onBackToSearchPage();
    expect(KbViewFacadeSpy.backToSearchPage).toHaveBeenCalled();
  });

});
