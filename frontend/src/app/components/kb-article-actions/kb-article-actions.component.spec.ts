import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { KbArticleActionsComponent } from './kb-article-actions.component';
import { MockArticle } from '../../models/mock/Article.mock';

describe('KbArticleActionsComponent', () => {
  let component: KbArticleActionsComponent;
  let fixture: ComponentFixture<KbArticleActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbArticleActionsComponent ],
      imports: [ FundamentalNgxModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbArticleActionsComponent);
    component = fixture.componentInstance;
    component.article = MockArticle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
