import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbArticleItemComponent } from './kb-article-item.component';

describe('KbArticleItemComponent', () => {
  let component: KbArticleItemComponent;
  let fixture: ComponentFixture<KbArticleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbArticleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbArticleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
