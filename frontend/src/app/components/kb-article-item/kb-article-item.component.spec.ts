import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { Component, Input } from '@angular/core';
import { MockArticle } from '../../models/mock/Article.mock';
import { KbViewFacade } from './../../state/article/article.facade';
import { KbArticleItemComponent } from './kb-article-item.component';
import { IArticleAction } from '../../models/IArticleAction';
import { KbViewFacadeMock } from '../../state/article/mock/article.facade.mock';

@Component({ selector: 'kb-detail-header', template: '' })
class KbDetailHeaderComponent {
  @Input() article: any;
  @Input() isDetailMode: false;
}

@Component({ selector: 'kb-article-actions', template: '' })
class KbArticleActionsComponent {
  @Input() article: any;
  @Input() actions: IArticleAction[];
}

describe('KbArticleItemComponent', () => {
  let component: KbArticleItemComponent;
  let fixture: ComponentFixture<KbArticleItemComponent>;
  let KbViewFacadeSpy = new KbViewFacadeMock();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KbArticleItemComponent, KbDetailHeaderComponent, KbArticleActionsComponent],
      providers: [
        { provide: KbViewFacade, useValue: KbViewFacadeSpy }],
      imports: [FundamentalNgxModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbArticleItemComponent);
    component = fixture.componentInstance;
    component.article = MockArticle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test openArticleDetail: KbViewFacade openArticle should be called with article', () => {
    component.openArticleDetail();
    expect(KbViewFacadeSpy.openArticle).toHaveBeenCalledWith(component.article.id);
  });
});
