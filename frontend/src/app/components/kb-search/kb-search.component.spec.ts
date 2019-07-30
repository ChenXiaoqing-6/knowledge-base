import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { IArticle } from '../../models/IArticle';
import { Helper as PageHelper } from '../../models/IPagination';
import { KbSearchFacade } from '../../state/search/search-article.facade';
import { KbSuggestedFacade } from '../../state/suggestedList/suggested-article.facade';
import { KbLinkedListFacade } from '../../state/linkedArticle/linked-article.facade';
import { KbSearchComponent } from './kb-search.component';

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
  let KbSearchFacadeSpy = jasmine.createSpyObj('KbSearchFacade', [
    'getArticles',
    'isInit',
    'isSearching',
    'getTotalObjectCount',
    'isNotFound',
    'searchArticles', 
    'loadMoreArticles'
  ]);

  let KbSuggestedFacadeSpy = jasmine.createSpyObj('KbSuggestedFacade', [
    'getArticles',
    'getsuggestedArticle',
    'getTotalObjectCount',
    'isCompleted',
    'isLoadingSuggestedAticles'
  ]);

  let KbLinkedListFacadeSpy = jasmine.createSpyObj('KbLinkedListFacade', [
    'getArticles',
    'getLinkedArticles',
    'getTotalObjectCount',
    'isCompleted',
    'isLinkingArticles'
  ]);

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
        { provide: KbLinkedListFacade, useValue: KbLinkedListFacadeSpy }
      ],
      imports: [
        FundamentalNgxModule
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

});
