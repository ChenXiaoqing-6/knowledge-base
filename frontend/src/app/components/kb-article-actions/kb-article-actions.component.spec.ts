import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { KbArticleActionsComponent } from './kb-article-actions.component';
import { MockArticle } from '../../models/mock/Article.mock';
import { IArticle } from '../../models/IArticle';
import { IArticleAction } from '../../models/IArticleAction';

describe('KbArticleActionsComponent', () => {
  let component: KbArticleActionsComponent;
  let fixture: ComponentFixture<KbArticleActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KbArticleActionsComponent],
      imports: [FundamentalNgxModule]
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

  it('should call "action.handler" function in onClick', () => {
    const handler = (article: IArticle) => { 
      expect(article).toBe(MockArticle);
    };
    const action: IArticleAction = {
      title: 'More',
      icon: 'sap-icon--overflow',
      handler: handler
    };
    component.onClick(action);
  });

});
