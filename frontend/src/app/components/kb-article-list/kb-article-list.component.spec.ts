import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { KbArticleListComponent } from './kb-article-list.component';

@Component({ selector: 'kb-article-item', template: '' })
class KbArticleItemComponent {
  @Input() article: any;
  @Input() type: any;
}

describe('KbArticleListComponent', () => {
  let component: KbArticleListComponent;
  let fixture: ComponentFixture<KbArticleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbArticleListComponent,
        KbArticleItemComponent
      ]
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
