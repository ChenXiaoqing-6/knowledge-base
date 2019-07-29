import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { ActivatedRoute } from '@angular/router';
import { MockArticle } from '../../models/mock/Article.mock';
import { KbViewFacade } from './../../state/article/article.facade';
import { KbDetailComponent } from './kb-detail.component';

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
}

@Component({ selector: 'kb-article-actions', template: '' })
class KbArticleActionsComponent {
  @Input() article: any;
}

describe('KbDetailComponent', () => {
  let component: KbDetailComponent;
  let fixture: ComponentFixture<KbDetailComponent>;
  let KbViewFacadeSpy = jasmine.createSpyObj('KbViewFacade', ['openArticle']);

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
        { provide: ActivatedRoute, useValue: {snapshot:{params: MockArticle} }},
        { provide: KbViewFacade, useValue: KbViewFacadeSpy }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
