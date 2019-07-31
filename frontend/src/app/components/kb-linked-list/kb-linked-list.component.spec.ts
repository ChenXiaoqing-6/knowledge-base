/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { Component, Input } from '@angular/core';
import { KbLinkedListFacade } from '../../state/linkedArticle/linked-article.facade';
import { KbLinkedListComponent } from './kb-linked-list.component';

@Component({ selector: 'kb-article-item', template: '' })
class KbArticleItemComponent {
  @Input() article: any;
  @Input() type: any;
}

describe('KbLinkedListComponent', () => {
  let component: KbLinkedListComponent;
  let fixture: ComponentFixture<KbLinkedListComponent>;
  let facadeSpy = jasmine.createSpyObj('KbLinkedListFacade', [
    'getArticles',
    'getLinkedArticles',
    'getTotalObjectCount',
    'isCompleted',
    'isError',
    'isLinkingArticles'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbLinkedListComponent, 
        KbArticleItemComponent
      ],
      providers: [
        { provide: KbLinkedListFacade, useValue: facadeSpy }
      ],
      imports: [
        FundamentalNgxModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbLinkedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});