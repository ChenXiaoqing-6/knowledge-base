import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { Component, Input } from '@angular/core';
import { KbSuggestedFacade } from '../../state/suggestion/suggested-article.facade';
import { KbSuggestedListComponent } from './kb-suggested-list.component';

@Component({ selector: 'kb-article-item', template: '' })
class KbArticleItemComponent {
  @Input() article: any;
  @Input() type: any;
}

describe('KbSuggestedListComponent', () => {
  let component: KbSuggestedListComponent;
  let fixture: ComponentFixture<KbSuggestedListComponent>;
  let facadeSpy = jasmine.createSpyObj('KbSuggestedFacade', [
    'getArticles',
    'getsuggestedArticle',
    'getTotalObjectCount',
    'isCompleted',
    'isError',
    'isLoadingSuggestedAticles'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbSuggestedListComponent,
        KbArticleItemComponent
      ],
      providers: [
        { provide: KbSuggestedFacade, useValue: facadeSpy }
      ],
      imports: [
        FundamentalNgxModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbSuggestedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
