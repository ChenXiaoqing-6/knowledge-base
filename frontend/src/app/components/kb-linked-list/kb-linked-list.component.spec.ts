/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { IArticle } from '../../models/IArticle';
import { KbLinkedListFacade } from '../../state/linkage/linked-article.facade';
import { KbLinkedListComponent } from './kb-linked-list.component';
import { IArticleAction } from '../../models/IArticleAction';
import { KbActionService } from '../../services/kbAction.service';
import { KbActionServiceMock } from '../../services/mock/kbAction.service.mock';
import { KbLinkedListFacadeMock } from '../../state/linkage/mock/linked-article.facade.mock';

@Component({ selector: 'kb-article-item', template: '' })
class KbArticleItemComponent {
  @Input() article: IArticle;
  @Input() actions: IArticleAction[];
  @Input() public isShowLinkedIcon: boolean;
}

describe('KbLinkedListComponent', () => {
  let component: KbLinkedListComponent;
  let fixture: ComponentFixture<KbLinkedListComponent>;
  const kbLinkedListFacadeSpy = new KbLinkedListFacadeMock();
  const kbActionServiceSpy = new KbActionServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbLinkedListComponent, 
        KbArticleItemComponent
      ],
      providers: [
        { provide: KbLinkedListFacade, useValue: kbLinkedListFacadeSpy },
        { provide: KbActionService, useValue: kbActionServiceSpy }
      ],
      imports: [
        FundamentalNgxModule,
        TranslateModule.forRoot(),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbLinkedListComponent);
    component = fixture.componentInstance;
    kbLinkedListFacadeSpy.isInit.and.returnValue(of(false));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});