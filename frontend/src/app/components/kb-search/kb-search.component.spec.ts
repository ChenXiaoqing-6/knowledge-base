import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { TranslateModule } from '@ngx-translate/core';
import { IArticle } from '../../models/IArticle';
import { Helper as PageHelper } from '../../models/IPagination';
import { KbSearchFacade } from '../../state/search/search-article.facade';
import { KbSuggestedFacade } from '../../state/suggestion/suggested-article.facade';
import { KbLinkedListFacade } from '../../state/linkage/linked-article.facade';
import { KbSearchComponent } from './kb-search.component';
import { KbSearchFacadeMock } from '../../state/search/mock/search-article.facade.mock';
import { KbSuggestedFacadeMock } from '../../state/suggestion/mock/suggested-article.facade.mock';
import { KbLinkedListFacadeMock } from '../../state/linkage/mock/linked-article.facade.mock';
import { KbViewFacadeMock } from '../../state/article/mock/article.facade.mock';
import { KbViewFacade } from '../../state/article/article.facade';
import { KbServiceMock } from '../../services/mock/kb.service.mock';
import { KbService } from '../../services/kb.service';
import { OpenArticle } from '../../state/article/article.actions';

@Component({ selector: 'kb-article-list', template: '' })
class KbArticleListComponent {
  @Input() articles: IArticle[];
}

@Component({ selector: 'kb-suggested-list', template: '' })
class KbSuggestedListComponent {
  @Input() articles: IArticle[];
}

@Component({ selector: 'kb-linked-list', template: '' })
class KbLinkedListComponent {
  @Input() articles: IArticle[];
}

describe('KbSearchComponent', () => {
  let component: KbSearchComponent;
  let fixture: ComponentFixture<KbSearchComponent>;
  let KbSearchFacadeSpy = new KbSearchFacadeMock();
  let KbSuggestedFacadeSpy = new KbSuggestedFacadeMock();
  let KbLinkedListFacadeSpy = new KbLinkedListFacadeMock();
  let KbViewFacadeSpy = new KbViewFacadeMock();
  let KbServiceSpy = new KbServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbSearchComponent,
        KbArticleListComponent,
        KbSuggestedListComponent,
        KbLinkedListComponent
      ],
      providers: [
        { provide: KbSearchFacade, useValue: KbSearchFacadeSpy },
        { provide: KbSuggestedFacade, useValue: KbSuggestedFacadeSpy },
        { provide: KbLinkedListFacade, useValue: KbLinkedListFacadeSpy },
        { provide: KbViewFacade, useValue: KbViewFacadeSpy },
        { provide: KbService, useValue: KbServiceSpy }
      ],
      imports: [
        FundamentalNgxModule,
        TranslateModule.forRoot(),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger searching of articles', () => {
    const searchTerm = 'abc';
    const expectedOptions = {
      pagination: PageHelper.create(),
      searchTerm: searchTerm
    };
    /** simulate 3 clicks in a short time */
    component.search('a');
    component.search('ab');
    component.search(searchTerm);
    /** only trigger one real call with last search string */
    component.search$.subscribe(()=>{
      expect(KbSearchFacadeSpy.searchArticles).toHaveBeenCalledTimes(1);
      expect(KbSearchFacadeSpy.searchArticles).toHaveBeenCalledWith(expectedOptions);
    })
  });

  it('should trigger loading next page', () => {
    /** simulate 3 scroll events in a short time */
    component.loadMore();
    component.loadMore();
    component.loadMore();
    /** only trigger one real call */
    component.loadMore$.subscribe(()=>{
      expect(KbSearchFacadeSpy.loadMoreArticles).toHaveBeenCalledTimes(1);
      expect(KbSearchFacadeSpy.loadMoreArticles).toHaveBeenCalledWith();
    })
  });

  it('should trigger selectItem', () => {
    component.selectItem({item:{id:1}})
    expect(KbViewFacadeSpy.openArticle).toHaveBeenCalledTimes(1);
  });


  it('should trigger open article detail', () => {
    component.openArticleDetail('1');
    expect(KbViewFacadeSpy.openArticle).toHaveBeenCalledTimes(2);
  });

  it('should trigger displayFunction', () => {
    const item = {title:"1"} as IArticle;
    let currentValue= component.displayFunction(item);
    expect(currentValue).toEqual("1");
  });


  it('should trigger searching dropdown values', () => {
    const searchTerm = 'abc';
    const expectedOptions = {
      pagination: PageHelper.create(),
      searchTerm: searchTerm
    };
    /** simulate 3 clicks in a short time */
    component.onKeyup('a');
    component.onKeyup('ab');
    component.onKeyup(searchTerm);
    /** only trigger one real call with last search string */
    component.searchsuguestionArticles$.subscribe(()=>{
      expect(KbServiceSpy.searchArticles).toHaveBeenCalledTimes(3);
      expect(KbServiceSpy.searchArticles).toHaveBeenCalledWith(expectedOptions);
    })
  });

  

});
