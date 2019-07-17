import { KbViewFacade } from './../../state/article/article.facade';
import { KbDetailHeaderComponent } from './../kb-detail-header/kb-detail-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { KbArticleItemComponent } from './kb-article-item.component';
import { RenderType } from '../../models/RenderType.enum';

describe('KbArticleItemComponent', () => {
  let component: KbArticleItemComponent;
  let fixture: ComponentFixture<KbArticleItemComponent>;
  let KbViewFacadeSpy = jasmine.createSpyObj('KbViewFacade', ['openArticle']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KbArticleItemComponent, KbDetailHeaderComponent],
      providers: [
        { provide: KbViewFacade, useValue: KbViewFacadeSpy }],
      imports: [FundamentalNgxModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbArticleItemComponent);
    component = fixture.componentInstance;
    component.article = {
      id: "1",
      provider: "test",
      title: "test",
      lastUpdated: new Date(),
      score: 1,
      link: "test",
      renderType: RenderType.IFRAME,
      renderValue: "test",
      views: 1,
      author: "test",
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test openArticleDetail: KbViewFacade openArticle should be called with article', () => {
    component.openArticleDetail();
    expect(KbViewFacadeSpy.openArticle).toHaveBeenCalledWith(component.article);
  });

  it('Test copyArticleLink: execCommand should called with copy', () => {
    spyOn(document, 'execCommand');
    component.copyArticleLink();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(document.body.getElementsByTagName("textarea").length).toBe(0);
  });

  it('Test copyArticleLink if execCommand throw error', () => {
    spyOn(document, 'execCommand').and.callFake(() => {
      throw 'error';
    });
    component.copyArticleLink();
    expect(document.body.getElementsByTagName("textarea").length).toBe(0);
  });
});
