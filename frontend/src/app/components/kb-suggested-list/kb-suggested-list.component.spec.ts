import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { Component, Input } from '@angular/core';
import { KbSuggestedFacade } from '../../state/suggestion/suggested-article.facade';
import { KbSuggestedListComponent } from './kb-suggested-list.component';
import { KbActionService } from '../../services/kbAction.service';
import { IArticleAction } from '../../models/IArticleAction';

@Component({ selector: 'kb-article-item', template: '' })
class KbArticleItemComponent {
  @Input() article: any;
  @Input() actions: IArticleAction[];
}

describe('KbSuggestedListComponent', () => {
  let component: KbSuggestedListComponent;
  let fixture: ComponentFixture<KbSuggestedListComponent>;
  const facadeSpy = jasmine.createSpyObj('KbSuggestedFacade', [
    'getArticles',
    'getsuggestedArticle',
    'getTotalObjectCount',
    'isInit',
    'isError',
    'isLoadingSuggestedAticles'
  ]);
  const kbActionServiceSpy = jasmine.createSpyObj('KbActionService', ['getAction']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbSuggestedListComponent,
        KbArticleItemComponent
      ],
      providers: [
        { provide: KbSuggestedFacade, useValue: facadeSpy },
        { provide: KbActionService, useValue: kbActionServiceSpy }
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
