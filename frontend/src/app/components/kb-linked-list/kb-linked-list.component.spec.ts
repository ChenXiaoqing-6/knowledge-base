/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { Component, Input } from '@angular/core';
import { KbLinkedListFacade } from '../../state/linkage/linked-article.facade';
import { KbLinkedListComponent } from './kb-linked-list.component';
import { IArticleAction } from '../../models/IArticleAction';
import { KbActionService } from '../../services/kbAction.service';

@Component({ selector: 'kb-article-item', template: '' })
class KbArticleItemComponent {
  @Input() article: any;
  @Input() actions: IArticleAction[];
}

describe('KbLinkedListComponent', () => {
  let component: KbLinkedListComponent;
  let fixture: ComponentFixture<KbLinkedListComponent>;
  const facadeSpy = jasmine.createSpyObj('KbLinkedListFacade', [
    'getArticles',
    'getLinkedArticles',
    'getTotalObjectCount',
    'isInit',
    'isError',
    'isLinkingArticles'
  ]);
  const kbActionServiceSpy = jasmine.createSpyObj('KbActionService', ['getAction']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbLinkedListComponent, 
        KbArticleItemComponent
      ],
      providers: [
        { provide: KbLinkedListFacade, useValue: facadeSpy },
        { provide: KbActionService, useValue: kbActionServiceSpy }
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