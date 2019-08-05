import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { KbArticleListComponent } from './kb-article-list.component';
import { IArticleAction } from '../../models/IArticleAction';
import { KbActionService } from '../../services/kbAction.service';

@Component({ selector: 'kb-article-item', template: '' })
class KbArticleItemComponent {
  @Input() article: any;
  @Input() actions: IArticleAction;
}

describe('KbArticleListComponent', () => {
  let component: KbArticleListComponent;
  let fixture: ComponentFixture<KbArticleListComponent>;
  const KbActionServiceSpy = jasmine.createSpyObj('KbActionService', ['getAction']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbArticleListComponent,
        KbArticleItemComponent
      ],
      providers: [
        { 
          provide: KbActionService, useValue: KbActionServiceSpy 
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
