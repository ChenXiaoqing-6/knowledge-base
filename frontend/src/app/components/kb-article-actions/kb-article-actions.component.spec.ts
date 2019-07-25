import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbArticleActionsComponent } from './kb-article-actions.component';

describe('KbArticleActionsComponent', () => {
  let component: KbArticleActionsComponent;
  let fixture: ComponentFixture<KbArticleActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbArticleActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbArticleActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
